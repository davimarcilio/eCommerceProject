import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { validate } from "cpf-check";
import { useDispatch, useSelector } from "react-redux";

import mask from "../functions/inputCPFMask";
import { useNavigate } from "react-router-dom";
import clearServerMessage from "../functions/clearServerMessage";
import setServerMessageObject from "../functions/setServerMessageObject";

import EyeSVG from "../assets/images/EyeSVG";
import EyeSlashSVG from "../assets/images/EyeSlashSVG";
import InputError from "../components/InputError";
import ErrorModal from "../components/ErrorModal";
import { registerUser, reset } from "../../../redux/user/userSlice";

export default function Register() {
  const [cpf, setCpf] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [equalPassword, setEqualPassword] = useState(false);
  const [serverMessage, setServerMessage] = useState({
    active: false,
    error: false,
    message: "",
  });
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const classNameInput = "py-2 px-5 rounded border border-gray-400 shadow-lg";
  const dispatch = useDispatch();

  useEffect(() => {
    if (password === confPassword) {
      return setEqualPassword(true);
    }
    return setEqualPassword(false);
  }, [password, confPassword]);

  useEffect(() => {
    let timer;
    switch (user.error) {
      case "Email already registered":
        setServerMessage(setServerMessageObject("Email ja registrado"));
        timer = setTimeout(() => {
          clearServerMessage(setServerMessage);
          dispatch(reset());
        }, 3000);
        return () => {
          clearTimeout(timer);
        };
      case "":
        setServerMessage({
          active: false,
          error: false,
          message: "",
        });

        break;
      case "user successfully created":
        setServerMessage({
          active: true,
          error: false,
          message: "Registro bem sucedido",
        });
        setTimeout(() => {
          dispatch(reset());
          navigate("/login");
        }, 3000);
        break;
      case "CPF already registered":
        setServerMessage(setServerMessageObject("CPF ja cadastrado"));

        timer = setTimeout(() => {
          clearServerMessage(setServerMessage);
          dispatch(reset());
        }, 3000);
        return () => {
          clearTimeout(timer);
        };
      case "Please enter a valid CPF":
        setServerMessage(setServerMessageObject("CPF invalido"));
        timer = setTimeout(() => {
          clearServerMessage(setServerMessage);
          dispatch(reset());
        }, 3000);
        return () => {
          clearTimeout(timer);
        };
      default:
        setServerMessage(
          setServerMessage(
            "Houve um erro inesperado tente novamente mais tarde"
          )
        );
        timer = setTimeout(() => {
          clearServerMessage(setServerMessage);
          dispatch(reset());
        }, 3000);
        return () => {
          clearTimeout(timer);
        };
    }
  }, [user]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    Reflect.deleteProperty(data, "confPassword");
    console.log(data);
    data.birthDate = new Date(data.birthDate).getTime();
    dispatch(registerUser(data));
  };
  return (
    <div>
      <ErrorModal
        active={serverMessage.active}
        type={serverMessage.error}
        message={serverMessage.message}
      />
      <form
        className="max-w-2xl m-auto flex flex-col gap-5 mt-8 mb-8 font-Poppins"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* NOME */}

        <div className="flex flex-col relative">
          <input
            className={classNameInput}
            type={"text"}
            {...register("name", {
              required: "Nome é obrigatório!",
              maxLength: {
                value: 50,
                message: "Nome não pode ter mais de 50 caracteres!",
              },
              minLength: {
                value: 3,
                message: "Nome não pode ter menos de 3 caracteres!",
              },
            })}
            placeholder={"Nome"}
          />
          <InputError>{errors.name?.message}</InputError>
        </div>
        {/* CPF */}
        <div className="flex flex-col relative">
          <input
            className={classNameInput}
            type={"text"}
            onInput={(e) => {
              mask(e.target);
              setCpf(validate(e.target.value));
            }}
            {...register("cpf", {
              required: "CPF é obrigatório!",
              maxLength: {
                value: 14,
                message: "CPF invalido!",
              },
              minLength: {
                value: 14,
                message: "CPF invalido!",
              },
              pattern: {
                value: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
                message: "CPF invalido!",
              },
            })}
            placeholder={"CPF"}
          />
          <InputError>
            {!!errors.cpf?.message && !cpf ? "CPF invalido!" : ""}
          </InputError>
        </div>
        {/* Email */}
        <div className="flex flex-col relative">
          <input
            className={classNameInput}
            type={"email"}
            {...register("email", {
              required: "Email é obrigatório!",
              maxLength: {
                value: 200,
                message: "Email não pode ter mais de 200 caracteres!",
              },
              minLength: {
                value: 6,
                message: "Email não pode ter menos de 6 caracteres!",
              },
            })}
            placeholder={"example@example.com"}
          />
          <InputError>{errors.email?.message}</InputError>
        </div>
        {/* Password */}
        <div className="flex flex-col">
          <div className=" relative flex justify-center items-center">
            <input
              onInput={(e) => setPassword(e.target.value)}
              className={`${classNameInput} w-full`}
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Senha é obrigatório!",

                maxLength: {
                  value: 50,
                  message: "Senha não pode ter mais de 200 caracteres!",
                },
                minLength: {
                  value: 6,
                  message: "Senha não pode ter menos de 6 caracteres!",
                },
              })}
              placeholder={"Senha"}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                showPassword ? setShowPassword(false) : setShowPassword(true);
              }}
              className="absolute right-2 h-full"
            >
              {!showPassword ? <EyeSVG></EyeSVG> : <EyeSlashSVG />}
            </button>
          </div>
          <InputError>
            {!equalPassword ? "Senhas não considem" : errors.password?.message}
          </InputError>
        </div>
        {/* //////////////////////////////////// CONFIRMA PASSWORD */}
        <div className="flex flex-col">
          <div className=" relative flex justify-center items-center">
            <input
              onInput={(e) => setConfPassword(e.target.value)}
              className={`${classNameInput} w-full`}
              type={showConfPassword ? "text" : "password"}
              placeholder={"Confirme sua senha"}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                showConfPassword
                  ? setShowConfPassword(false)
                  : setShowConfPassword(true);
              }}
              className="absolute right-2  h-full"
            >
              {!showConfPassword ? <EyeSVG></EyeSVG> : <EyeSlashSVG />}
            </button>
          </div>
          <InputError>{!equalPassword ? "Senhas não considem" : ""}</InputError>
        </div>
        {/* DATA */}
        <div className="flex flex-col relative">
          <input
            className={classNameInput}
            type={"date"}
            {...register("birthDate", {
              required: "Aniversário é obrigatório!",
              maxLength: {
                value: 200,
                message: "Aniversário não pode ter mais de 200 caracteres!",
              },
              minLength: {
                value: 6,
                message: "Aniversário não pode ter menos de 6 caracteres!",
              },
            })}
            placeholder={"Data de aniversario"}
          />
          <InputError>{errors.birthDate?.message}</InputError>
        </div>
        {/* SEXO */}
        <div className="flex flex-col relative">
          <select
            defaultChecked={""}
            className={classNameInput}
            {...register("sex", {
              required: "Genero é obrigatório",
            })}
          >
            <option value={""} disabled>
              Genero
            </option>
            <option value={"M"}>Masculino</option>
            <option value={"F"}>Feminino</option>
          </select>
          <InputError>{errors.sex?.message}</InputError>
        </div>

        <input
          className={`${classNameInput} w-1/3 self-center transition-all font-bold hover:bg-slate-400`}
          type="submit"
          value={"Cadastrar"}
        />
      </form>
    </div>
  );
}
