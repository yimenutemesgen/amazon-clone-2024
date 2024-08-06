








import React from "react";
import { useStateValue } from "../../StateProvider"; // Import your state management hook
import Rating from "@mui/material/Rating";
import "./Product.css";

function Product({ id, title, image, price, rating, ratingCount }) {
  const [{ basket }, dispatch] = useStateValue(); // Access the state and dispatch function

  const addToBasket = () => {
    // Dispatch the item into the data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id,
        title,
        image,
        price,
        rating,
        ratingCount,
      },
    });
  };

  return (
    <div className="product">
      <img src={image} alt={title} />
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          <Rating value={rating} precision={0.1} readOnly />
          <small>{ratingCount}</small>
        </div>
      </div>
      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
}

export default Product;
