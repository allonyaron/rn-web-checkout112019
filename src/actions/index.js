// export const updateReactReduxStoreFromIOS = (appState) => {
//     let payload = setAppInitialState(appState)
//  console.log(`IOS message test - updateReactReduxStoreFromIOS - ${JSON.stringify(payload)}`)
//     return dispatch => dispatch({type:'SET_INIT_APPSTATE',payload: payload})
// }

export const updateReactReduxStoreFromIOSDispatch = dispatch => {
  return data => {
    console.log(
      `IOS message test - updateReactReduxStoreFromIOSDispatch - appState -  ${JSON.stringify(
        data
      )}`
    );
    let payload = updateStateFromIOS(data);
    dispatch({ type: "SET_INIT_APPSTATE", payload: payload });
  };
};
export const udpateAllTotalsDispatch = dispatch => {
  return data => {
    console.log(
      `IOS message test - udpateAllTotalsDispatch - ${JSON.stringify(data)}`
    );
    let payload = updateAllTotals(data);
    dispatch({ type: "UPDATE_ALL_TOTALS", payload: payload });
  };
};
// export const updateAllTotals = totals => console.log(`IOS message test - updateAllTotals - ${JSON.stringify(totals)}`);
export const handleTaxTotalMilesChangeDispatch = dispatch => {
  return data => {
    // const payload = updateGratuityPayload(data);
    console.log(`1TMB - data = ${JSON.stringify(data)}`);
    dispatch({ type: "UPDATE_GRATUITY_TOTALS", payload: data });
  };
};

export const handlePassengerChange = () =>
  console.log(`IOS message test - handlePassengerChange`);
export const updateUpsells = () =>
  console.log(`IOS message test - updateUpsells`);

//PromoCode
export const handlePromoCodeChange = dispatch => {
  console.log(`IOS message test - handlePromoCodeChange`);
  return promoCode => {
    dispatch({ type: "UPDATE_PROMOCODE", payload: promoCode });
  };
};
export const updatePromoCode = (dispatch, promoCode) => {
  dispatch({ type: "UPDATE_PROMOCODE", payload: promoCode });
};

export const toggleOrientationChange = () =>
  console.log(`IOS message test - toggleOrientationChange`);
export const toggleItemsLoading = () =>
  console.log(`IOS message test - toggleItemsLoading`);
export const handleSetPromoCode = () =>
  console.log(`IOS message test - handleSetPromoCode`);
export const clearVouchers = () =>
  console.log(`IOS message test - clearVouchers`);
export const logRocketInit = () =>
  console.log(`IOS message test - logRocketInit`);
export const logRocketIdentifyUser = () =>
  console.log(`IOS message test - logRocketIdentifyUser`);
export const toggleCalcTotalLoading = () =>
  console.log(`IOS message test - toggleCalcTotalLoading`);
export const handleSetCCVoucherInfo = () =>
  console.log(`IOS message test - handleSetCCVoucherInfo`);

// export const setGratuity = () =>
//   dispatch({
//     type: payment_type === "MILES" ? "SET_GRATUITY_MILES" : "SET_GRATUITY",
//     payload: option.tipAmount
//   });

const getItemQuantity = items => {
  let itemQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
  return itemQuantity;
};

const updateStateFromIOS = ({
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
  payment_type,
  cartItems,
  cmsIP,
  totalException,
  airlineTotalExceptionMiles,
  promotions,
  isTabOpen,
  tabItems,
  passengerName
}) => ({
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
  payment_type,
  cartItems,
  cmsIP,
  totalException,
  airlineTotalExceptionMiles,
  promotions,
  tabItems,
  isTabOpen,
  passengerName,
  itemQuantity: getItemQuantity(cartItems),
  cartItemQuantity: getItemQuantity(cartItems),
  tabItemQuantity: getItemQuantity(tabItems)
});

const updateAllTotals = ({
  subtotal,
  airlineSubtotalMiles,
  tipAmount,
  totalBeforeTax,
  airlineTotalBeforeTax,
  tax,
  airlineTax,
  total,
  totalException,
  airlineTotalExceptionMiles,
  airlineTip,
  airlineTotalMiles
}) => ({
  subtotal,
  airlineSubtotalMiles,
  tipAmount,
  totalBeforeTax,
  airlineTotalBeforeTax,
  tax,
  airlineTax,
  total,
  totalException,
  airlineTotalExceptionMiles,
  airlineTip,
  airlineTotalMiles
});

const updateGratuityPayload = ({}) => ({});

// {
//   "totalException":"0.00",
//   "total":"213.33",
//   "joinTabEnabled":true,
//   "tax":"0.83",
//   "airlineTip":25000,
//   "airlineSubtotalMiles":1570,
//   "airlineTotalBeforeTax":26570,
//   "is_mileage_plus_enabled":true,
//   "airlineTax":110,
//   "isTabOpen":false,
//   "boardingPassEnabled":true,
//   "cartHasFees":false,
//   "tabCartTotal":"0.00",
//   "airlineCharge":0,
//   "shouldAllowPayment":true,
//   "tipPercentage":"16",
//   "taxAndFeeSeparate":false,
//   "promotions":[
//      {
//         "name":"chase",
//         "enabled":true,
//         "applied":false
//      },
//      {
//         "name":"jetblue",
//         "enabled":false,
//         "applied":false
//      },
//      {
//         "name":"papi",
//         "enabled":false,
//         "applied":false
//      },
//      {
//         "enabled":true,
//         "name":"united",
//         "applied":false,
//         "originalTotalMiles":26680
//      }
//   ],
//   "airlineTotalMiles":26680,
//   "tipAmount":"200.00",
//   "subtotal":"12.50",
//   "cartFeeList":[
//      {
//         "amount":"$0.83",
//         "amountMiles":110,
//         "name":"Tax",
//         "description":""
//      },
//      {
//         "amount":"$0.83",
//         "amountMiles":110,
//         "name":"Total",
//         "description":""
//      }
//   ],
//   "totalBeforeTax":"212.50",
//   "airlineTotalException":0,
//   "shouldAllowMilesPayment":true,
//   "ccVoucher":true,
//   "charge":"0.00"
// }

// export const updateReactReduxStoreFromIOS = appState => {
//   return async dispatch => {
//     await dispatch(importAndAdaptAppState(appState));
//     dispatch(toggleLoaded(true));
//     dispatch(toggleCalcTotalLoading(false));
//   };
// };
