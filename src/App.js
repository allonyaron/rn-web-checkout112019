import React, { useContext } from "react";
// import { View, Text } from "react-native";

// Look at public/index.html!

import {
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

// import { PromoProvider } from "../context/PromoCodeContext";
import { PromoProvider, usePromoDispatch } from "./context/PromoCodeContext";
import {
  PaymentProvider,
  usePaymentDispatch
} from "./context/PaymentMethodContext";

import CheckoutScreen from "./screens/CheckoutScreen";

// import testAppState from './data/appState.json'

// import OrientationContext from './src/context/OrientationContext';
// const {CheckoutProvider} = CheckoutContext

const App = () => {
  // const {orientation} = useContext(OrientationContext);

  const { dispatch } = useContext(CheckoutContext);
  const { promoDispatch } = usePromoDispatch();
  const { paymentDispatch } = usePaymentDispatch();

  window.cartScreen = {};

  return (
    <CheckoutScreen
      updateReactReduxStoreFromIOS={updateReactReduxStoreFromIOSDispatch(
        dispatch
      )}
      updateAllTotals={udpateAllTotalsDispatch(dispatch)}
      handleTaxTotalMilesChange={handleTaxTotalMilesChange}
      handlePassengerChange={handlePassengerChange}
      updateUpsells={updateUpsells}
      handlePromoCodeChange={promoDispatch}
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
          <PromoProvider>
            <PaymentProvider>
              <App />
            </PaymentProvider>
          </PromoProvider>
        </OrientationProvider>
      </VoucherProvider>
    </CheckoutProvider>
  );
};
