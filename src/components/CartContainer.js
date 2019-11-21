import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import CheckoutContext from '../context/CheckoutContext';

const addQuantity = payload => {
  // can I use cmsIp
  const url = `http://ewrccms05-staging.sys.otg.localdomain/MPConnect/services/mpconnect/order/cart`;
  // fetchAPIPost(url, payload);
};

function Plus({addQuantity}) {
  return (
    <TouchableOpacity onPress={addQuantity}>
      <Image
        style={styles.plus}
        source={require('../assets/images/ui-plus-44-x-44-blue.png')}
      />
    </TouchableOpacity>
  );
}

function Minus({subtractQuantity, minusStyle}) {
  return (
    <TouchableOpacity>
      <Image
        style={styles.minus}
        source={require('../assets/images/ui-minus-44-x-44-blue.png')}
      />
    </TouchableOpacity>
  );
}

const ItemContainer = ({item, cmsIp, paymentType}) => {
  const {quantity, displayPrice, title, displayPriceInMiles, imageUrl} = item;

  return (
    <View style={styles.itemContainer}>
      <Image style={styles.itemImage} source={{uri: `${cmsIp}${imageUrl}`}} />
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemTextTitle}>{title}</Text>
        <Text style={styles.itemTextModifiers}>Add Chicken</Text>
      </View>
      <View style={styles.quantityContainer}>
        <Minus />
        <Text style={styles.quantityText}>{quantity}</Text>
        <Plus />
      </View>
      <Text style={styles.itemPrice}>
        {paymentType === 'MILES' ? displayPriceInMiles : `$${displayPrice}`}
      </Text>
    </View>
  );
};

const CartContainer = () => {
  const {state} = useContext(CheckoutContext);
  const {itemQuantity, cartItems, cmsIp, paymentType} = state;

  return (
    <View style={styles.itemsContainer}>
      <View style={styles.headerBorder}>
        <Text style={styles.headerTitle}>
          {itemQuantity} Items on your check
        </Text>
      </View>
      <ScrollView style={{flex: 1}}>
        {cartItems.map((item, idx) => {
          return (
            <ItemContainer
              item={item}
              key={idx}
              cmsIp={cmsIp}
              paymentType={paymentType}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default CartContainer;

const grey = '#737373';

const styles = StyleSheet.create({
  itemsContainer: {
    flex: 1,
    margin: 12,
  },
  headerTitle: {
    color: '#737373',
    fontSize: 20,
    height: 30,
    letterSpacing: 0.8,
    textAlign: 'left',
  },
  headerBorder: {
    // borderBottomWidth: 1,
    // borderColor: "#C7C7C7"
  },
  itemContainer: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#C7C7C7',
  },
  itemImage: {
    height: 56,
    width: 56,
  },
  itemTextContainer: {
    flexDirection: 'column',
    flex: 1,
    marginLeft: 12,
    // alignItems: "baseline"
  },
  itemTextTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 3,
    // marginTop: 1
    // paddingLeft: 5
  },
  itemTextModifiers: {
    color: grey,
    fontSize: 15,
    fontWeight: '300',
    // paddingLeft: 5
  },

  itemPrice: {
    fontSize: 17,
    paddingLeft: 14,
    paddingRight: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    marginRight: 10,
    marginLeft: 5,
  },
  minus: {
    height: 24,
    marginRight: 15,
    width: 24,
  },

  plus: {
    height: 24,
    marginLeft: 15,
    width: 24,
  },
  quantityText: {
    fontSize: 18,
  },
});

// const fetchAPIPost = async (url, payload) => {
//   try {
//     let response = await fetch(url, {
//       method: 'POST',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({
//         cartRequest: {
//           items: [
//             {
//               quantity: 2,
//               menu_item_price: 12.5,
//               menu_item_id: '140003',
//               airlineMiles: 1570,
//               modifiers: [],
//             },
//           ],
//           calc_total_only: 1,
//           tip_amount: 4.5,
//         },
//       }),
//     });
//     let data = await response.json();
//     //update to handle multiple promo - currently only one promo allowed
//     if (data.success) {
//       return data.data[0].amount_redemption_max;
//     } else {
//       throw new Error(data.message);
//     }
//   } catch (err) {
//     Alert.alert('Invalid Promo Code');
//   }
// };
