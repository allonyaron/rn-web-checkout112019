import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import GratuityModal from "./modals/GratuityModal";
import { generate } from "shortid";

import CheckoutContext from "../context/CheckoutContext";

import { usePaymentState } from "../context/PaymentMethodContext";

import { useGratuityState } from "../context/GratuityContext";

let otherTipPercentageLabel = "OTHER";

let tipAmountArr = [16, 18, 20];
let gratuityTotals = (payment_type, airlineSubtotalMiles, subtotal) =>
  tipAmountArr.map(amount => {
    let gratuityTotalAmount =
      payment_type === "MILES"
        ? (
            Math.ceil((airlineSubtotalMiles * (amount / 100)) / 10) * 10
          ).toFixed(0)
        : `${(subtotal * (amount / 100)).toFixed(2)}`;
    console.log(`gratuityTotalAmount - ${gratuityTotalAmount}`);
    return {
      amount,
      tipPercentageLabel: `${amount}%`,
      tipAmount: gratuityTotalAmount
    };
  });

const Gratuity = () => {
  const [activeButton, setActiveButton] = useState(18);
  const { state, sendWebkitMessageToIOS } = useContext(CheckoutContext);
  const {
    subtotal,
    airlineSubtotalMiles,
    airlineTip,
    tipPercentage,
    tipAmount
  } = state;

  // should I feed in tippercentage to the dispatch in here??

  const [modalVisible, setModalVisible] = useState(false);
  const [tipPercent, setTipPercent] = useState(18);

  const { paymentState } = usePaymentState();
  const { payment_type } = paymentState;

  const gratuityOptions = gratuityTotals(
    payment_type,
    airlineSubtotalMiles,
    subtotal
  );

  return (
    <View>
      <View style={styles.container}>
        {gratuityOptions.map(option => (
          <TouchableOpacity
            style={[
              styles.buttonContainer,
              activeButton === option.amount ? styles.active : styles.notActive
            ]}
            onPress={() => {
              setActiveButton(option.amount);
              sendWebkitMessageToIOS("handleTipPercentageChange", {
                tipPercentage: option.amount / 100,
                tipAmount: null
              });
            }}
            key={generate()}
          >
            <Text
              style={[
                styles.gratuityText,
                activeButton === option.amount
                  ? styles.active
                  : styles.notActive
              ]}
            >
              {option.amount}%
            </Text>
            {option.tipAmount && (
              <Text
                style={[
                  styles.amountText,
                  activeButton === option.amount
                    ? styles.active
                    : styles.notActive
                ]}
              >
                {payment_type !== "MILES" ? "$" : null}
                {option.tipAmount}
              </Text>
            )}
          </TouchableOpacity>
        ))}
        <View
          styles={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TouchableOpacity
            style={[
              styles.buttonContainerNoBorder,
              activeButton === "other" ? styles.active : styles.notActive
            ]}
            onPress={() => {
              setModalVisible(true);
              // setInitData(appState);
            }}
            key={generate()}
          >
            <Text
              style={[
                styles.gratuityText,
                {
                  fontSize: 14
                },
                activeButton === "other" ? styles.active : styles.notActive
              ]}
            >
              {otherTipPercentageLabel}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <GratuityModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          tipPercent={tipPercent}
          setTipPercent={setTipPercent}
          sendWebkitMessageToIOS={sendWebkitMessageToIOS}
          setActiveButton={setActiveButton}
          setGratuityAmount={() => {}}
          subtotal={subtotal}
        />
      </View>
    </View>
  );
};

export default Gratuity;

const darkGrey = "#737373";
const blue = "#157efb";
const lightGrey = "#d1d1d1";
const grey = "#737373";
const white = "#ffffff";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: blue,
    borderRadius: 4,
    flexDirection: "row",
    height: 43,
    marginTop: 8
  },

  buttonContainer: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    width: 59,
    flex: 1,
    borderRightWidth: 1,
    borderColor: blue
  },
  buttonContainerNoBorder: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    width: 59,
    flex: 1
  },
  border: {
    borderColor: blue,
    borderRightWidth: 1
  },
  amountText: {
    fontSize: 13,
    textAlign: "center"
  },
  gratuityText: {
    fontSize: 20,
    textAlign: "center"
  },
  active: {
    color: white,
    backgroundColor: blue
  },
  notActive: {
    color: grey,
    backgroundColor: white
  }
});
