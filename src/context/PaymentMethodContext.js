import React from "react";

const PaymentStateContext = React.createContext();
const PaymentDispatchContext = React.createContext();

const paymentReducer = (state, action) => {
  switch (action.type) {
    case "SET_PAYMENT_TYPE":
      return { ...state, payment_type: action.payload };
    default: {
      throw new Error(`Unsupported action type: ${action.type}`);
    }
  }
};

const usePaymentState = () => {
  const context = React.useContext(PaymentStateContext);
  if (!context) {
    throw new Error(`usePaymentState must be used within a PaymentProvider`);
  }
  return {
    paymentState: context
  };
};

const usePaymentDispatch = () => {
  const context = React.useContext(PaymentDispatchContext);
  if (!context) {
    throw new Error(`usePaymentDispatch must be use within PaymentProvider`);
  }
  return {
    paymentDispatch: context
  };
};

const initialState = { payment_type: "CREDITCARD" };

const PaymentProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(paymentReducer, initialState);

  return (
    <PaymentStateContext.Provider value={state}>
      <PaymentDispatchContext.Provider value={dispatch}>
        {children}
      </PaymentDispatchContext.Provider>
    </PaymentStateContext.Provider>
  );
};

export { PaymentProvider, usePaymentState, usePaymentDispatch };
