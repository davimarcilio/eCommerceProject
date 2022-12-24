import React from "react";
import { useState } from "react";

export default function UserDataImage(props) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="w-60 h-60 rounded-full flex justify-center items-center bg-blue-50 border relative"
    >
      {hover ? (
        <div className="absolute flex justify-end items-end cursor-pointer bg-slate-500 bg-opacity-50 rounded-full z-50 w-full h-full">
          <input
            type={"file"}
            className={"h-full w-full absolute opacity-0 cursor-pointer"}
          />
          <i className="bi bi-pencil-square"></i>
        </div>
      ) : (
        ""
      )}
      <img
        className="w-full h-full p-2 rounded-full border"
        src={props.image}
        alt=""
      />
    </div>
  );
}
