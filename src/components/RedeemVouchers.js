import React, { useState } from "react";
import {
  //Image,
  StyleSheet,
  Text,
  //TextInput,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Modal
} from "react-native";

import VoucherModal from "./VoucherModal";

let redeemVouchersText = "Redeem Vouchers";

const RedeemVouchers = ({ orientation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <VoucherModal
        orientation={orientation}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />

      <Text style={styles.header}>{redeemVouchersText}</Text>
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <View style={styles.input}>
          <Text style={styles.inputText}>
            {/* {areThereAppliedVouchers(voucherCodes)
            ? `${voucherCodes.length} Voucher${
              isVoucherPlural(voucherCodes) ? 's' : ''
            } Applied`
            : null} */}
          </Text>
        </View>
        <View style={styles.button}>
          <Text style={styles.buttonText}>OK</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default RedeemVouchers;

const darkGrey = "#737373";
const lightGrey = "#f0f0f1";
const blue = "#157efb";
const white = "#ffffff";
const green = "rgb(76, 217, 100)";

const styles = StyleSheet.create({
  container: {
    // marginBottom: 10
    // marginBottom: 0
  },
  header: {
    color: darkGrey,
    fontSize: 18,
    fontWeight: "600",
    // marginLeft: 8.5,
    // width: 233,
    // marginTop: 10,
    marginLeft: 8
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
    // marginBottom: 13.5,
    // marginLeft: 14,
    // width: 197,
    // paddingRight: 45.5,
    flex: 1
  },
  inputField: {
    padding: 10
  },
  button: {
    alignItems: "center",
    backgroundColor: blue,
    //flex: 1,
    //flexDirection: "row",
    height: 36,
    justifyContent: "center",
    // marginLeft: -30,
    // marginRight: 10,
    width: 36,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8
  },
  buttonText: {
    color: white,
    fontSize: 18,
    fontWeight: "500"
  }

  //   container: {
  //     marginTop: 10
  //   },

  //   header: {
  //     color: darkerGrey,
  //     fontSize: 18,
  //     fontWeight: "600"
  //     // marginLeft: 22.5,
  //     //width: 200
  //   },
  //   inputContainer: {
  //     alignItems: "center",
  //     flex: 1,
  //     flexDirection: "row",
  //     marginTop: 5
  //     // marginBottom: 13.5
  //   },
  //   input: {
  //     // display: "flex",
  //     justifyContent: "center",
  //     alignItems: "center",
  //     backgroundColor: grey,
  //     borderRadius: 8,
  //     marginLeft: 14,
  //     // width: 177,
  //     height: 36
  //   },
  //   //   inputContainerPortrait: {
  //   //
  //   //   },
  //   //   inputContainerLandscape: {
  //   //     width: 243
  //   //   },

  //   //   inputLandscape: {
  //   //     marginLeft: 14,
  //   //     width: 197,
  //   //     height: 36
  //   //   },
  //   inputText: {
  //     color: green,
  //     fontWeight: "900"
  //   },
  //   button: {
  //     alignItems: "center",
  //     backgroundColor: blue,
  //     // display: "flex",
  //     flexDirection: "row",
  //     height: 36,
  //     justifyContent: "center",
  //     marginLeft: -5,
  //     width: 36
  //   },
  //   buttonText: {
  //     color: white,
  //     fontSize: 18,
  //     fontWeight: "500"
  //   }
});
