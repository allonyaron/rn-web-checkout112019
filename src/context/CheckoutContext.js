import React, {useState, useReducer} from 'react';

// import data from '../data/appState.json';

//clean this up

// console.log(`tipAmount1 - ${tipAmount}`);

// console.log(`payment_type 1 - ${paymentType}`);
//is this the best way to set this up??

const CheckoutContext = React.createContext();

export const CheckoutProvider = ({children}) => {
  // let {
  //   subtotal,
  //   tipAmount,
  //   totalBeforeTax,
  //   tax,
  //   total,
  //   airlineSubtotalMiles,
  //   airlineTip,
  //   airlineTotalBeforeTax,
  //   airlineTax,
  //   airlineTotalMiles,
  //   paymentType,
  //   cartItems,
  //   cmsIp,
  // } = data;

  // Order SUmmary
  // item -              "subtotal":"19.00",
  // Discount
  // gratuity -          "tipAmount":"3.42",
  // TotalBeforeTax -    "totalBeforeTax":"22.42",
  // tax -               "tax":"1.26",
  // Order Total         "total":"23.68",

  // const getItemQuantity = items => {
  //   let itemQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
  //   return itemQuantity;
  // };

  // const initialState = {
  //   subtotal,
  //   tipAmount,
  //   totalBeforeTax,
  //   tax,
  //   total,
  //   airlineSubtotalMiles,
  //   airlineTip,
  //   airlineTotalBeforeTax,
  //   airlineTax,
  //   airlineTotalMiles,
  //   paymentType,
  //   cartItems,
  //   cmsIp,
  //   itemQuantity: getItemQuantity(cartItems),
  // };
    const initialState = {};

  let reducer = (state, action) => {
    switch (action.type) {
      case 'SET_INIT_APPSTATE':
      console.log(`SET_INIT_APPSTATE - action.payload - ${JSON.stringify(action.payload)}`);
        return {...state, ...action.payload}
      case 'SET_CURRENCY':
        console.log(`SET_CURRENCY`);
        return {...state, payment_type: action.payload};
      case 'SET_MILES':
        console.log(`SET_MILES`);
        return {...state, payment_type: action.payload};
      case 'SET_GRATUITY':
        return {...state, tipAmount: action.payload};
      case 'SET_GRATUITY_MILES':
        return {...state, airlineTip: action.payload};
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

const sendWebkitMessageToIOS = (message, data) => {
    // if (isAppPresent()) {
      data = data !== undefined ? JSON.stringify(data) : JSON.stringify({ message: message });
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
      }}>
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

