





import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Product from "../Product/Product"; // Ensure this path is correct
import "./ProductCategory.css";

function ProductCategory() {
  const { name } = useParams(); // Get the category name from the URL
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log(`Fetching products for category: ${name}`);
    axios
      .get(`https://fakestoreapi.com/products/category/${name}`)
      .then((res) => {
        console.log("Response data:", res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
      });
  }, [name]);

  return (
    <section className="product-category">
      <h2>{name.charAt(0).toUpperCase() + name.slice(1)}</h2> {/* Capitalize first letter */}
      <div className="product-list">
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map((singleProduct) => (
            <Product
              key={singleProduct.id}
              id={singleProduct.id}
              title={singleProduct.title}
              image={singleProduct.image}
              price={singleProduct.price}
              rating={singleProduct.rating.rate}
              ratingCount={singleProduct.rating.count}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default ProductCategory;










