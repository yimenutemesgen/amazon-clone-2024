import React, { useEffect, useState } from "react";
import classes from "./Results.module.css"
import LayOut from "../../components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productURL } from "../../Api/endPoints";
import ProductCard from "../../components/Products/ProductCard";

function Results() {
  const [results, setResults] = useState([]);
  const { categoryName } = useParams();
  useEffect(() => {
    axios
      .get(`${productURL}/products/category/${categoryName}`)
      .then((res) => {
        setResults(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return(
  <LayOut>
    <section>
      <h1 style={{padding: "30px"}}>Results</h1>
      <p style={{padding: "30px"}}>Category/ {categoryName}</p>
      <hr/>
      <div className={classes.products__container}>
        {results?.map((product)=>{
          return<ProductCard key={product.id}
          product={product}
          renderDesc={false}
          renderAdd={true}
          />
        })}

      </div>
    </section>
  </LayOut>
  )
}
export default Results;
