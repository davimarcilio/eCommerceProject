import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/user/userSlice";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userAuth = useSelector((state) => state.user);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  async function handleLogin(e) {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
    navigate("/");
  }

  useEffect(() => {
    if (userAuth.logged) {
      return navigate("/");
    }
  }, [userAuth.logged]);

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
      <section>
        <h1>Nao possui cadastro?</h1>
        <Link to={"/register"}>
          <button>Cadastrar</button>
        </Link>
      </section>
    </div>
  );
}
