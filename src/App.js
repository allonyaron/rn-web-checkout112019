import React from "react";
import { View, Text } from "react-native";

// Look at public/index.html!



import {CheckoutProvider} from './context/CheckoutContext';
import {VoucherProvider} from './context/VoucherContext';
import {OrientationProvider} from './context/OrientationContext';

import CheckoutScreen from './screens/CheckoutScreen';

// import OrientationContext from './src/context/OrientationContext';


const App = () => {
  // const {orientation} = useContext(OrientationContext);
  return <CheckoutScreen />;
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


