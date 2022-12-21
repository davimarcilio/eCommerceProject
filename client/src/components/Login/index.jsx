import React, { useRef, useState } from "react";
import axios from "axios";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/user/login", {
        email,
        password,
      });
      console.log(response.data.authorizationToken);
    } catch (error) {
      console.log(error);
    }
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
