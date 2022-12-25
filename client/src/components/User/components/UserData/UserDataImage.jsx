import React, { useEffect } from "react";
import { useState } from "react";
import { initializeApp } from "firebase/app";
import { addImageUser } from "../../../../redux/user/userEditSlice";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyBFYcAMRU_MB8SRVULXguNU9S88cqr8Aao",
  authDomain: "ecommerce-61a7e.firebaseapp.com",
  projectId: "ecommerce-61a7e",
  storageBucket: "ecommerce-61a7e.appspot.com",
  messagingSenderId: "1074071690834",
  appId: "1:1074071690834:web:6d9930b62f0b82d2ffc98b",
  measurementId: "G-51Z27HTLDV",
  storageBucket: "gs://ecommerce-61a7e.appspot.com",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);
export default function UserDataImage(props) {
  const dispatch = useDispatch();
  const [hover, setHover] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [success, setSuccess] = useState(false);
  const [isJpgOrPng, setIsJpgOrPng] = useState(true);
  const user = useSelector((state) => state.user.user.user);
  useEffect(() => {
    return setEditValue(props.image);
  }, [props]);
  function handleAddImage(e) {
    const fileref = ref(storage, "Users/" + user._id);
    if (e.target.files[0].type.includes("image")) {
      uploadBytes(fileref, e.target.files[0])
        .then((snapshot) => {
          console.log(snapshot);
          dispatch(
            addImageUser({
              _id: user._id,
              imageUrl: `https://firebasestorage.googleapis.com/v0/b/${snapshot.metadata.bucket}/o/Users%2F${snapshot.metadata.name}?alt=media`,
            })
          );
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
            window.location.reload();
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setIsJpgOrPng(false);
      setTimeout(() => {
        setIsJpgOrPng(true);
      }, 2000);
    }
  }
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="w-60 h-60 rounded-full flex justify-center items-center bg-blue-50 border relative"
    >
      {success || !isJpgOrPng ? (
        !isJpgOrPng ? (
          <div className="absolute bg-red-400 w-96 px-4 py-6 rounded-md z-50 top-0">
            <h1 className="font-bold text-lg">
              Imagem deve ser no formato PNG ou JPG
            </h1>
          </div>
        ) : (
          <div className="absolute bg-green-400 w-96 px-4 py-6 rounded-md z-50 top-0">
            <h1 className="font-bold text-lg">
              Imagem adicionada com sucesso!
            </h1>
          </div>
        )
      ) : (
        ""
      )}
      {hover ? (
        <div className="absolute flex justify-end items-end cursor-pointer bg-slate-500 bg-opacity-50 rounded-full z-40 w-full h-full">
          <input
            onChange={handleAddImage}
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
        src={
          !!editValue
            ? editValue
            : "https://www.imagensempng.com.br/wp-content/uploads/2021/08/02-52.png"
        }
        alt=""
      />
    </div>
  );
}
