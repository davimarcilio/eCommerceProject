import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../../../../redux/user/userEditSlice";
export default function UserDataAddress(props) {
  const [edit, setEdit] = useState(false);
  const [editValue, setEditValue] = useState("");
  useEffect(() => {
    return setEditValue(props.value);
  }, [props]);

  const dispatch = useDispatch();
  const userEdit = useSelector((state) => state.userEdit);
  useEffect(() => {
    if (!!userEdit.zipDataCep.street) {
      setEditValue(userEdit.zipDataCep.street);
    }
  }, [userEdit]);
  useEffect(() => {
    dispatch(addAddress(editValue));
  }, [editValue]);

  return (
    <div
      className={`flex gap-2 ${
        !!props.value ? "" : "bg-slate-300 text-slate-500 "
      } relative justify-between shadow-md ${
        !edit ? "py-2 px-4" : "bg-white"
      }  w-full`}
    >
      {edit ? (
        <input
          onChange={(e) => setEditValue(e.target.value)}
          className="w-full h-full py-2 px-4 text-black"
          type="text"
          value={editValue}
          placeholder={
            !!!editValue
              ? props.tag + ":  " + "Adicione"
              : props.tag + ":  " + editValue
          }
        />
      ) : (
        <div className={`flex gap-2 `}>
          <h1>{props.tag}:</h1>
          <p> {!!editValue ? editValue : `Adicione`}</p>
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
