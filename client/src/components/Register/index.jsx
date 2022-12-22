import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { validate } from "cpf-check";
import EyeSVG from "./assets/images/EyeSVG";
import EyeSlashSVG from "./assets/images/EyeSlashSVG";
import InputError from "./components/InputError";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/login/loginSlice";
import { useNavigate } from "react-router-dom";
function mask(i) {
  var v = i.value;
  if (isNaN(v[v.length - 1])) {
    i.value = v.substring(0, v.length - 1);
    return;
  }

  i.setAttribute("maxlength", "14");
  if (v.length === 3 || v.length === 7) i.value += ".";
  if (v.length === 11) i.value += "-";
}

export default function Register() {
  const navigate = useNavigate();
  const [cpf, setCpf] = useState(false);
  const user = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    delete data.confPassword;
    data.birthDate = new Date(data.birthDate).getTime();
    dispatch(registerUser(data));
    if (!!user.error) {
      setServerError({ error: true, message: user.error });
    } else {
      navigate("/");
    }
  };
  const classNameInput = "py-2 px-5 rounded border border-gray-400 shadow-lg";
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [equalPassword, setEqualPassword] = useState(false);
  const [serverError, setServerError] = useState({
    error: false,
    message: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (password === confPassword) {
      return setEqualPassword(true);
    }
    return setEqualPassword(false);
  }, [password, confPassword]);

  return (
    <form
      className="max-w-2xl m-auto flex flex-col gap-5 mt-8 mb-8 font-Poppins"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div
        className={`absolute flex mt-6 left-0 top-0 w-full ${
          !serverError.error ? "hidden" : ""
        }`}
      >
        <h1 className="m-auto p-10 rounded-lg shadow-2xl text-xl font-bold shadow-black bg-red-500 w-full max-w-md ">
          {serverError.error ? serverError.message : ""}
        </h1>
      </div>
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
          {errors.cpf?.message}
          {!!!errors.cpf?.message && !cpf ? "CPF invalido!" : ""}
        </InputError>
      </div>

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
          {errors.password?.message}
          {!equalPassword ? "Senhas não considem" : ""}
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
      <div className="flex flex-col relative">
        <select
          className={classNameInput}
          {...register("sex", { required: "Sexo é obrigatório" })}
        >
          <option value="M">Masculino</option>
          <option value="F">Feminino</option>
        </select>
        <p role={"alert"}>{errors.sex?.message}</p>
      </div>

      <input
        className={`${classNameInput} w-1/3 self-center transition-all font-bold hover:bg-slate-400`}
        type="submit"
      />
    </form>
  );
}
