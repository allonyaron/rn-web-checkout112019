import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import GratuityModal from './modals/GratuityModal';
import {generate} from 'shortid';

import CheckoutContext from '../context/CheckoutContext';

let otherTipPercentageLabel = 'OTHER';

let tipAmountArr = [16, 18, 20];
let gratuityTotals = (paymentType, airlineSubtotalMiles, subtotal) =>
  tipAmountArr.map(amount => {
    let gratuityTotalAmount =
      paymentType === 'MILES'
        ? (airlineSubtotalMiles * (amount / 100)).toFixed(0)
        : `${(subtotal * (amount / 100)).toFixed(2)}`;
    console.log(`gratuityTotalAmount - ${gratuityTotalAmount}`);
    return {
      amount,
      tipPercentageLabel: `${amount}%`,
      tipAmount: gratuityTotalAmount,
    };
  });

const Gratuity = () => {
  const [activeButton, setActiveButton] = useState(18);
  const {state, dispatch} = useContext(CheckoutContext);
  const {subtotal, airlineSubtotalMiles, paymentType, airlineTip} = state;
  const [modalVisible, setModalVisible] = useState(false);
  const [tipPercent, setTipPercent] = useState(18);

  const gratuityOptions = gratuityTotals(
    paymentType,
    airlineSubtotalMiles,
    subtotal,
  );

  return (
    <View>
      <View style={styles.container}>
        {gratuityOptions.map(option => (
          <TouchableOpacity
            style={[
              styles.buttonContainer,
              activeButton === option.amount ? styles.active : styles.notActive,
            ]}
            onPress={() => {
              setActiveButton(option.amount);
              dispatch({
                type:
                  paymentType === 'MILES'
                    ? 'SET_GRATUITY_MILES'
                    : 'SET_GRATUITY',
                payload: option.tipAmount,
              });
              // setGratuityAmount(`${option.tipAmount}`);
              setTipPercent(option.amount);
            }}
            key={generate()}>
            <Text
              style={[
                styles.gratuityText,
                activeButton === option.amount
                  ? styles.active
                  : styles.notActive,
              ]}>
              {option.amount}%
            </Text>
            {option.tipAmount && (
              <Text
                style={[
                  styles.amountText,
                  activeButton === option.amount
                    ? styles.active
                    : styles.notActive,
                ]}>
                {paymentType !== 'MILES' ? '$' : null}
                {option.tipAmount}
              </Text>
            )}
          </TouchableOpacity>
        ))}
        <View
          styles={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            style={[
              styles.buttonContainerNoBorder,
              activeButton === 'other' ? styles.active : styles.notActive,
            ]}
            onPress={() => {
              setModalVisible(true);
            }}
            key={generate()}>
            <Text
              style={[
                styles.gratuityText,
                {
                  fontSize: 14,
                },
                activeButton === 'other' ? styles.active : styles.notActive,
              ]}>
              {otherTipPercentageLabel}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        {/* <GratuityModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          tipPercent={tipPercent}
          setTipPercent={setTipPercent}
          setActiveButton={setActiveButton}
          setGratuityAmount={() => {}}
          subtotal={subtotal}
        /> */}
      </View>
    </View>
  );
};

export default Gratuity;

const darkGrey = '#737373';
const blue = '#157efb';
const lightGrey = '#d1d1d1';
const grey = '#737373';
const white = '#ffffff';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: blue,
    borderRadius: 4,
    flexDirection: 'row',
    height: 43,
    marginTop: 8,
  },

  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    width: 59,
    flex: 1,
    borderRightWidth: 1,
    borderColor: blue,
  },
  buttonContainerNoBorder: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    width: 59,
    flex: 1,
  },
  border: {
    borderColor: blue,
    borderRightWidth: 1,
  },
  amountText: {
    fontSize: 13,
    textAlign: 'center',
  },
  gratuityText: {
    fontSize: 20,
    textAlign: 'center',
  },
  active: {
    color: white,
    backgroundColor: blue,
  },
  notActive: {
    color: grey,
    backgroundColor: white,
  },
});
