import React, { useContext } from "react";
import { View, Text } from "react-native";

// Look at public/index.html!

import {
  // updateReactReduxStoreFromIOS,
  updateReactReduxStoreFromIOSDispatch,
  udpateAllTotalsDispatch,
  handleTaxTotalMilesChange,
  handlePassengerChange,
  updateUpsells,
  handlePromoCodeChange,
  toggleOrientationChange,
  toggleItemsLoading,
  handleSetPromoCode,
  clearVouchers,
  logRocketInit,
  logRocketIdentifyUser,
  toggleCalcTotalLoading,
  handleSetCCVoucherInfo
} from "./actions";

import { CheckoutProvider } from "./context/CheckoutContext";
import CheckoutContext from "./context/CheckoutContext";
import { VoucherProvider } from "./context/VoucherContext";
import { OrientationProvider } from "./context/OrientationContext";

import CheckoutScreen from "./screens/CheckoutScreen";

// import OrientationContext from './src/context/OrientationContext';
// const {CheckoutProvider} = CheckoutContext

const App = () => {
  // const {orientation} = useContext(OrientationContext);

  console.log(`TMB - CheckoutScreen`);
  const { dispatch } = useContext(CheckoutContext);

  window.cartScreen = {};
  window.cartScreen.props = {
    updateReactReduxStoreFromIOSDispatch,
    udpateAllTotalsDispatch,
    handleTaxTotalMilesChange,
    handlePassengerChange,
    updateUpsells,
    handlePromoCodeChange,
    toggleOrientationChange,
    toggleItemsLoading,
    handleSetPromoCode,
    clearVouchers,
    logRocketInit,
    logRocketIdentifyUser,
    toggleCalcTotalLoading,
    handleSetCCVoucherInfo
  };

  return (
    <CheckoutScreen
      updateReactReduxStoreFromIOS={updateReactReduxStoreFromIOSDispatch(
        dispatch
      )}
      updateAllTotals={udpateAllTotalsDispatch(dispatch)}
      handleTaxTotalMilesChange={handleTaxTotalMilesChange}
      handlePassengerChange={handlePassengerChange}
      updateUpsells={updateUpsells}
      handlePromoCodeChange={handlePromoCodeChange}
      toggleOrientationChange={toggleOrientationChange}
      toggleItemsLoading={toggleItemsLoading}
      handleSetPromoCode={handleSetPromoCode}
      clearVouchers={clearVouchers}
      logRocketInit={logRocketInit}
      logRocketIdentifyUser={logRocketIdentifyUser}
      toggleCalcTotalLoading={toggleCalcTotalLoading}
      handleSetCCVoucherInfo={handleSetCCVoucherInfo}
    />
  );
};

// class App extends React.Component {
//   render() {return <CheckoutScreen />;}

export default () => {
  return (
    <CheckoutProvider>
      <VoucherProvider>
        <OrientationProvider>
          <App />
        </OrientationProvider>
      </VoucherProvider>
    </CheckoutProvider>
  );
};
