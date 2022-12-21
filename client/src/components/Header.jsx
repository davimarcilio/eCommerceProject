import React, { useState } from "react";
import HeadersButton from "./HeaderButton";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const userAuth = useSelector((state) => state.user);

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
