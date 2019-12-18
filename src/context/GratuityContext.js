import React from "react";

const GratuityStateContext = React.createContext();
const GratuityDispatchContext = React.createContext();

const gratuityReducer = (state, action) => {
  switch (action.type) {
    case "SET_GRATUITY":
      return { ...state, ...action.payload };
    default: {
      throw new Error(`Unsupported action type: ${action.type}`);
    }
  }
  //   return { ...state, tipAmount: action.payload };
  //   return { ...state, airlineTip: action.payload };
};

const useGratuityState = () => {
  const context = React.useContext(GratuityStateContext);
  if (!context) {
    throw new Error(`useGratuityState must be used within a PaymentProvider`);
  }
  return {
    gratuityState: context
  };
};

const useGratuityDispatch = () => {
  const context = React.useContext(GratuityDispatchContext);
  if (!context) {
    throw new Error(`useGratuityState must be used within a PaymentProvider`);
  }
  return {
    gratuityDispatch: context
  };
};

const initialState = {};

const GratuityProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(gratuityReducer, initialState);
  return (
    <GratuityStateContext value={state}>
      <GratuityDispatchContext value={dispatch}>
        {children}
      </GratuityDispatchContext>
    </GratuityStateContext>
  );
};

export { GratuityProvider, useGratuityState, useGratuityDispatch };
// dispatch(
//   sendWebkitMessageToIOS('handleTipPercentageChange', {
//     tipPercentage: tipPercentage,
//     tipAmount: null
//   })
