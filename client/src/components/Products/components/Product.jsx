import React from "react";

export default function Product(props) {
  return (
    <li
      key={props.product._id}
      id={props.product._id}
      className="justify-self-center"
    >
      <div className="max-w-xs w-full bg-slate-500 p-2 rounded-md font-Poppins flex flex-col justify-center items-center font-bold">
        <img
          className="w-full h-96"
          src={props.product.images[0]}
          alt="Imagem do produto"
        />
        <h1 className="text-white  py-4">{props.product.title}</h1>
        <p className="text-green-100  py-1 ">R$ {props.product.price}</p>
        <button className="bg-green-500 px-4 py-2 rounded-md text-white hover:bg-green-700 transition-all">
          Comprar
        </button>
      </div>
    </li>
  );
}
