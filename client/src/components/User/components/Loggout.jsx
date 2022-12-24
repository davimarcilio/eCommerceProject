import React from "react";
import { useDispatch } from "react-redux";
import { reset as resetEditUser } from "../../../redux/user/userEditSlice";
import { reset as resetLogin } from "../../../redux/user/userSlice";
export default function Loggout() {
  const dispatch = useDispatch();
  return (
    <button
      className="py-2 px-6 bg-slate-400 text-white rounded hover:bg-slate-700 transition-all"
      onClick={() => {
        dispatch(resetLogin());
        dispatch(resetEditUser());
        localStorage.removeItem("authorization-token");
      }}
      type="button"
    >
      Sair
    </button>
  );
}
