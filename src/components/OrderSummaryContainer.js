import React, {useContext, useState} from 'react';
import {View, StyleSheet, Text, Switch} from 'react-native';

import CheckoutContext from '../context/CheckoutContext';
import VoucherContext from '../context/VoucherContext';

let orderSummaryLabel = 'ORDER SUMMARY';
let takeoutLabel = 'TAKEOUT?';

let enabled = false;
let itemText = 'Item';
let discountLabel = 'Discount';
let gratuityLabel = 'Gratuity';
let gratuity = '$8.42';
let totalBeforeTaxLabel = 'Total Before Tax';
let taxLabel = 'Tax';
let orderTotalLabel = 'ORDER TOTAL:';

const OrderSummary = () => {
  const {state} = useContext(CheckoutContext);
  const {
    paymentType,
    subtotal,
    tipAmount,
    tax,
    itemQuantity,
    airlineSubtotalMiles,
    airlineTip,
    airlineTax,
  } = state;
  const {exceptionAmount, showException} = useContext(VoucherContext);
  const [takeoutSwitch, setTakeoutSwitch] = useState(false);
  const [takeout, setTakeout] = useState('DINEIN');

  let subtotalDisplay =
    paymentType === 'MILES' ? airlineSubtotalMiles : `$${subtotal}`;

  let discountAmountDisplay =
    paymentType === 'MILES' ? 0 : `-$${exceptionAmount}`;

  let gratuityDisplay = paymentType === 'MILES' ? airlineTip : `$${tipAmount}`;

  let totalBeforeTaxCurrency = (
    ((+subtotal + +tipAmount) * 100 - exceptionAmount * 100) /
    100
  ).toFixed(2);

  let totalBeforeTaxMiles = (+airlineSubtotalMiles + +airlineTip).toFixed(0);
  let totalBeforeTaxDisplay =
    paymentType !== 'MILES'
      ? `$${totalBeforeTaxCurrency}`
      : totalBeforeTaxMiles;
  let taxDisplay = paymentType !== 'MILES' ? `$${tax}` : airlineTax;

  let totalAmountCurrencyDisplay = `$${(+totalBeforeTaxCurrency + +tax).toFixed(
    2,
  )}`;
  let totalAmountMilesDisplay = (+totalBeforeTaxMiles + +airlineTax).toFixed(0);

  return (
    <View style={styles.orderSummaryContainer}>
      <Text style={styles.orderSummaryLabel}>{orderSummaryLabel}</Text>
      <View style={styles.rowContainer}>
        <Text style={styles.takeoutLabel}>{takeoutLabel}</Text>
        <Switch
          style={styles.switch}
          value={enabled}
          onValueChange={takeoutSwitch => {
            setTakeoutSwitch(takeoutSwitch => !takeoutSwitch);
            setTakeout(takeoutSwitch === false ? 'DINEIN' : 'TOGO');
          }}
          // ios_backgroundColor={"#737373"}
          // trackColor={{ false: "#737373", true: "#737373" }}
        />
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.textLabel}>{`${itemText}(${itemQuantity})`}</Text>
        <Text style={styles.textLabel}>{subtotalDisplay}</Text>
      </View>
      {showException && (
        <View style={styles.rowContainer}>
          <Text style={styles.textLabel}>{discountLabel}</Text>
          <Text style={styles.textLabel}>{discountAmountDisplay}</Text>
        </View>
      )}
      <View style={styles.rowContainer}>
        <Text style={styles.textLabel}>{gratuityLabel}</Text>
        <Text style={styles.textLabel}>{gratuityDisplay}</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.textLabel}>{totalBeforeTaxLabel}</Text>
        <Text style={styles.textLabel}>{totalBeforeTaxDisplay}</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.textLabel}>{taxLabel}</Text>
        <Text style={styles.textLabel}>{taxDisplay}</Text>
      </View>
      <View
        style={{
          borderBottomColor: '#C7C7C7',
          borderBottomWidth: 1,
        }}
      />
      <View style={styles.rowContainer}>
        <Text style={styles.orderTotal}>{orderTotalLabel}</Text>
        <Text style={[styles.orderTotal, styles.orderTotalAmount]}>
          {totalAmountCurrencyDisplay}
        </Text>
      </View>
      {/* if miles enabled */}
      <View style={styles.rowContainer}>
        <View>
          <Text style={styles.orText}>OR</Text>
          <Text style={styles.milesTotalAmountLabel}>PAY WITH MILES</Text>
        </View>
        <View>
          <Text style={[styles.milesTotalAmountLabel, styles.milesTotalAmount]}>
            {totalAmountMilesDisplay}
          </Text>
          <Text style={styles.awardMilesText}>AWARD MILES</Text>
        </View>
      </View>
    </View>
  );
};

export default OrderSummary;

const royalBlue = '#003399';

const styles = StyleSheet.create({
  orderSummaryContainer: {
    marginLeft: 13,
    marginRight: 13,
    marginTop: 3,
  },
  orderSummaryLabel: {
    color: '#737373',
    fontSize: 20,
    fontWeight: '600',
    height: 30,
    letterSpacing: 0.8,
    textAlign: 'left',
  },
  switch: {
    flex: 0.3,
    height: 30,
    // marginRight: 13,
    width: 73,
    marginRight: 25,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  takeoutLabel: {
    color: '#737373',
    fontSize: 16,
  },
  textLabel: {
    marginBottom: 10,
    color: '#737373',
    fontSize: 16,
    height: 19,
  },
  orderTotal: {
    color: '#4cd964',
    fontSize: 15,
    fontWeight: 'bold',
  },
  orderTotalAmount: {
    fontSize: 16,
    textAlign: 'right',
  },
  milesTotalAmountLabel: {
    color: royalBlue,
    fontSize: 15,
    fontWeight: 'bold',
  },
  milesTotalAmount: {
    color: royalBlue,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
    textAlign: 'right',
  },
  orText: {
    fontSize: 9,
    marginBottom: 3,
    // marginRight: 43,
    marginTop: 3,
    textAlign: 'center',
  },
  awardMilesText: {
    color: royalBlue,
    fontSize: 8,
    marginLeft: 3,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});
