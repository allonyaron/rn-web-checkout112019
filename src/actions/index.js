
export const updateReactReduxStoreFromIOS = (appState) => console.log(`IOS message test - updateReactReduxStoreFromIOS - ${JSON.stringify(appState)}`)
export const updateAllTotals = () => console.log(`IOS message test - updateAllTotals`)
export const handleTaxTotalMilesChange = () => console.log(`IOS message test - handleTaxTotalMilesChange`)
export const handlePassengerChange = () => console.log(`IOS message test - handlePassengerChange`)
export const updateUpsells = () => console.log(`IOS message test - updateUpsells`)
export const handlePromoCodeChange = () => console.log(`IOS message test - handlePromoCodeChange`)
export const toggleOrientationChange = () => console.log(`IOS message test - toggleOrientationChange`)
export const toggleItemsLoading = () => console.log(`IOS message test - toggleItemsLoading`)
export const handleSetPromoCode = () => console.log(`IOS message test - handleSetPromoCode`)
export const clearVouchers = () => console.log(`IOS message test - clearVouchers`)
export const logRocketInit = () => console.log(`IOS message test - logRocketInit`)
export const logRocketIdentifyUser = () => console.log(`IOS message test - logRocketIdentifyUser`)
export const toggleCalcTotalLoading = () => console.log(`IOS message test - toggleCalcTotalLoading`)
export const handleSetCCVoucherInfo = () => console.log(`IOS message test - handleSetCCVoucherInfo`)


// export const updateReactReduxStoreFromIOS = appState => {
//   return async dispatch => {
//     await dispatch(importAndAdaptAppState(appState));
//     dispatch(toggleLoaded(true));
//     dispatch(toggleCalcTotalLoading(false));
//   };
// };