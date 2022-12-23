import React, { useState } from "react";
import HeadersButton from "./HeaderButton";
import { Link } from "react-router-dom";
import { loginLocalUser } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function Header() {
  const dispatch = useDispatch();
  const userAuth = useSelector((state) => state.user);
  useEffect(() => {
    if (!!localStorage.getItem("authorization-token")) {
      dispatch(
        loginLocalUser({
          authorizationToken: localStorage.getItem("authorization-token"),
        })
      );
    }
    if (userAuth.error === "unauthorized") {
      return localStorage.removeItem("authorization-token");
    }
  }, [userAuth.error]);
  return (
    <header className="bg-blue-300 p-5 flex justify-evenly items-center shadow-2xl">
      <Link to={"/"}>
        <h1 className="float-left text-5xl">E-Commerce</h1>
      </Link>
      <nav>
        <ul className="flex float-right gap-28 text-2xl">
          <Link to={"/produtos"}>
            <HeadersButton>Produtos</HeadersButton>
          </Link>
          <Link to={"/carrinho"}>
            <HeadersButton>Carrinho</HeadersButton>
          </Link>
          <Link to={!userAuth.logged ? "/login" : "/user"}>
            <HeadersButton>{userAuth.logged ? "User" : "Login"}</HeadersButton>
          </Link>
        </ul>
      </nav>
    </header>
  );
}
