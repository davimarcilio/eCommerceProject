import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import Header from "./components/Header";
function Nav() {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   const localAuth = localStorage.getItem("authorization-token");
  //   if (!!localAuth) {
  //     dispatch
  //   }
  // }, []);
  return (
    <div className="font-Poppins">
      <Header></Header>
    </div>
  );
}

export default Nav;
