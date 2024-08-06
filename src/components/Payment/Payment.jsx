






import { useState, useEffect } from "react";
import { useStateValue } from "../../StateProvider";
import { Link, useNavigate } from "react-router-dom";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
import { getBasketTotal } from "../../reducer";
import "./Payment.css";
import CurrencyFormat from "react-currency-format";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "../../axios";
import { doc, setDoc } from "firebase/firestore"; // Import Firestore methods
import { db } from "../../firebase"; // Import db from firebase

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Clear error messages on component mount
    setError(null);

    const getClientSecret = async () => {
      try {
        // Fetch the client secret from your backend
        const response = await axios.post(
          `/payments/create?total=${getBasketTotal(basket) * 100}` // Convert to cents
        );
        setClientSecret(response.data.clientSecret);
      } catch (err) {
        console.error("Error fetching client secret:", err);
        setError("Failed to fetch client secret");
      }
    };

    getClientSecret();
  }, [basket]);

  console.log("THE SECRET IS >>>", clientSecret);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (error) {
        throw new Error(error.message);
      }

      if (!paymentIntent) {
        throw new Error("PaymentIntent is undefined");
      }

      // Save the order to Firestore
      await setDoc(doc(db, "users", user?.uid, "orders", paymentIntent.id), {
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });

      setSucceeded(true);
      setError(null);
      setProcessing(false);

      dispatch({
        type: "EMPTY_BASKET",
      });

      navigate("/orders");
    } catch (error) {
      setError(`Payment failed: ${error.message}`);
      setProcessing(false);
    }
  };

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket.length} items</Link>)
        </h1>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA 90210</p>
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
                hideButton
              />
            ))}
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <h3>Order Total: {value}</h3>
                    </>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
