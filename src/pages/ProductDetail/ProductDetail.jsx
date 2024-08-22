


import React, { useEffect, useState } from "react";
import LayOut from "../../components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productURL } from "../../Api/endPoints";
import ProductCard from "../../components/Products/ProductCard";
import Loader from "../../components/Loader/Loader"; 

function ProductDetail() {
  const { productId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${productURL}/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [productId]);

  return (
    <LayOut>
      {isLoading && <Loader />}
      {product ? (
        <ProductCard
         product={product}
        flex = {true}
        renderDesc={true}
        renderAdd={true}
         />
      ) : (
        !isLoading && <p>Product not found or failed to load</p>
      )}
    </LayOut>
  );
}

export default ProductDetail;
