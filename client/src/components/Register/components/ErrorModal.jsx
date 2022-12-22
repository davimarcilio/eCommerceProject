import React from "react";

export default function ErrorModal(props) {
  return (
    <div
      className={`absolute flex ${
        props.active ? "" : "hidden"
      } z-40  mt-6 left-0 top-0 w-full`}
    >
      <h1
        className={`m-auto p-10 rounded-lg shadow-2xl text-xl font-bold shadow-black 
          ${props.type ? "bg-red-500" : "bg-green-500"}
            w-full max-w-md`}
      >
        {props.message}
      </h1>
    </div>
  );
}
