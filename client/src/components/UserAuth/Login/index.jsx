import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, reset } from "../../../redux/user/userSlice";
import clearServerMessage from "../functions/clearServerMessage";
import setServerMessageObject from "../functions/setServerMessageObject";
import EyeSVG from "../assets/images/EyeSVG";
import EyeSlashSVG from "../assets/images/EyeSlashSVG";
import InputError from "../components/InputError";
import ErrorModal from "../components/ErrorModal";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [serverMessage, setServerMessage] = useState({
    active: false,
    error: false,
    message: "",
  });
  const userAuth = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dispatch(loginUser(data));
    // navigate("/");
  };
  useEffect(() => {
    let timer;
    switch (userAuth.error) {
      case "Email don`t exists":
        setServerMessage(setServerMessageObject("Email não cadastrado."));
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
      case "User has been loged successfully":
        setServerMessage({
          active: true,
          error: false,
          message: "Login bem sucedido",
        });
        setTimeout(() => {
          navigate("/");
        }, 3000);
        break;
      case "Password is incorrect":
        setServerMessage(setServerMessageObject("Senha incorreta"));

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
  }, [userAuth]);
  const classNameInput = "py-2 px-5 rounded border border-gray-400 shadow-lg";
  return (
    <div>
      <ErrorModal
        active={serverMessage.active}
        type={serverMessage.error}
        message={serverMessage.message}
      />
      <form
        method="POST"
        className="max-w-2xl m-auto flex flex-col gap-5 mt-8 mb-8 font-Poppins"
        onSubmit={handleSubmit(onSubmit)}
      >
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
              className={`${classNameInput} w-full`}
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Senha é obrigatório!",

                maxLength: {
                  value: 50,
                  message: "Senha não pode ter mais de 50 caracteres!",
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
          <InputError>{errors.password?.message}</InputError>
        </div>
        <input
          className={`${classNameInput} w-1/3 self-center transition-all font-bold hover:bg-slate-400`}
          type="submit"
          value={"Entrar"}
        />
      </form>
      <hr />
      <section className="mt-4 m-auto flex flex-col justify-center items-center gap-6">
        <h1 className="font-extrabold text-2xl">Não possui cadastro?</h1>
        <Link to={"/register"}>
          <button
            className={`${classNameInput} px-6 pt-2 transition-all font-bold hover:bg-slate-400`}
          >
            Cadastrar
          </button>
        </Link>
      </section>
    </div>
  );
}
