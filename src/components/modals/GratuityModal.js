import React, { useState } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  // Modal,
  StyleSheet
} from "react-native";

import Modal from "modal-react-native-web";

// import Slider from "@react-native-community/slider";

// import Slider from "react-native-slider";

import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";

const GratuityModal = ({
  modalVisible,
  setModalVisible,
  tipPercent,
  sendWebkitMessageToIOS,
  setTipPercent,
  setActiveButton,
  // setGratuityAmount,
  subtotal
}) => {
  // const [sliderValue, setSliderValue] = useState(+tipPercent * 100);
  // if (sliderValue !== tipPercent) {
  //   // setSliderValue(+tipPercent * 100);
  // }
  let sliderValue = tipPercent * 100;
  console.log(`tipPercent - ${tipPercent}`);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        // Alert.alert("Modal has been closed.");
      }}
    >
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.headingTextContainer}>
            <Text style={styles.headingText}>Please Enter</Text>
            <Text style={styles.headingText}>The Tip Amount</Text>
          </View>
          <View style={styles.slider}>
            <Slider
              minimumValue={0}
              maximumValue={100}
              // step={1}
              // minimumTrackTintColor="sliderBlue"
              // maximumTrackTintColor="#000000"
              value={sliderValue}
              // onValueChange={value => setSliderValue(value)}
              onChange={value => setTipPercent(value)}
            />
            <Text style={styles.percentage}>{sliderValue}%</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              style={styles.button}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={[styles.button]}
              onPress={() => {
                // sendWebkitMessageToIOS(sliderValue);
                sendWebkitMessageToIOS("handleTipPercentageChange", {
                  tipPercentage: tipPercent / 100,
                  tipAmount: null
                });
                setActiveButton("other");
                // setGratuityAmount(((subtotal * sliderValue) / 100).toFixed(2));
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={[styles.buttonText, styles.buttonBold]}>
                Apply Tip
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default GratuityModal;

const lightGrey = "#d1d1d1";
const iosGrey = "#f7f7f7";
const sliderBlue = "#157efb";
const blue = "#007aff";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  contentContainer: {
    // flex: 1,
    alignItems: "center",
    backgroundColor: iosGrey,
    borderWidth: 1,
    borderColor: lightGrey,
    borderRadius: 13,
    justifyContent: "center",
    width: 322
  },
  buttonContainer: {
    alignItems: "center",
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    // width: 100,
    borderTopWidth: 1,

    borderColor: lightGrey
  },
  headingText: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center"
  },
  headingTextContainer: {
    marginBottom: 10,
    paddingTop: 22
  },
  slider: {
    // height: 70,
    width: 280,
    // marginBottom: 20
    height: 70,
    // width: 285.5,
    marginBottom: 20
  },
  percentage: {
    fontSize: 20,
    fontWeight: "600",
    paddingBottom: 20,
    textAlign: "center"
  },
  button: {
    flex: 1,
    height: 44,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: blue,
    fontSize: 20
  },
  buttonBold: {
    fontWeight: "600"
  }
});
