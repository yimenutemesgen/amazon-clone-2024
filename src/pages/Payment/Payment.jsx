


import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import LayOut from "../../components/LayOut/LayOut";
import ProductCard from "../../components/Products/ProductCard";
import classes from "./Payment.module.css";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { NumericFormat } from "react-number-format";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../Utility/firebase";
import { Type } from "../../Utility/action.type";

function Payment() {
  const { state, dispatch } = useContext(DataContext);
  const { basket, user  } = state;
  const navigate = useNavigate(); // Initialize navigate

  // Calculate total items in basket
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket.reduce(
    (amount, item) => amount + item.price * item.amount,
    0
  );

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (e) => {
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      // Contact backend to get client secret
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });
      console.log("Backend Response:", response.data);

      const clientSecret = response.data?.client_secret;

      if (!clientSecret) {
        throw new Error("Client secret is missing from the backend response.");
      }

      // Confirm card payment on client side
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (error) {
        console.error("Payment Error:", error.message);
        setCardError(error.message);
      } else if (paymentIntent.status === "succeeded") {
        console.log("Payment Succeeded:", paymentIntent);

        // Save order to Firestore and clear basket
        const ordersCollectionRef = collection(db, "users", user.uid, "orders");
        const orderDocRef = doc(ordersCollectionRef, paymentIntent.id);

        await setDoc(orderDocRef, {
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

        // clearing the basket
        dispatch({
          type:Type.EMPTY_BASKET
        })
        // Navigate to orders page with state
        navigate("/orders", { state: { msg: "You have placed a new order" } });
      } else {
        console.log("Unexpected Result:", { error, paymentIntent });
      }
    } catch (error) {
      console.error("Error during payment process:", error.message);
      setCardError(error.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      {/* Header */}
      <div className={classes.payment__header}>
        Checkout ({totalItem}) items
      </div>

      {/* Payment Method */}
      <section className={classes.payment}>
        {/* Address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user ? user.email : "User Email"}</div>
            <div>123 React Lane</div>
            <div>Chicago</div>
          </div>
        </div>
        <hr />

        {/* Product */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard key={item.id} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />

        {/* Card Form */}
        <div className={classes.flex}>
          <h3>Payment Method</h3>
          <div className={classes.payment__card__container}>
            <div className={classes.payment__details}>
              <form onSubmit={handlePayment}>
                {/* Error */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* Card Element */}
                <CardElement onChange={handleChange} />
                {/* Price */}
                <div className={classes.Payment__price}>
                  <div>
                    <span style={{ display: "flex" }}>
                      <p>Total Order | {""}</p>
                      <NumericFormat
                        value={total}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                        decimalScale={2}
                        fixedDecimalScale={true}
                      />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please Wait...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;























































