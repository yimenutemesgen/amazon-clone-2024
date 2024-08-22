





import React, { useContext } from "react";
import LayOut from "../../components/LayOut/LayOut";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Products/ProductCard";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";
import classes from "./Cart.module.css";
import { Type } from "../../Utility/action.type";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

function Cart() {
  // Destructure basket and user from DataContext
  const {
    state: { basket, user },
    dispatch,
  } = useContext(DataContext);

  // Calculate the total price of items in the basket
  const total = basket.reduce(
    (amount, item) => amount + item.price * item.amount,
    0
  );

  const increment = (item)=>{
    dispatch({
      type: Type.ADD_TO_BASKET,
      item
    })
  }

  const decrement = (id)=>{
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id
    })
  }

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.cart__container}>
          <h2>Hello, {user?.name || "Guest"}</h2>
          <h3>Your Shopping Basket</h3>
          <hr />
          {basket?.length === 0 ? (
            <p>Oops! No items in your cart</p>
          ) : (
            basket.map((item) => (
              <section key={item.id} className={classes.cart__product}>
                {" "}
                {/* Moved the key here */}
                <ProductCard
                  product={item}
                  renderDesc={true}
                  renderAdd={false}
                  flex={true}
                />

                <div className={classes.btn__container}>
                  <button className={classes.btn} onClick={()=>increment(item)}><IoIosArrowUp size={20}/></button>
                  <span>{item.amount}</span>
                  <button className={classes.btn} onClick={()=>decrement(item.id)}><IoIosArrowDown size={20}/></button>
                </div>
              </section>
            ))
          )}
        </div>

        {basket?.length !== 0 && (
          <div className={classes.subtotal}>
            <div>
              <p>Subtotal ({basket.length} items):</p>
              <NumericFormat
                value={total}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
                decimalScale={2}
                fixedDecimalScale={true}
              />
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to="/payments">Continue to checkout</Link>
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Cart;


