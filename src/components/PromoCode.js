import React, { useState, useContext } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert
} from "react-native";

// import VoucherContext from '../context/VoucherContext';
import CheckoutContext from "../context/CheckoutContext";

let enterPromoCode = "Enter Promo Code";

// let promoScannerEnabled = false;

const validatePromoCode = promoCode => {
  if (promoCode && promoCode.length === 8) {
    return true;
  }
  return false;
};

const PromoCode = () => {
  const [promoCode, setPromoCode] = useState();
  // const [promoEnabled, setPromoEnabled] = useState(true);
  // const { addPromo } = useContext(VoucherContext);

  const { sendWebkitMessageToIOS, state } = useContext(CheckoutContext);
  let { promoScannerEnabled } = state;
  promoScannerEnabled = true;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{enterPromoCode}</Text>
      <View style={styles.inputContainer}>
        <View style={styles.input}>
          <TextInput
            autoCorrect={false}
            type="text"
            maxLength={8}
            onChangeText={text => {
              setPromoCode(text);
            }}
            style={styles.inputField}
            value={promoCode}
            // editable={promoEnabled}
          />
        </View>
        {promoScannerEnabled && (
          <View style={[styles.cameraContainer]}>
            <TouchableOpacity onPress={() => {}}>
              <Image
                style={[styles.cameraImage]}
                source={require("../assets/images/icon-camera-heading.png")}
              />
            </TouchableOpacity>
          </View>
        )}
        <View style={[styles.button]}>
          <TouchableOpacity
            onPress={() => {
              if (validatePromoCode(promoCode)) {
                sendWebkitMessageToIOS("handlePromoCodeSubmit", {
                  promoCode: promoCode
                });
              }
              setPromoCode("");
              //add else clause for alert of non valid promo

              // if (true) {
              // 	setPromoCode('1 Promo Applied');
              // 	setPromoEnabled(false);
              // } else {
              // 	setPromoCode('');
              // }
            }}
          >
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PromoCode;

const darkGrey = "#737373";
const lightGrey = "#f0f0f1";
const blue = "#157efb";
const white = "#ffffff";

const styles = StyleSheet.create({
  container: {
    // marginBottom: 10
  },
  header: {
    color: darkGrey,
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8
    // width: 233,
    // marginTop: 10
  },
  inputContainer: {
    // display: "flex",
    flexDirection: "row",
    marginTop: 5,
    height: 36
    // backgroundColor:'yellow'
  },
  input: {
    backgroundColor: lightGrey,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    height: 36,
    flex: 1
  },
  inputField: {
    padding: 10
  },
  button: {
    alignItems: "center",
    backgroundColor: blue,
    height: 36,
    justifyContent: "center",
    marginRight: 10,
    width: 36,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8
  },
  buttonText: {
    color: white,
    fontSize: 18,
    fontWeight: "500"
  },
  cameraContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: lightGrey
  },
  cameraImage: {
    display: "flex",
    height: 24,
    marginRight: 5,
    width: 32
  }
});
