import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import UserData from "./components/UserData/UserData";
import UserDataState from "./components/UserData/UserDataState";
import UserDataPhone from "./components/UserData/UserDataPhone";
import UserDataCep from "./components/UserData/UserDataCep";
import UserDataCity from "./components/UserData/UserDataCity";
import UserDataAddress from "./components/UserData/UserDataAddress";
import UserDataNumber from "./components/UserData/UserDataNumber";
import UserDataGender from "./components/UserData/UserDataGenter";
import moment from "moment";
import { useEffect } from "react";

export default function User() {
  const user = useSelector((state) => state.user.user.user);
  const [NAME, setNAME] = useState("");
  const [CPF, setCPF] = useState("");
  const [EMAIL, setEMAIL] = useState("");
  const [PHONE, setPHONE] = useState("");
  const [ADDRESS, setADDRESS] = useState("");
  const [CEP, setCEP] = useState("");
  const [CITY, setCITY] = useState("");
  const [STATE, setSTATE] = useState("");
  const [NUMBER, setNUMBER] = useState("");
  const [SEX, setSEX] = useState("");
  const [AGE, setAGE] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (!!user) {
      setNAME(user.name);
      setCPF(user.cpf);
      setEMAIL(user.email);
      setPHONE(user.phone);
      setADDRESS(user.address);
      setCEP(user.zip);
      setSTATE(user.state);
      setNUMBER(user.number);
      setSEX(user.sex);
      setCITY(user.city);
      setAGE(moment(user.birthDate).fromNow().slice(0, 2));
      return;
    }
  }, [user]);

  if (!!user) {
    return (
      <div className="gap-4 font-Poppins mt-6 flex flex-col justify-center items-center">
        <h1 className=" text-2xl font-semibold">
          BEM VIND{user.sex === "M" ? "O" : "A"}
        </h1>
        <main className="flex flex-col justify-center items-center gap-3 my-4 max-w-2xl">
          <div className="w-60 h-60 rounded-full flex justify-center items-center bg-blue-50 border">
            <img
              className="w-full h-full p-2 rounded-full border"
              src={user.image}
              alt=""
            />
          </div>
          <UserData editable={true} tag={"Nome"} value={NAME}></UserData>
          <UserData editable={false} tag={"CPF"} value={CPF}></UserData>
          <UserData editable={true} tag={"Email"} value={EMAIL}></UserData>
          <UserDataPhone tag={"Telefone"} value={PHONE}></UserDataPhone>
          <UserDataCep tag={"CEP"} value={CEP}></UserDataCep>
          <UserDataState tag={"Estado"} value={STATE}></UserDataState>
          <UserDataCity tag={"Cidade"} value={CITY}></UserDataCity>
          <UserDataAddress tag={"Endereço"} value={ADDRESS}></UserDataAddress>
          <UserDataNumber tag={"Número"} value={NUMBER}></UserDataNumber>
          <UserDataGender tag={"Sexo"} value={SEX}></UserDataGender>
          <UserData editable={false} tag={"Idade"} value={AGE}></UserData>
          <input type="submit" value="Salvar" />
        </main>
      </div>
    );
  }
}
