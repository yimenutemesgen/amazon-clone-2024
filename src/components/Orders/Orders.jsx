



// // src/Orders/Orders.jsx
// import  { useState, useEffect } from 'react';
// import { useStateValue } from '../../StateProvider'; // Adjust the path as needed
// import { db } from '../../firebase'; // Import Firestore configuration
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import './Orders.css';

// function Orders() {
//   const [{ user }] = useStateValue();
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     if (user) {
//       const fetchOrders = async () => {
//         try {
//           const ordersQuery = query(
//             collection(db, 'users', user.uid, 'orders')
//           );
//           const querySnapshot = await getDocs(ordersQuery);
//           const fetchedOrders = querySnapshot.docs.map(doc => ({
//             id: doc.id,
//             ...doc.data()
//           }));
//           setOrders(fetchedOrders);
//         } catch (error) {
//           console.error('Error fetching orders:', error);
//         }
//       };

//       fetchOrders();
//     }
//   }, [user]);

//   return (
//     <div className="orders">
//       <div className="orders__container">
//         <h1>Your Orders</h1>
//         {orders.length === 0 ? (
//           <p>You have no orders.</p>
//         ) : (
//           orders.map(order => (
//             <div key={order.id} className="order">
//               <h2>Order ID: {order.id}</h2>
//               <p>Date: {new Date(order.created * 1000).toLocaleDateString()}</p>
//               <p>Total Amount: ${order.amount / 100}</p>
//               <div className="order__items">
//                 {order.basket.map(item => (
//                   <div key={item.id} className="order__item">
//                     <img src={item.image} alt={item.title} />
//                     <div className="order__itemInfo">
//                       <h3>{item.title}</h3>
//                       <p>Price: ${item.price}</p>
//                       <p>Quantity: {item.quantity}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// export default Orders;





import { useState, useEffect } from "react";
import { useStateValue } from "../../StateProvider"; // Adjust the path as needed
import { db } from "../../firebase"; // Import Firestore configuration
import { collection, query, getDocs } from "firebase/firestore";
import "./Orders.css";

function Orders() {
  const [{ user }] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchOrders = async () => {
        try {
          // Query Firestore to get orders for the current user
          const ordersQuery = query(
            collection(db, "users", user.uid, "orders")
          );
          const querySnapshot = await getDocs(ordersQuery);

          // Map query results to an array of order objects
          const fetchedOrders = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setOrders(fetchedOrders);
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      };

      fetchOrders();
    }
  }, [user]);

  return (
    <div className="orders">
      <div className="orders__container">
        <h1>Your Orders</h1>
        {orders.length === 0 ? (
          <p>You have no orders.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="order">
              <h2>Order ID: {order.id}</h2>
              <p>
                Date:{" "}
                {new Date(order.created.seconds * 1000).toLocaleDateString()}
              </p>{" "}
              {/* Adjust if using different timestamp */}
              <p>Total Amount: ${order.amount / 100}</p>
              <div className="order__items">
                {order.basket?.map((item) => (
                  <div key={item.id} className="order__item">
                    <img src={item.image} alt={item.title} />
                    <div className="order__itemInfo">
                      <h3>{item.title}</h3>
                      <p>Price: ${item.price}</p>
                      <p>Quantity: {item.quantity || 1}</p>{" "}
                      {/* Default to 1 if quantity is missing */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Orders;
