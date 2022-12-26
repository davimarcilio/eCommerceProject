import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "./components/Product";
export default function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function getProducts() {
      const productsResponse = await axios.get(
        "http://localhost:3000/products/all"
      );
      const products = productsResponse.data;
      setProducts(products);
    }
    getProducts();
  }, []);
  return (
    <section className="w-full flex justify-center items-center">
      <ul className="grid pt-12 w-full gap-4 grid-cols-3 m-auto ">
        {products.map((product, index) => (
          <Product key={index} product={product} />
        ))}
      </ul>
    </section>
  );
}
