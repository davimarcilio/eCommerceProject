import React, { useEffect, useState } from "react";
export default function UserDataGender(props) {
  const [edit, setEdit] = useState(false);
  const [editValue, setEditValue] = useState("");
  useEffect(() => {
    return setEditValue(props.value);
  }, [props]);

  return (
    <div
      className={`flex gap-2 ${
        !!props.value ? "" : "bg-slate-300 text-slate-500 "
      } relative justify-between shadow-md ${
        !edit ? "py-2 px-4" : "bg-white"
      }  w-full`}
    >
      {edit ? (
        <select
          className="w-full h-full py-2 px-4 text-black appearance-none"
          defaultValue={editValue}
          onChange={(e) => setEditValue(e.target.value)}
        >
          <option value={""} disabled>
            Gênero
          </option>
          <option value="M">Masculino</option>
          <option value="F">Feminino</option>
        </select>
      ) : (
        // <input
        //   onChange={(e) => setEditValue(e.target.value)}
        //   className="w-full h-full py-2 px-4 text-black"
        //   type="text"
        //   value={editValue}
        //   placeholder={
        //     !!!editValue
        //       ? props.tag + ":  " + "Adicione"
        //       : props.tag + ":  " + editValue
        //   }
        // />
        <div className={`flex gap-2 `}>
          <h1>{props.tag}:</h1>
          <p>
            {" "}
            {!!editValue
              ? editValue === "M"
                ? "Masculino"
                : "Feminino"
              : `Adicione`}
          </p>
        </div>
      )}
      <button
        onClick={() => (edit ? setEdit(false) : setEdit(true))}
        className={`text-black ${
          !edit ? "" : "absolute right-0 top-1/2 -translate-y-1/2 px-4"
        }`}
      >
        <i className="bi bi-pencil-square"></i>
      </button>
    </div>
  );
}
