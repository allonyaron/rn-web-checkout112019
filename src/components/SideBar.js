import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

import OrderSummary from "./OrderSummaryContainer";

let payNow = "PAY NOW";

const SidebarContainer = () => {
  return (
    <View>
      <View style={styles.payNowButtonContainer}>
        <TouchableOpacity onPress={() => console.log("paynow sidebar")}>
          <Text style={styles.payNowButtontext}>{payNow}</Text>
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
    // width: 180
  }
});
