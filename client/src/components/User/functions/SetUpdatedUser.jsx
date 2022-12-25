import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { updateUser } from "../../../redux/user/userEditSlice";
import { loginLocalUser } from "../../../redux/user/userSlice";

export default function SetUpdateUser() {
  const editedUser = useSelector((state) => state.userEdit);
  const userId = useSelector((state) => state.user.user.user._id);
  useEffect(() => {
    dispatch(
      loginLocalUser({
        authorizationToken: localStorage.getItem("authorization-token"),
      })
    );
  }, [editedUser.success]);
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
            sex: editedUser.sex,
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
