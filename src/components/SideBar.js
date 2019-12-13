import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

import OrderSummary from "./OrderSummaryContainer";

import CheckoutContext from "../context/CheckoutContext";

let buttonText = "PAY NOW";

const SidebarContainer = () => {
  const { state, sendWebkitMessageToIOS } = useContext(CheckoutContext);
  const { isTabOpen, payment_type } = state;

  const payButtonOnPress = () => {
    if (isTabOpen) {
      sendWebkitMessageToIOS("NOT_MY_TAB");
    } else {
      sendWebkitMessageToIOS("pay", {
        paymentType: payment_type,
        vouchers: []
      });
    }
  };

  return (
    <View>
      <View style={styles.payNowButtonContainer}>
        <TouchableOpacity onPress={payButtonOnPress}>
          <Text style={styles.payNowButtontext}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderBottomColor: "#C7C7C7",
          borderBottomWidth: 1,
          marginLeft: 13,
          marginRight: 13
        }}
      />
      <OrderSummary />
    </View>
  );
};

export default SidebarContainer;

const styles = StyleSheet.create({
  payNowButtonContainer: {
    alignItems: "center",
    backgroundColor: "#157efb",
    borderRadius: 44.5,
    display: "flex",
    height: 44,
    justifyContent: "center",
    margin: 13
  },
  payNowButtontext: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center"
  }
});
