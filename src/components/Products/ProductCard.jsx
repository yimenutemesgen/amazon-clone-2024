








import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import { NumericFormat } from "react-number-format";
import classes from "./Product.module.css";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";

function ProductCard({ product, flex, renderDesc, renderAdd }) {
  const { image, title, id, rating, price, description } = product;
  const { state, dispatch } = useContext(DataContext);

  const addToCart = () => {
    try {
      dispatch({
        type: Type.ADD_TO_BASKET,
        item: {
          image,
          title,
          id,
          rating,
          price,
          description,
        },
      });
    } catch (error) {
      console.error("Failed to add item to cart", error);
    }
  };

  return (
    <div
      className={`${classes.card__container} ${
        flex ? classes.product__flexed : ""
      }`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt={title} className={classes.product__image} />
      </Link>
      <div className={classes.product__details}>
        <h3 className={classes.product__title}>{title}</h3>
        {renderDesc && (
          <div style={{maxWidth: "700"} }className={classes.product__description}>{description}</div>
        )}
        <div className={classes.product__rating}>
          <Rating value={rating.rate} precision={0.1} readOnly />
          <small>{rating.count}</small>
        </div>
        <div className={classes.product__price}>
          <NumericFormat
            value={price}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
            decimalScale={2}
          />
        </div>
        {renderAdd && (
          <button className={classes.button} onClick={addToCart}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;







