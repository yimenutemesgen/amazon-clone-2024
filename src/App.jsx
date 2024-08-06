





import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Checkout from "./components/Checkout/Checkout";
import Login from "./components/Login/Login";
import Payment from "./components/Payment/Payment";
import Orders from "./components/Orders/Orders";
import ProductCategory from "./components/ProductCategory/ProductCategory"; // Import the ProductCategory component
import { auth } from "./firebase";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useStateValue } from "./StateProvider";

const stripePromise = loadStripe(
  "pk_test_51PgYUMEwEJT5eZxs0mju2Gjx5wQwGLzH1v6DoaTRlolHWMkKKYNE2pO3Aj0c2p3KUYLdXhado9VP01R5X9OtuyVY00RWLArtKs"
);

function App() {
  const [{}, dispatch] = useStateValue();

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });

    return () => {
      unsubscribe(); // Clean up the subscription on component unmount
    };
  }, [dispatch]);

  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/payment"
            element={
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            }
          />
          <Route path="/orders" element={<Orders />} />
          <Route path="/category/:name" element={<ProductCategory />} />{" "}
          {/* Route for category pages */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
