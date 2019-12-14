// export const updateReactReduxStoreFromIOS = (appState) => {
//     let payload = setAppInitialState(appState)
//  console.log(`IOS message test - updateReactReduxStoreFromIOS - ${JSON.stringify(payload)}`)
//     return dispatch => dispatch({type:'SET_INIT_APPSTATE',payload: payload})
// }

export const updateReactReduxStoreFromIOSDispatch = dispatch => {
  return appState => {
    console.log(
      `IOS message test - updateReactReduxStoreFromIOSDispatch - appState -  ${JSON.stringify(
        appState
      )}`
    );
    let payload = updateStateFromIOS(appState);
    dispatch({ type: "SET_INIT_APPSTATE", payload: payload });
  };
};
export const udpateAllTotalsDispatch = dispatch => {
  return totals => {
    console.log(
      `IOS message test - udpateAllTotalsDispatch - ${JSON.stringify(totals)}`
    );
    let payload = updateAllTotals(totals);
    dispatch({ type: "UPDATE_ALL_TOTALS", payload: payload });
  };
};
// export const updateAllTotals = totals => console.log(`IOS message test - updateAllTotals - ${JSON.stringify(totals)}`);
export const handleTaxTotalMilesChange = () =>
  console.log(`IOS message test - handleTaxTotalMilesChange`);
export const handlePassengerChange = () =>
  console.log(`IOS message test - handlePassengerChange`);
export const updateUpsells = () =>
  console.log(`IOS message test - updateUpsells`);
export const handlePromoCodeChange = dispatch => {
  console.log(`IOS message test - handlePromoCodeChange`);
  return promoCode => {
    dispatch({ type: "UPDATE_PROMOCODE", payload: promoCode });
  };
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

// export const updateReactReduxStoreFromIOS = appState => {
//   return async dispatch => {
//     await dispatch(importAndAdaptAppState(appState));
//     dispatch(toggleLoaded(true));
//     dispatch(toggleCalcTotalLoading(false));
//   };
// };
