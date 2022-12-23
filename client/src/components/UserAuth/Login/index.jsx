import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../../redux/user/userSlice";
import EyeSVG from "../assets/images/EyeSVG";
import EyeSlashSVG from "../assets/images/EyeSlashSVG";
import InputError from "../components/InputError";
import ErrorModal from "../components/ErrorModal";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const userAuth = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (userAuth.logged) {
      return navigate("/");
    }
  }, [userAuth.logged]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dispatch(loginUser(data));
    navigate("/");
  };
  const classNameInput = "py-2 px-5 rounded border border-gray-400 shadow-lg";
  return (
    <div>
      <ErrorModal active={true} type={false} message={"text"} />
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
          <InputError>{errors.password?.message}</InputError>
        </div>
        <input
          className={`${classNameInput} w-1/3 self-center transition-all font-bold hover:bg-slate-400`}
          type="submit"
          value={"Entrar"}
        />
      </form>
      <section>
        <h1>Nao possui cadastro?</h1>
        <Link to={"/register"}>
          <button>Cadastrar</button>
        </Link>
      </section>
    </div>
  );
}
