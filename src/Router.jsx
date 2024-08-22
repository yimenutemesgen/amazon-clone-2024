

// import React from 'react'
// import {BrowserRouter as Router, Routes, Route, redirect} from "react-router-dom"
// import Landing from './pages/Landing/Landing'
// import Auth from './pages/Auth/Auth'
// import Payment from './pages/Payment/Payment'
// import Orders from './pages/Orders/Orders'
// import Cart from './pages/Cart/Cart'
// import Results from './pages/Results/Results'
// import ProductDetail from './pages/ProductDetail/ProductDetail'
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
// const stripePromise = loadStripe(
//   "pk_test_51PgYUMEwEJT5eZxs0mju2Gjx5wQwGLzH1v6DoaTRlolHWMkKKYNE2pO3Aj0c2p3KUYLdXhado9VP01R5X9OtuyVY00RWLArtKs"
// );


// function Routing() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Landing />} />
//         <Route path="/auth" element={<Auth />} />
//         <Route
//           path="/payments"
//           element={
//             <ProtectedRoute msg={"you must login to pay"} redirect={"/payments"}>
//               <Elements stripe={stripePromise}>
//                 <Payment />
//               </Elements>
//             </ProtectedRoute>
//           }
//         />
//         <Route path="/orders" element={<Orders />} />
//         <Route path="/category/:categoryName" element={<Results />} />
//         <Route path="/products/:productId" element={<ProductDetail />} />
//         <Route path="/cart" element={<Cart />} />
//       </Routes>
//     </Router>
//   );
// }

// export default Routing




// import React, { useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { DataContext } from "./components/DataProvider/DataProvider";

// const ProtectedRoute = ({ children, msg, redirect }) => {
//   const { user } = useContext(DataContext); // Assuming DataContext provides an object
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user) {
//       navigate("/auth", { state: { msg, redirect } });
//     }
//   }, [user, navigate, msg, redirect]);

//   return user ? children : null;
// };

// export default ProtectedRoute;








import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Auth from "./pages/Auth/Auth";
import Payment from "./pages/Payment/Payment";
import Orders from "./pages/Orders/Orders";
import Cart from "./pages/Cart/Cart";
import Results from "./pages/Results/Results";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";


const stripeApiKey = process.env.REACT_APP_STRIPE_API_KEY;
const stripePromise = loadStripe(stripeApiKey);

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/payments"
          element={
            <ProtectedRoute
              msg={"you must login to pay"}
              redirect={"/payments"}
            >
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />
        <Route path="/orders" element={<Orders />} />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routing;
