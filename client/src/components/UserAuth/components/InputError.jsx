import React from "react";

export default function InputError(props) {
  return (
    <p className="text-red-600" role="alert">
      {props.children}
    </p>
  );
}
