import React, { useState } from "react";
import { useSelector } from "react-redux";
import UserData from "./components/UserData/UserData";
import UserDataState from "./components/UserData/UserDataState";
import UserDataPhone from "./components/UserData/UserDataPhone";
import UserDataCep from "./components/UserData/UserDataCep";
import UserDataCity from "./components/UserData/UserDataCity";
import UserDataAddress from "./components/UserData/UserDataAddress";
import UserDataNumber from "./components/UserData/UserDataNumber";
import UserDataGender from "./components/UserData/UserDataGenter";
import SetUpdateUser from "./functions/SetUpdatedUser";
import UserDataImage from "./components/UserData/UserDataImage";
import Loggout from "./components/Loggout";
import moment from "moment";
import { useEffect } from "react";

export default function User() {
  const user = useSelector((state) => state.user.user.user);
  const [NAME, setNAME] = useState("");
  const [IMAGE, setIMAGE] = useState("");
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
  useEffect(() => {
    if (!!user) {
      setNAME(user.name);
      setIMAGE(user.image);
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
        <main className="flex flex-col justify-center items-center gap-4 my-4 w-full">
          <UserDataImage image={IMAGE}></UserDataImage>
          <div className="flex flex-row gap-10 w-full px-56">
            <div className="flex flex-col gap-4 w-full">
              <h1 className="text-lg font-bold ">Informações pessoais</h1>
              <UserData editable={true} tag={"Nome"} value={NAME}></UserData>
              <UserData editable={false} tag={"CPF"} value={CPF}></UserData>
              <UserData editable={true} tag={"Email"} value={EMAIL}></UserData>
              <UserDataPhone tag={"Telefone"} value={PHONE}></UserDataPhone>
              <UserDataGender tag={"Sexo"} value={SEX}></UserDataGender>
              <UserData editable={false} tag={"Idade"} value={AGE}></UserData>
            </div>
            <div className="flex flex-col gap-4 w-full">
              <h1 className="text-lg font-bold ">Endereço de entrega</h1>
              <UserDataCep tag={"CEP"} value={CEP}></UserDataCep>
              <UserDataState tag={"Estado"} value={STATE}></UserDataState>
              <UserDataCity tag={"Cidade"} value={CITY}></UserDataCity>
              <UserDataAddress
                tag={"Endereço"}
                value={ADDRESS}
              ></UserDataAddress>
              <UserDataNumber tag={"Número"} value={NUMBER}></UserDataNumber>
            </div>
          </div>
          <SetUpdateUser />
          <Loggout />
        </main>
      </div>
    );
  }
}
