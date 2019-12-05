import React, { useState, useReducer, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  // Modal,
  TextInput,
  KeyboardAvoidingView,
  Image
} from "react-native";
import Modal from "modal-react-native-web";

import VoucherContext from "../../context/VoucherContext";
import OrientationContext from "../../context/OrientationContext";

import leftArrow from "../../assets/images/ui-directional-arrow-left.png";
import rightArrow from "../../assets/images/ui-directional-arrow-right.png";
import circleCheck from "../../assets/images/ui-check-circle-closed-330-x-330-i-copy.png";

let voucherHeadingText = "Credit Card Voucher";
let voucherAppliedHeadingText = "Redeem Voucher";
let instructionsText =
  "Please enter your voucher information below and tap Submit to continue.";
let translations = {
  yourVoucherHasBeenAppliedText: "Your Voucher has been Applied"
};
let initialVoucherState = {
  number: "",
  amount: "",
  expireDate: "",
  cvv: "",
  numberError: "",
  amountError: "",
  expireDateError: "",
  cvvError: ""
};

const formatVoucherNumber = voucherNum => {
  let formattedCardNumber = voucherNum.replace(/[^\d]/g, "");
  let cardNumberSections = formattedCardNumber.match(/\d{1,4}/g);
  if (cardNumberSections !== null) {
    formattedCardNumber = cardNumberSections.join("-");
  }
  return formattedCardNumber;
};

const formatExpDate = date => {
  date = date.replace(/[^\d]/g, "");
  if (date.length > 2) {
    date = date.substring(0, 2) + "/" + date.substring(2);
  }
  return date;
};

// const formatCurrency = num => {
//   currencyNum = Number(num)
//     .toFixed(2)
//     .toString()
//     .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//   return currencyNum;
// };

const removeDollarSign = number => number.replace(/[^\d.$]/g, "");

const VoucherTextInput = ({ onChange, value, maxLength }) => (
  <TextInput
    style={styles.inputField}
    onChangeText={onChange}
    value={value}
    placeholder="1234-5678-9123-4567"
    maxLength={maxLength}
    keyboardType="number-pad"
  />
);

//655433
//344566

//BUG
// WARNING - Incorrect - allows more than max number to be entered
//Native Textinput is 4 events ahead of js

//flickering with formatting

//Look up masking

// separate out the validation
// separate out the state management

//Do I need to wait for the deployment to go out before I can deploy to staging?
// let orientation = 'portrait';
let initStateFocus = {
  numberFocus: false,
  amountFocus: false,
  expireDateFocus: false,
  cvvFocus: false
};

const VoucherModal = ({ modalVisible, setModalVisible }) => {
  const { addVoucher } = useContext(VoucherContext);
  const { orientation } = useContext(OrientationContext);

  const [data, setData] = useState(initialVoucherState);
  const [isFocused, setFocus] = useState(initStateFocus);
  const [isVoucherForm, setIsVoucherForm] = useState(true);

  const [isError, setInputError] = useState(false);

  const [errorStyle, setErrorStyle] = useState({});

  const onBlurIsError = () => {
    if (data.number.length < 19)
      setErrorStyle({
        borderColor: "#de071c",
        backgroundColor: "#fef0f0"
      });
  };

  const [inputs, useFocusNextField] = useState({});

  // const focusNextField = key => {
  //   useFocusNextField({ ...inputs, key });
  //   inputs[key].focus();
  // };

  const handleVoucherData = data => {
    // debugger;
    if (validateForm()) {
      console.log(`TMB - validateForm() - true`);
      let parsedData = {
        number: data.number.replace(/[^\d]/g, ""),
        amount: data.amount.replace(/[^\d.]/g, ""),
        expireDate: data.expireDate.replace(/[^\d]/g, ""),
        cvv: data.cvv
      };
      console.log(`TMB - parsedDatadata - ${JSON.stringify(parsedData)}`);
      addVoucher(parsedData);
      setData(initialVoucherState);
      setIsVoucherForm(false);
      // setModalVisible(!modalVisible);
    }
    console.log(`TMB - handleVoucherData - ${JSON.stringify(data)}`);
  };

  const handleInputChange = (name, value) => {
    console.log(
      `TMB - name, value - ${JSON.stringify(name)} - ${JSON.stringify(value)}`
    );
    setData({
      ...data,
      [name]: value
    });
  };

  const validateForm = () => {
    let numberFlag = validateVoucherNumber(data.number);
    let amountFlag = validateVoucherAmount(data.amount);
    let expireFlag = validateExpireDate(data.expireDate);
    let cvvFlag = validateCVV(data.cvv);
    if (numberFlag && amountFlag && expireFlag && cvvFlag) {
      return true;
    }
    return false;
  };

  const validateVoucherNumber = voucherNum => {
    if (voucherNum.length < 19) {
      let newObj = {
        ...data,
        numberError: "Please Enter Valid Voucher Number"
      };
      setData(prevState => ({
        ...prevState,
        numberError: "Please Enter Valid Voucher Number"
      }));
      return false;
    }
    return true;
  };
  const validateVoucherAmount = voucherAmount => {
    if (voucherAmount.length === 0) {
      setData(prevState => ({
        ...prevState,
        amountError: "Please Enter Voucher Amount"
      }));
      return false;
    }
    return true;
  };
  const validateExpireDate = expireDate => {
    if (expireDate.length === 0) {
      setData(prevState => ({
        ...prevState,
        expireDateError: "Please Enter Valid Expiration Date"
      }));
      return false;
    }
    return true;
  };
  const validateCVV = cvv => {
    if (cvv.length === 0) {
      setData(prevState => ({
        ...prevState,
        cvvError: "Please Enter Valid CVV"
      }));
      return false;
    }
    return true;
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        // Alert.alert("Modal has been closed.");
      }}
    >
      <KeyboardAvoidingView
        style={styles.voucherContainer}
        behavior="padding"
        enabled
      >
        {/* <View style={styles.voucherContainer}> */}
        <View
          style={[
            styles.contentContainer,
            orientation === "portrait"
              ? styles.contentContainerPortrait
              : styles.contentContainerLandscape
          ]}
        >
          {isVoucherForm ? (
            <View>
              <View style={styles.headingContainer}>
                <Text style={styles.headingText}>{voucherHeadingText}</Text>
              </View>
              <View style={styles.instructionTextContainer}>
                <Text
                  style={[
                    styles.instructionText,
                    orientation === "portrait"
                      ? styles.instructionTextPortrait
                      : styles.instructionTextLandscape
                  ]}
                >
                  {instructionsText}
                </Text>
              </View>
              <View
                style={[
                  styles.inputFields,
                  orientation === "portrait"
                    ? styles.inputFieldsPortrait
                    : styles.inputFieldsLandscape
                ]}
              >
                <View
                  style={
                    orientation === "landscape"
                      ? styles.voucherNumContainerLandscape
                      : null
                  }
                >
                  <Text style={styles.inputLabel}>Voucher Number</Text>

                  <TextInput
                    style={[
                      styles.inputField,
                      data.numberError.length && styles.isError,
                      isFocused.numberFocus && styles.isFocused,
                      orientation === "landscape" ? { width: 305 } : null
                    ]}
                    onChangeText={text =>
                      handleInputChange("number", formatVoucherNumber(text))
                    }
                    value={data.number}
                    placeholder="1234-5678-9123-4567"
                    maxLength={19}
                    keyboardType="number-pad"
                    onFocus={() => {
                      if (data.numberError.length)
                        setData({
                          ...data,
                          numberError: ""
                        });
                      // }}

                      setFocus(prevState => ({
                        ...prevState,
                        numberFocus: true
                      }));
                    }}
                    onBlur={() => {
                      validateVoucherNumber(data.number);
                      setFocus(prevState => ({
                        ...prevState,
                        numberFocus: false
                      }));
                    }}
                    ref={input => {
                      inputs["number"] = input;
                    }}
                    onSubmitEditing={() => {
                      // focusNextField("amount");
                    }}
                    blurOnSubmit={false}
                  />
                  <Text style={styles.errorMessage}>{data.numberError}</Text>
                </View>

                <View
                  style={[
                    styles.rowContainer,
                    orientation === "portrait"
                      ? styles.rowContainerPortrait
                      : styles.rowContainerLandscape
                  ]}
                >
                  <View style={[styles.rowItem, { marginRight: 13 }]}>
                    <Text style={styles.inputLabel}>Voucher Amount</Text>
                    <TextInput
                      style={[
                        styles.inputField,
                        styles.inputFieldWidth,
                        { textAlign: "right", paddingRight: 15 },
                        data.amountError.length && styles.isError,
                        isFocused.amountFocus && styles.isFocused
                      ]}
                      onChangeText={text =>
                        handleInputChange("amount", toCurrency(text))
                      }
                      value={data.amount}
                      placeholder="$0.00"
                      maxLength={8}
                      keyboardType="number-pad"
                      onFocus={() => {
                        if (data.amountError.length)
                          setData({
                            ...data,
                            amountError: ""
                          });
                        // if (isError) setInputError(false);

                        setFocus(prevState => ({
                          ...prevState,
                          amountFocus: true
                        }));
                      }}
                      onBlur={() => {
                        validateVoucherAmount(data.amount);
                        setFocus(prevState => ({
                          ...prevState,
                          amountFocus: false
                        }));
                      }}
                      ref={input => {
                        inputs["amount"] = input;
                      }}
                      blurOnSubmit={false}
                    />
                    <View style={{ height: 40 }}>
                      <Text style={styles.errorMessage}>
                        {data.amountError}
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.rowItem, { marginRight: 13 }]}>
                    <Text style={styles.inputLabel}>Expiration Date</Text>
                    <TextInput
                      style={[
                        styles.inputField,
                        styles.inputFieldWidth,
                        data.expireDateError.length && styles.isError,
                        isFocused.expireDateFocus && styles.isFocused
                      ]}
                      onChangeText={text =>
                        handleInputChange("expireDate", formatExpDate(text))
                      }
                      value={data.expireDate}
                      placeholder="MM/YY"
                      maxLength={5}
                      onFocus={() => {
                        if (data.expireDateError.length)
                          setData({
                            ...data,
                            expireDateError: ""
                          });
                        setFocus(prevState => ({
                          ...prevState,
                          expireDateFocus: true
                        }));
                      }}
                      onBlur={() => {
                        validateExpireDate(data.expireDate);
                        setFocus(prevState => ({
                          ...prevState,
                          expireDateFocus: false
                        }));
                      }}
                    />
                    <View style={{ height: 40 }}>
                      <Text style={styles.errorMessage}>
                        {data.expireDateError}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.rowItem}>
                    <Text style={styles.inputLabel}>CVV</Text>
                    <TextInput
                      style={[
                        styles.inputField,
                        styles.inputFieldWidth,
                        data.cvvError.length && styles.isError,
                        isFocused.cvvFocus && styles.isFocused
                      ]}
                      onChangeText={text => handleInputChange("cvv", text)}
                      value={data.cvv}
                      placeholder="123"
                      maxLength={3}
                      onFocus={() => {
                        if (data.cvvError.length)
                          setData({
                            ...data,
                            cvvError: ""
                          });
                        setFocus(prevState => ({
                          ...prevState,
                          cvvFocus: true
                        }));
                      }}
                      onBlur={() => {
                        validateCVV(data.cvv);
                        setFocus(prevState => ({
                          ...prevState,
                          cvvFocus: false
                        }));
                      }}
                    />
                    <View style={{ height: 40 }}>
                      <Text style={styles.errorMessage}>{data.cvvError}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.footerContainer}>
                <TouchableHighlight
                  style={styles.cancelButton}
                  onPress={() => {
                    setData(initialVoucherState);
                    setModalVisible(!modalVisible);
                  }}
                >
                  <View style={styles.cancelButtonContainer}>
                    <Image style={styles.arrow} source={leftArrow} />
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </View>
                </TouchableHighlight>

                <View sytle={styles.submitButtonContainer}>
                  <TouchableHighlight
                    style={styles.submitButton}
                    onPress={() => {
                      handleVoucherData(data);
                    }}
                  >
                    <Text style={styles.submitButtonText}>Submit</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          ) : (
            <View>
              <View style={styles.headingContainer}>
                <Text style={styles.headingText}>
                  {voucherAppliedHeadingText}
                </Text>
              </View>
              <View style={styles.instructionTextContainer}>
                <Text style={styles.instructionTextVoucherAppplied}>
                  {translations.yourVoucherHasBeenAppliedText}
                </Text>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Image style={styles.image} source={circleCheck} />
                </View>
                <View style={[styles.footerContainer, { marginTop: 100 }]}>
                  <View sytle={styles.submitButtonContainer}>
                    <TouchableHighlight
                      style={[styles.submitButton, { width: 360 }]}
                      onPress={() => {
                        setIsVoucherForm(true);
                      }}
                    >
                      <Text style={styles.submitButtonText}>
                        Apply Another Voucher
                      </Text>
                    </TouchableHighlight>
                  </View>
                  <View sytle={styles.cancelButtonContainer}>
                    <TouchableHighlight
                      style={styles.cancelButton}
                      onPress={() => {
                        setModalVisible(!modalVisible);
                      }}
                    >
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                      <Image style={styles.arrow} source={rightArrow} />
                    </TouchableHighlight>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
        {/* </View> */}
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default VoucherModal;

const white = "#ffffff";
const blue = "#007aff";
const grey = "#757575";

const styles = StyleSheet.create({
  voucherContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  contentContainer: {
    backgroundColor: white,
    flexDirection: "column",
    borderRadius: 4
  },
  contentContainerPortrait: {
    width: 628,
    height: 600
  },
  contentContainerLandscape: {
    width: 960,
    height: 430
  },
  headingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: blue,
    height: 85
  },
  headingText: {
    fontSize: 27,
    color: white,
    marginLeft: 19,
    fontWeight: "normal",
    alignItems: "center"
  },
  instructionText: {
    color: "#757575",
    fontSize: 30
  },
  instructionTextContainer: {},
  instructionTextVoucherAppplied: {
    color: "#757575",
    fontSize: 30,
    padding: 30
  },
  instructionTextPortrait: {
    paddingTop: 30, //portrait
    paddingBottom: 30, //portrait
    paddingLeft: 40, //portrait
    paddingRight: 40, //portrait
    textAlign: "center"
  },
  instructionTextLandscape: {
    fontSize: 28,
    marginVertical: 20,
    marginLeft: 50
  },
  inputFields: {
    marginRight: 50,
    marginLeft: 50
  },
  inputFieldsPortrait: {
    flexDirection: "column"
  },
  inputFieldsLandscape: {
    flexDirection: "row"
  },
  inputLabel: {
    color: grey,
    fontSize: 24,
    fontWeight: "300",
    marginBottom: 11
  },
  inputField: {
    fontSize: 25,
    height: 50,
    // marginRight: 45,
    paddingLeft: 15,
    borderWidth: 1,
    borderRadius: 4
    // borderColor: "#d6d6d6"
  },
  inputFieldWidth: {
    width: 150
  },
  footerContainer: {
    marginHorizontal: 50,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1
    // backgroundColor: '#333333',
  },
  cancelButtonContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row"
  },
  cancelButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    width: 175
    // borderWidth: 2,
    // borderColor: blue,
    // borderRadius: 4
  },
  cancelButtonText: {
    color: "#757575",
    fontSize: 25
  },
  submitButtonContainer: {
    // justifyContent: 'center',
    // alignItems: 'center',
    // // padding: 50,
    // flex: 1,
  },
  submitButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    width: 175,
    backgroundColor: blue,
    borderRadius: 4
  },
  submitButtonText: {
    fontSize: 30,
    color: white
  },
  voucherNumContainerPortrait: {},
  voucherNumContainerLandscape: {
    flex: 40,
    marginTop: 10
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  rowContainerPortrait: {
    marginTop: 35
  },
  rowContainerLandscape: {
    marginTop: 10,
    flex: 60
  },
  rowItem: {
    width: 176
  },
  isError: {
    borderColor: "#de071c",
    backgroundColor: "#fef0f0"
  },
  isFocused: {
    borderColor: "#0070c9",
    backgroundColor: white,
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: "blue",
    shadowOffset: { height: 1, width: 0 },
    elevation: 5
  },
  arrow: {
    height: 38,
    marginRight: 7,
    width: 18
  },
  errorMessage: {
    color: "#de071c",
    fontSize: 12,
    paddingTop: 8,
    height: 15
  },
  image: {
    height: 160,
    width: 160
  }
});

const getDigitsFromValue = (value = "") =>
  value.replace(/(-(?!\d))|[^0-9|-]/g, "") || "";

const padDigits = digits => {
  const desiredLength = 3;
  const actualLength = digits.length;

  if (actualLength >= desiredLength) {
    return digits;
  }

  const amountToAdd = desiredLength - actualLength;
  const padding = "0".repeat(amountToAdd);

  return padding + digits;
};

const removeLeadingZeros = number => number.replace(/^0+([0-9]+)/, "$1");

const addDecimalToNumber = (number, separator) => {
  const centsStartingPosition = number.length - 2;
  const dollars = removeLeadingZeros(
    number.substring(0, centsStartingPosition)
  );
  const cents = number.substring(centsStartingPosition);
  return "$" + dollars + separator + cents;
};

const toCurrency = (value, separator = ".") => {
  const digits = getDigitsFromValue(value);
  console.log(`digits - ${digits}`);
  const digitsWithPadding = padDigits(digits);
  console.log(`digitsWithPadding - ${digitsWithPadding}`);
  return addDecimalToNumber(digitsWithPadding, separator);
};

// const convertToCurrency = input => {
//   value = new String(input);
//   // remove all characters that aren't digit or dot
//   value = value.replace(/[^0-9.]/g, "");
//   // replace multiple dots with a single dot
//   value = value.replace(/\.+/g, ".");
//   // only allow 2 digits after a dot
//   value = value.replace(/(.*\.[0-9][0-9]?).*/g, "$1");
//   // replace multiple zeros with a single one
//   value = value.replace(/^0+(.*)$/, "0$1");
//   // remove leading zero
//   value = value.replace(/^0([^.].*)$/, "$1");
//   console.log(`TMB - number - ${value}`);
//   return value;
// };

const TESTtoCurrency = number => {
  number = removeDollarSign(number);
  console.log(`TMB - number - ${typeof number}`);
  console.log(`TMB - number - ${number}`);
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  });
  console.log(`TMB - number - ${typeof number}`);
  console.log(`TMB - number - ${number}`);
  let convNum = Number(number);
  console.log(`TMB - convNum - ${typeof convNum}`);
  console.log(`TMB - convNum - ${convNum}`);

  // return formatter.format(convNum);
  return convNum;
};

const handleAmountInput = number => {
  const length = number.length;
  number = removeDollarSign(number);
  switch (length) {
    case 0:
      console.log(`TMB - number 0- ${number}`);
      return number;
    case 1:
      number = "$0.0" + number;
      console.log(`TMB - number 1- ${number}`);
      return number;
    default:
      var data = number.replace(".", "");
      var first = data.substring(1, data.length - 2);
      console.log(`TMB - number first - ${first}`);
      var second = data.substring(data.length - 2);
      console.log(`TMB - number second - ${second}`);
      var temp = Math.abs(first) + "." + second;
      number = "$" + temp;
      console.log(`TMB - number default - ${number}`);
      return number;
  }
};

//FIX THIS FOR REUSE

// const VoucherTextInput = ({ fieldName, maxLength, value, placeHolder }) => {
//   console.log(`TMB - value - ${JSON.stringify(value)}`);
//   return (
//     <TextInput
//       style={[styles.inputField, isError && styles.isError]}
//       onChangeText={text =>
//         handleInputChange(fieldName, formatVoucherNumber(text))
//       }
//       value={value}
//       placeholder={placeHolder}
//       maxLength={maxLength}
//       keyboardType="number-pad"
//       onFocus={() => {
//         setFocus(true);
//         if (isError) setInputError(false);
//       }}
//       onBlur={() => {
//         setFocus(false);
//         onBlurIsError();
//       }}
//     />
//   );
// };
