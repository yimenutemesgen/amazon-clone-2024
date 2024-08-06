




import { useEffect, useState } from "react";
import axios from "axios";
import ProductList from "../Product/ProductList"; // Adjust the path if necessary
import CustomCarousel from "../CustomCarousel/CustomCarousel"; // Adjust the path if necessary
import Category from "../Category/Category"; // Import the Category component
import "./Home.css";

function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products to get categories
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);

        // Extract unique categories from products
        const uniqueCategories = [
          ...new Set(res.data.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
      });
  }, []);

  return (
    <div className="home">
      <div className="home__container">
        <CustomCarousel /> {/* Include the custom carousel here */}
        <Category categories={categories} /> {/* Pass categories as prop */}
        <div className="home__row">
          <ProductList products={products} />
        </div>
      </div>
    </div>
  );
}

export default Home;



