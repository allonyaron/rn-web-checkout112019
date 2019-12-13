import React, { Fragment } from "react";
import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";

import PaymentMethod from "./PaymentMethod";
import PromoCode from "./PromoCode";
import Gratuity from "./Gratuity";
import RedeemVouchers from "./RedeemVouchers";

let gratuityTitle = "GRATUITY";
let paymentMethod = "PAYMENT METHOD";

const PaymentContainer = ({ orientation, isTabOpen }) => {
  if (orientation === "portrait") {
    return (
      <View style={[styles.paymentContainer, styles.paymentContainerPortrait]}>
        {isTabOpen ? (
          <View style={styles.paymentRightContainer}>
            <View style={styles.headerBorder}>
              <Text style={styles.headerTitle}>{gratuityTitle}</Text>
            </View>
            <View style={styles.mainContainer}>
              <Gratuity />
            </View>
          </View>
        ) : (
          <Fragment>
            <View style={styles.paymentLeftContainer}>
              <View style={styles.headerBorder}>
                <Text style={styles.headerTitle}>{paymentMethod}</Text>
              </View>
              <View style={styles.mainContainer}>
                <PaymentMethod />
                <PromoCode />
              </View>
            </View>
            <View style={styles.paymentRightContainer}>
              <View style={styles.headerBorder}>
                <Text style={styles.headerTitle}>{gratuityTitle}</Text>
              </View>
              <View style={styles.mainContainer}>
                <Gratuity />
                <RedeemVouchers orientation={orientation} />
              </View>
            </View>
          </Fragment>
        )}
      </View>
    );
  } else if (orientation === "landscape") {
    return (
      <View style={styles.paymentContainer}>
        <View style={styles.headerBorder}>
          <Text style={styles.headerTitle}>{paymentMethod}</Text>
        </View>
        <PaymentMethod />
        <PromoCode />
        <RedeemVouchers orientation={orientation} />
        <View style={styles.headerBorder}>
          <Text style={styles.headerTitle}>{gratuityTitle}</Text>
        </View>
        <Gratuity />
      </View>
    );
  }
};

export default PaymentContainer;

const styles = StyleSheet.create({
  paymentContainer: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#d1d1d1",
    borderRadius: 25,
    flex: 1,
    padding: 13
  },
  paymentContainerPortrait: {
    flexDirection: "row"
  },
  paymentLeftContainer: {
    // height: 50,
    //backgroundColor: 'peru',
    flex: 1
    // flexDirection: "column",
    // justifyContent: "space-between"
    // display: "flex",
    // justifyContent: "space-between"
  },
  paymentRightContainer: {
    // height: 50,
    //backgroundColor: 'aqua',
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  headerTitle: {
    color: "#737373",
    fontSize: 20,
    height: 30,
    letterSpacing: 0.8,
    textAlign: "left"
  },
  headerBorder: {
    borderBottomWidth: 1,
    borderColor: "#C7C7C7"
  },
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between"
  }
  // promoContainer: {
  //   marginBottom: 100
  // }
});
