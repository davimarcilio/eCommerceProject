import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addState } from "../../../../redux/user/userEditSlice";
export default function UserDataState(props) {
  const [edit, setEdit] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [states, setStates] = useState([]);
  const dispatch = useDispatch();
  const userEdit = useSelector((state) => state.userEdit);
  useEffect(() => {
    if (!!userEdit.zipDataCep.state) {
      setEditValue(userEdit.zipDataCep.state);
    }
  }, [userEdit]);
  useEffect(() => {
    return setEditValue(props.value);
  }, [props]);
  useEffect(() => {
    async function onStatesAPI() {
      const statesAPI = await axios.get(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      );
      setStates(statesAPI.data);
    }
    onStatesAPI();
  }, []);
  useEffect(() => {
    dispatch(addState(editValue));
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
        <select
          onChange={(e) => setEditValue(e.target.value)}
          className="w-full h-full py-2 px-4 text-black appearance-none"
          defaultValue={editValue}
        >
          <option value={""} disabled>
            Estado
          </option>
          {states.map((state) => {
            return (
              <option key={state.id} value={state.sigla}>
                {state.nome}
              </option>
            );
          })}
        </select>
      ) : (
        <div className={`flex gap-2 `}>
          <h1>{props.tag}:</h1>
          <p> {!!editValue ? editValue : `Adicione`}</p>
        </div>
      )}
      <button
        type="button"
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
