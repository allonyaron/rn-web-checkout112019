import React, { useState } from "react";

import data from "../../data/appState.json";
import { isTaggedTemplateExpression } from "@babel/types";

//clean this up

// console.log(`tipAmount1 - ${tipAmount}`);

// console.log(`payment_type 1 - ${paymentType}`);
//is this the best way to set this up??

const CheckoutContext = React.createContext();

export const CheckoutProvider = ({ children }) => {
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
    cartItems
  } = data;

  // Order SUmmary
  // item -              "subtotal":"19.00",
  // Discount
  // gratuity -          "tipAmount":"3.42",
  // TotalBeforeTax -    "totalBeforeTax":"22.42",
  // tax -               "tax":"1.26",
  // Order Total         "total":"23.68",

  //   const orderSummaryCurrency = {
  //     subtotal,
  //     tipAmount,
  //     totalBeforeTax,
  //     tax,
  //     total
  //   };

  const getItemQuatity = items => {
    let itemQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
    return itemQuantity;
  };

  const orderSummaryMiles = {
    subtotal: airlineSubtotalMiles,
    tipAmount: airlineTip,
    totalBeforeTax: airlineTotalBeforeTax,
    tax: airlineTax,
    total: airlineTotalMiles
  };

  console.log(`tipAmount 2 - ${tipAmount}`);

  console.log(`payment_type 2 - ${paymentType}`);
  const [isCurrency, setIsCurrency] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState(paymentType);

  const [subtotalAmount, setSubTotalAmount] = useState(subtotal);
  const [itemQuantity, setItemQuantity] = useState(getItemQuatity(cartItems));
  const [gratuityAmount, setGratuityAmount] = useState(tipAmount);

  if (paymentMethod === "CREDITCARD") {
    setSubTotalAmount();
    setGratuityAmount();
  } else {
    setSubTotalAmount();
    setGratuityAmount();
  }

  //   const [totalBeforeTaxAmount, setTotalBeforeTaxAmount] = useState(
  //     totalBeforeTax
  //   );

  //   const [totalAmount, setTotalAmount] = useState(total);

  //   let isCurrency = "true";
  //   setIsCurrency(false);
  //why does this cause - console.error: "Unhandled JS Exception: Invariant Violation: Too many re-renders. React limits the number of renders to prevent an infinite loop.

  //Can this be set here or needs to be passed down and set in orderSummary?????
  //   let orderSummary =  isCurrency ? orderSummaryCurrency : orderSummaryMiles;}
  //with a function??
  //   const orderSummary = () => {
  //       return isCurrency ? orderSummaryCurrency : orderSummaryMiles;}

  return (
    <CheckoutContext.Provider
      value={{
        orderSummaryMiles,
        isCurrency,
        setIsCurrency,
        paymentMethod,
        setPaymentMethod,
        subtotal,

        subtotalAmount,
        setSubTotalAmount,
        itemQuantity,
        setItemQuantity,
        gratuityAmount,
        setGratuityAmount,
        tax
        // totalBeforeTaxAmount,
        // setTotalBeforeTaxAmount,
        // totalAmount,
        // setTotalAmount
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutContext;
