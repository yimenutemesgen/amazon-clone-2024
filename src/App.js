





import React, { useContext, useEffect } from "react";
import Routing from "./Router";
import { DataContext } from "./components/DataProvider/DataProvider";
import { Type } from "./Utility/action.type";
import { auth } from "./Utility/firebase";

function App() {
  const { state, dispatch } = useContext(DataContext);
  const { user } = state;
  console.log(user);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });

    // Cleanup the subscription on unmount
    return () => unsubscribe();
  }, [dispatch]);

  return <Routing />;
}

export default App;
