


import React, { useContext, useEffect, useState } from "react";
import LayOut from "../../components/LayOut/LayOut";
import { db } from "../../Utility/firebase";
import { DataContext } from "../../components/DataProvider/DataProvider";
import classes from "./Orders.module.css";
import ProductCard from "../../components/Products/ProductCard";

function Orders() {
  const { state } = useContext(DataContext);
  const { user } = state; // No need to destructure dispatch if not used
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      const unsubscribe = db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          const fetchedOrders = snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }));
          setOrders(fetchedOrders);
        });

      // Cleanup the subscription on unmount
      return () => unsubscribe();
    } else {
      setOrders([]);
    }
  }, [user]); // Add `user` to the dependency array

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders__container}>
          <h2>Your Orders</h2>
         {
            orders?.length=== 0 && <div className={classes.unorder}>No orders yet!</div>
          }
          {/* ordered items */}
          <div>
            {orders?.map((eachOrder) => (
              <div key={eachOrder.id}>
                <hr />
                <p>Order ID: {eachOrder.id}</p>
                {eachOrder?.data?.basket.map((orderItem) => (
                  <ProductCard
                    flex={true}
                    product={orderItem}
                    key={orderItem.id}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;










// import React, { useContext, useEffect, useState } from "react";
// import LayOut from "../../components/LayOut/LayOut";
// import { db } from "../../Utility/firebase";
// import { DataContext } from "../../components/DataProvider/DataProvider";
// import classes from "./Orders.module.css";
// import ProductCard from "../../components/Products/ProductCard";
// // import { Type } from "../../Utility/action.type"; 

// function Orders() {
//   const { state, dispatch } = useContext(DataContext);
//   const { user } = state;
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     if (user) {
//       const unsubscribe = db
//         .collection("users")
//         .doc(user.uid)
//         .collection("orders")
//         .orderBy("created", "desc")
//         .onSnapshot((snapshot) => {
//           const fetchedOrders = snapshot.docs.map((doc) => ({
//             id: doc.id,
//             data: doc.data(),
//           }));
//           setOrders(fetchedOrders);
//         });

//       return () => unsubscribe();
//     } else {
//       setOrders([]);
//     }
//   }, [user]);



//   return (
//     <LayOut>
//       <section className={classes.container}>
//         <div className={classes.orders__container}>
//           <h2>Your Orders</h2>
//           {orders.length === 0 && (
//             <div className={classes.unorder}>No orders yet!</div>
//           )}
//           <div>
//             {orders.map((eachOrder) => (
//               <div key={eachOrder.id}>
//                 <hr />
//                 <p>Order ID: {eachOrder.id}</p>
//                 {eachOrder.data.basket.map((orderItem) => (
//                   <div key={orderItem.id} className={classes.orderItem}>
//                     <ProductCard flex={true} product={orderItem} />
//                     <button
//                       className={classes.removeButton}
//                       onClick={() =>
//                         removeItemFromOrder(eachOrder.id, orderItem.id)
//                       }
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </LayOut>
//   );
// }

// export default Orders;
