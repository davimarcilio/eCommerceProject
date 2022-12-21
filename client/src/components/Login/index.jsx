import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/login/loginSlice";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  async function handleLogin(e) {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
    navigate("/");
  }

  return (
    <div>
      <h1>Faca seu login</h1>
      <form method="POST">
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="E-Mail"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Senha"
        />
        <button onClick={handleLogin} type="submit">
          Logar
        </button>
      </form>
    </div>
  );
}
