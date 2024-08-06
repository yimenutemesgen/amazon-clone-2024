



import { useEffect, useState } from "react";
import axios from "axios";
import Product from "./Product";
import "./ProductList.css";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className="product-list">
      {products.map((singleProduct) => (
        <Product
          key={singleProduct.id}
          id={singleProduct.id}
          title={singleProduct.title}
          image={singleProduct.image}
          price={singleProduct.price}
          rating={singleProduct.rating.rate}
          ratingCount={singleProduct.rating.count}
        />
      ))}
    </section>
  );
}

export default ProductList;

