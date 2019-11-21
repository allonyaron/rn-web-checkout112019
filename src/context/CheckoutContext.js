import React, {useState, useReducer} from 'react';

import data from '../data/appState.json';

//clean this up

// console.log(`tipAmount1 - ${tipAmount}`);

// console.log(`payment_type 1 - ${paymentType}`);
//is this the best way to set this up??

const CheckoutContext = React.createContext();

export const CheckoutProvider = ({children}) => {
  let {
    subtotal,
    tipAmount,
    totalBeforeTax,
    tax,
    total,
    airlineSubtotalMiles,
    airlineTip,
    airlineTotalBeforeTax,
    airlineTax,
    airlineTotalMiles,
    paymentType,
    cartItems,
    cmsIp,
  } = data;

  // Order SUmmary
  // item -              "subtotal":"19.00",
  // Discount
  // gratuity -          "tipAmount":"3.42",
  // TotalBeforeTax -    "totalBeforeTax":"22.42",
  // tax -               "tax":"1.26",
  // Order Total         "total":"23.68",

  const getItemQuantity = items => {
    let itemQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
    return itemQuantity;
  };

  const initialState = {
    subtotal,
    tipAmount,
    totalBeforeTax,
    tax,
    total,
    airlineSubtotalMiles,
    airlineTip,
    airlineTotalBeforeTax,
    airlineTax,
    airlineTotalMiles,
    paymentType,
    cartItems,
    cmsIp,
    itemQuantity: getItemQuantity(cartItems),
  };

  let reducer = (state, action) => {
    switch (action.type) {
      case 'SET_CURRENCY':
        console.log(`SET_CURRENCY`);
        return {...state, paymentType: action.payload};
      case 'SET_MILES':
        console.log(`SET_MILES`);
        return {...state, paymentType: action.payload};
      case 'SET_GRATUITY':
        return {...state, tipAmount: action.payload};
      case 'SET_GRATUITY_MILES':
        return {...state, airlineTip: action.payload};
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CheckoutContext.Provider
      value={{
        state,
        dispatch,
      }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutContext;
