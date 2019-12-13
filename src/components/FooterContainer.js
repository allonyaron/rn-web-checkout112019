import React, { useContext } from "react";

import { Text, TouchableOpacity, StyleSheet } from "react-native";

import CheckoutContext from "../context/CheckoutContext";

const FooterContainer = () => {
  const { state, sendWebkitMessageToIOS } = useContext(CheckoutContext);
  const {
    isTabOpen,
    payment_type,
    total,
    airlineTotalMiles,
    cartItemQuantity
  } = state;

  //set default for isTabOpen
  console.log(`TMB-isTabOpen - ${JSON.stringify(isTabOpen)}`);
  let buttonText = isTabOpen
    ? cartItemQuantity
      ? "CLOSE TAB"
      : payment_type === "MILES"
      ? `ADD TO TAB + ${airlineTotalMiles ? airlineTotalMiles : 0} MILES`
      : `ADD TO TAB + $${total ? total : 0}`
    : payment_type === "MILES"
    ? `PAY NOW - ${airlineTotalMiles ? airlineTotalMiles : 0} MILES`
    : `PAY NOW - $${total ? total : 0}`;

  // export const isCartEmpty = (total, cartQuantity) =>
  // total === 0 && cartQuantity === 0;

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
  },
  paymentMethodContainer: {},
  footerContainerLandscape: {
    flex: 4,
    marginBottom: 13
  }
});
