




import React, { createContext, useReducer } from "react";
import { initialState, reducer } from "../../Utility/reducer";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // Initialize state and dispatch using useReducer
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};









