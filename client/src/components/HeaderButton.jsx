import React from "react";
export default function HeadersButton(props) {
  return (
    <li className="cursor-pointer bg-slate-800 text-white py-1 px-5 hover:bg-slate-500 transition-all rounded-lg">
      {props.children}
    </li>
  );
}
