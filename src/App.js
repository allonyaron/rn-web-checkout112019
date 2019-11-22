import React from "react";
import { View, Text } from "react-native";

// Look at public/index.html!

import {
updateReactReduxStoreFromIOS, 
updateAllTotals,
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
handleSetCCVoucherInfo,
} from './actions'



import {CheckoutProvider} from './context/CheckoutContext';
import {VoucherProvider} from './context/VoucherContext';
import {OrientationProvider} from './context/OrientationContext';

import CheckoutScreen from './screens/CheckoutScreen';

// import OrientationContext from './src/context/OrientationContext';


const App = () => {
  // const {orientation} = useContext(OrientationContext);
  return <CheckoutScreen 
    updateReactReduxStoreFromIOS = {updateReactReduxStoreFromIOS }
    updateAllTotals  = {updateAllTotals} 
    handleTaxTotalMilesChange = {handleTaxTotalMilesChange }
    handlePassengerChange = {handlePassengerChange }
    updateUpsells = {updateUpsells }
    handlePromoCodeChange = {handlePromoCodeChange }
    toggleOrientationChange = {toggleOrientationChange }
    toggleItemsLoading = {toggleItemsLoading }
    handleSetPromoCode = {handleSetPromoCode }
    clearVouchers = {clearVouchers }
    logRocketInit = {logRocketInit }
    logRocketIdentifyUser = {logRocketIdentifyUser }
    toggleCalcTotalLoading = {toggleCalcTotalLoading }
    handleSetCCVoucherInfo = {handleSetCCVoucherInfo }
  />;
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


