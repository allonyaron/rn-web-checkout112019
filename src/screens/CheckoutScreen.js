import React, { useContext } from "react";

import { Text, View, StyleSheet, StatusBar } from "react-native";

import OrientationContext from "../context/OrientationContext";

import HeaderContainer from "../components/HeaderContainer";
import PaymentContainer from "../components/PaymentContainer";
import CartContainer from "../components/CartContainer";
import SideBar from "../components/SideBar";

const CheckoutScreen = (props) => {
  const { orientation } = useContext(OrientationContext);
  
  console.log(`TMB - CheckoutScreen`);
  if (orientation === "portrait") {
    return (
      <View style={styles.pageContainer}
      ref={cartScreen => (window.cartScreen = cartScreen)} 
      {...props}

      >
        {/* remove default status bar on top of ipad screen */}
        <StatusBar hidden={true} />
        <HeaderContainer />
        <View style={styles.bodyContainer}>
          <View style={styles.mainBodyContainer}>
            <PaymentContainer orientation={orientation} />
            <View style={styles.cartContainer}>
              <CartContainer />
            </View>
          </View>
          <View style={styles.sideBarContainer}>
            <SideBar />
          </View>
        </View>
        <View style={styles.footerContainer}>
          <View style={styles.upsellContainer} />
          <View style={styles.payButtonContainer} />
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
              <View style={styles.cartContainerLandscape}>
                <CartContainer />
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

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "#f6f6f6"
  },
  headerContainer: {
    height: 109
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

  bodyContainer: {
    flex: 1,
    flexDirection: "row"
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
  cartContainer: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#d1d1d1",
    borderRadius: 25,
    height: 380,
    marginTop: 7.5
  },
  footerContainer: {
    marginBottom: 13
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
  cartContainerLandscape: {
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
    marginRight: 10
  },
  mainBodyContainerLandscape: {
    flex: 76,
    flexDirection: "column"
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
