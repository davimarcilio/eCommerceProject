import React from "react";
import HeadersButton from "./HeaderButton";
import { Link } from "react-router-dom";

export default function Header() {
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
          <Link to={"/login"}>
            <HeadersButton>User</HeadersButton>
          </Link>
        </ul>
      </nav>
    </header>
  );
}
