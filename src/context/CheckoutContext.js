import React, { useReducer } from "react";

const CheckoutContext = React.createContext();

export const CheckoutProvider = ({ children }) => {
  const initialState = {};

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
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const sendWebkitMessageToIOS = (message, data) => {
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
