import React, { useReducer } from "react";

import data from "../data/appState.json";

const CheckoutContext = React.createContext();

export const CheckoutProvider = ({ children }) => {
  // const initialState = {
  //   itemQuantity: 0,
  //   airlineSubtotalMiles: 0,
  //   subtotal: 0,
  //   airlineTip: 0,
  //   tipAmount: 0,
  //   totalException: 0,
  //   tax: 0,
  //   airlineTax: 0,
  //   payment_type: "CREDITCARD"
  // };

  const initialState = data;

  let reducer = (state, action) => {
    switch (action.type) {
      case "SET_INIT_APPSTATE":
        console.log(
          `SET_INIT_APPSTATE - action.payload - ${JSON.stringify(
            action.payload
          )}`
        );
        return { ...state, ...action.payload };
      case "UPDATE_ALL_TOTALS":
        return { ...state, ...action.payload };
      case "SET_CURRENCY":
        console.log(`SET_CURRENCY`);
        return { ...state, payment_type: action.payload };
      case "SET_MILES":
        console.log(`SET_MILES`);
        return { ...state, payment_type: action.payload };
      case "SET_GRATUITY":
        return { ...state, tipAmount: action.payload };
      case "SET_GRATUITY_MILES":
        return { ...state, airlineTip: action.payload };
      // case "UPDATE_PROMOCODE":
      //   return { ...state, promoCode: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const sendWebkitMessageToIOS = (message, data) => {
    console.log(
      `sendWebkitMessageToIOS = (message, data) - ${message} - ${JSON.stringify(
        data
      )}`
    );
    // if (isAppPresent()) {
    data =
      data !== undefined
        ? JSON.stringify(data)
        : JSON.stringify({ message: message });
    window.webkit.messageHandlers[message].postMessage(data);
    // LogRocket.track(message);
    // dispatch({ type: types.SEND_WEBKIT_MESSAGE, payload: message });
    // }
  };

  return (
    <CheckoutContext.Provider
      value={{
        state,
        dispatch,
        sendWebkitMessageToIOS
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutContext;

// export const sendWebkitMessageToIOS = (message, data) => {
//   return dispatch => {
//     if (isAppPresent()) {
//       data = data !== undefined ? JSON.stringify(data) : JSON.stringify({ message: message });
//       window.webkit.messageHandlers[message].postMessage(data);
//       LogRocket.track(message);
//       dispatch({ type: types.SEND_WEBKIT_MESSAGE, payload: message });
//     }
//   };
// };
