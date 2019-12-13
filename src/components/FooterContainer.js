import React, { useContext } from "react";

import { Text, TouchableOpacity, StyleSheet } from "react-native";

import CheckoutContext from "../context/CheckoutContext";

const FooterContainer = () => {
  const { state, sendWebkitMessageToIOS } = useContext(CheckoutContext);
  const { isTabOpen, payment_type, total } = state;

  //set default for isTabOpen
  console.log(`TMB-isTabOpen - ${JSON.stringify(isTabOpen)}`);
  let buttonText = isTabOpen
    ? "CLOSE TAB"
    : payment_type === "MILES"
    ? `PAY NOW - ${total ? total : 0} MILES)`
    : `PAY NOW - $${total ? total : 0}`;
  const payButtonOnPress = () => {
    if (isTabOpen) {
      sendWebkitMessageToIOS("closeTab", { paymentType: payment_type });
    } else {
      sendWebkitMessageToIOS("pay", {
        paymentType: payment_type,
        vouchers: []
      });
    }
  };

  return (
    <TouchableOpacity
      onPress={payButtonOnPress}

      // () =>
      // sendWebkitMessageToIOS("pay", {
      //   paymentType: payment_type,
      //   vouchers: []
      // })
      //  sendWebkitMessageToIOS('closeTab', { paymentType })

      //  small button - sendWebkitMessageToIOS('NOT_MY_TAB')

      // {/* check on   PAY NOW – ${state.totalAmountCurrencyDisplay} */}
      // {/* pay - {"paymentType":"MILES","vouchers":[]} */}
      // {/* pay - {"paymentType":"CREDITCARD","vouchers":[]} */}
      // {/* pay - {"paymentType":"JOINTAB","vouchers":[]} */}
      // closeTab - {"paymentType":"CREDITCARD"}

      // sidebar button for not my tab- sendWebkitMessageToIOS - (message, data) - NOT_MY_TAB - undefined
    >
      <Text style={styles.payNowText}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default FooterContainer;

const white = "#ffffff";
const styles = StyleSheet.create({
  payNowText: {
    fontSize: 60,
    fontWeight: "600",
    letterSpacing: 2.4,
    color: white,
    textAlign: "center"
    // paddingLeft: 20,
    // paddingRight: 20
  },
  paymentMethodContainer: {},
  footerContainerLandscape: {
    flex: 4,
    marginBottom: 13
  }
});
