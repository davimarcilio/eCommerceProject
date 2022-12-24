import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { updateUser } from "../../../redux/user/userEditSlice";

export default function SetUpdateUser() {
  const editedUser = useSelector((state) => state.userEdit);
  const userId = useSelector((state) => state.user.user.user._id);
  const dispatch = useDispatch();
  return (
    <button
      onClick={() =>
        dispatch(
          updateUser({
            _id: userId,
            name: editedUser.name,
            email: editedUser.email,
            phone: editedUser.phone,
            zip: editedUser.zip,
            number: editedUser.number,
            city: editedUser.city,
            state: editedUser.states,
            address: editedUser.address,
          })
        )
      }
      className="py-2 px-6 bg-slate-400 text-white rounded hover:bg-slate-700 transition-all"
    >
      Salvar
    </button>
  );
}
