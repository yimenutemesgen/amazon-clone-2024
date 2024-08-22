






import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "../Products/ProductCard";
import classes from "./Product.module.css";
import Loader from "../Loader/Loader";

function Product() {
  // Initialize products as an empty array
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true); // Set loading to true when fetching starts
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false); // Set loading to false after fetching completes
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false); // Set loading to false if there's an error
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={classes.products__container}>
          {products.length > 0 ? (
            products.map((singleProduct) => (
              <ProductCard renderAdd={true}
              product={singleProduct} key={singleProduct.id} />
            ))
          ) : (
            <p>Loading products...</p> // Show a loading message if products array is empty
          )}
        </section>
      )}
    </>
  );
}

export default Product;
