import React, { useContext } from "react";

import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity
} from "react-native";

import OrientationContext from "../context/OrientationContext";
import HeaderContainer from "../components/HeaderContainer";
import PaymentContainer from "../components/PaymentContainer";
// import TabContainer from "../components/TabContainer";
import {
  TabItemsContainer,
  CartItemsContainer
} from "../components/ItemsContainer";
import SideBar from "../components/SideBar";

import CheckoutContext from "../context/CheckoutContext";

// import { updateReactReduxStoreFromIOS } from "../actions";
// import data from "../data/appState.json";

// let isTabOpen = true;

const CheckoutScreen = props => {
  const { orientation } = useContext(OrientationContext);
  const { state } = useContext(CheckoutContext);
  // const { state, dispatch } = useContext(CheckoutContext);

  // dispatch({ type: "SET_INIT_APPSTATE", payload: data });

  const { isTabOpen } = state;
  //set default for isTabOpen
  // let isTabOpen = true;
  console.log(`TMB-isTabOpen - ${isTabOpen}`);
  if (orientation === "portrait") {
    return (
      <View
        style={styles.pageContainer}
        ref={cartScreen => (window.cartScreen = cartScreen)}
        {...props}
      >
        {/* remove default status bar on top of ipad screen */}
        <StatusBar hidden={true} />
        <View style={styles.headerContainer}>
          <HeaderContainer />
        </View>

        <View style={styles.bodyContainer}>
          {isTabOpen === true ? (
            <View style={styles.mainBodyContainer}>
              <PaymentContainer
                isTabOpen={isTabOpen}
                orientation={orientation}
              />
              <View style={styles.itemsContainer}>
                <TabItemsContainer />
              </View>
              <View style={styles.itemsContainer}>
                <CartItemsContainer />
              </View>
            </View>
          ) : (
            <View style={styles.mainBodyContainer}>
              <PaymentContainer orientation={orientation} />
              <View style={styles.itemsContainer}>
                <CartItemsContainer />
              </View>
            </View>
          )}
          <View style={styles.sideBarContainer}>
            <SideBar />
          </View>
        </View>
        <View style={styles.footerContainer}>
          <View style={styles.upsellContainer} />
          <View style={styles.payButtonContainer}>
            <TouchableOpacity
              onPress={
                () => {}
                // sendWebkitMessageToIOS('pay', { paymentType, vouchers })
              }
            >
              <Text style={styles.payNowText}>PAY NOW – ${state.total}</Text>
              {/* check on   PAY NOW – ${state.totalAmountCurrencyDisplay} */}
              {/* pay - {"paymentType":"MILES","vouchers":[]} */}
              {/* pay - {"paymentType":"CREDITCARD","vouchers":[]} */}
              {/* pay - {"paymentType":"JOINTAB","vouchers":[]} */}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  } else if (orientation === "landscape") {
    return (
      <View style={styles.pageContainer}>
        {/* remove default status bar on top of ipad screen */}
        <StatusBar hidden={true} />
        <HeaderContainer />
        <View style={styles.bodyContainer}>
          <View style={styles.mainBodyContainerLandscape}>
            <View style={styles.paymentCartContainerLandscape}>
              <View style={styles.paymentContainerLandscape}>
                <PaymentContainer orientation={orientation} />
              </View>
              <View style={styles.itemsContainerLandscape}>
                <CartItemsContainer />
              </View>
            </View>
            <View style={styles.footerContainerLandscape}>
              <View style={styles.upsellContainer} />
              <View style={styles.payButtonContainer} />
            </View>
          </View>
          <View style={styles.sideBarContainerLandscape}>
            <SideBar />
          </View>
        </View>
      </View>
    );
  }
  return <Text>THIS IS THE ORIENTATION{orientation}</Text>;
};

const white = "#ffffff";
const blue = "#157efb";

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1
    // backgroundColor: "#f6f6f6"
  },
  headerContainer: {
    // height: 109
    // borderWidth: 10,
    // borderColor: "black"
    flex: 11
  },
  bodyContainer: {
    flex: 63,
    flexDirection: "row"
    // borderWidth: 10,
    // borderColor: "black",
    // height: 652
  },
  footerContainer: {
    marginBottom: 13,
    flex: 24
    // borderWidth: 10,
    // borderColor: "black",
    // height: 250
  },
  headerStyle: {
    height: 61,
    borderBottomWidth: 1,
    borderColor: "#C7C7C7"
  },
  sideBarContainer: {
    flex: 32,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d1d1d1",
    borderRadius: 25,
    marginRight: 10
  },

  scanBoardingPassStyle: {
    height: 48,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  scanBoardingPassTextStyle: {
    color: "#007aff",
    fontSize: 25.65,
    fontWeight: "500",
    letterSpacing: 0.5,
    textAlign: "center"
  },

  scanBooardingCameraImage: {
    height: 24,
    marginLeft: 12,
    marginRight: 12,
    width: 32.5
  },

  payButtonContainer: {
    height: 89,
    backgroundColor: "#157efb",
    borderRadius: 44.5,
    justifyContent: "center",
    marginLeft: 13,
    marginRight: 13,
    marginTop: 10
  },
  payNowText: {
    fontSize: 60,
    fontWeight: "600",
    letterSpacing: 2.4,
    color: white,
    textAlign: "center"
    // paddingLeft: 20,
    // paddingRight: 20
  },

  mainBodyContainer: {
    flex: 68,
    marginLeft: 10,
    marginRight: 10
  },

  paymentContainer: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#d1d1d1",
    borderRadius: 25,
    display: "flex",
    flexDirection: "row",
    height: 266
  },
  paymentMethodContainer: {
    height: 50,
    backgroundColor: "peru",
    flex: 0.45
  },
  gratuityContainer: {
    height: 50,
    backgroundColor: "aqua",
    flex: 0.55
  },
  itemsContainer: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#d1d1d1",
    borderRadius: 25,
    // height: 380,
    marginTop: 7
  },

  upsellContainer: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderColor: "#d1d1d1",
    borderLeftWidth: 1,
    borderRadius: 25,
    borderRightWidth: 1,
    borderTopWidth: 1,
    height: 140,
    marginLeft: 11.5,
    marginRight: 14.5,
    marginTop: 11.5
  },

  //Landscape
  paymentContainerLandscape: {
    flex: 28
  },
  itemsContainerLandscape: {
    flex: 48,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#d1d1d1",
    borderRadius: 25
  },
  sideBarContainerLandscape: {
    flex: 24,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d1d1d1",
    borderRadius: 25,
    // marginRight: 10,
    margin: 5
  },
  mainBodyContainerLandscape: {
    flex: 76,
    flexDirection: "column",
    margin: 5
  },
  paymentCartContainerLandscape: {
    flex: 6,
    flexDirection: "row"
  },
  paymentMethodContainer: {},
  footerContainerLandscape: {
    flex: 4,
    marginBottom: 13
  }
});

export default CheckoutScreen;
