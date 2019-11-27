import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";

import CheckoutContext from "../context/CheckoutContext";

function Plus({ addQuantity }) {
  return (
    <TouchableOpacity onPress={addQuantity}>
      <Image
        style={styles.plus}
        source={require("../assets/images/ui-plus-44-x-44-blue.png")}
      />
    </TouchableOpacity>
  );
}

// sendWebkitMessageToIOS - (message, data) - incrementCartQuanity - {"itemId":140003,"sign":"add","cartIndex":0}
// sendWebkitMessageToIOS - (message, data) - incrementCartQuanity - {"itemId":140003,"sign":"subtract","cartIndex":0}

function Minus({ subtractQuantity, minusStyle }) {
  return (
    <TouchableOpacity>
      <Image
        style={styles.minus}
        source={require("../assets/images/ui-minus-44-x-44-blue.png")}
      />
    </TouchableOpacity>
  );
}

const ItemContainer = ({ item, cmsIP, payment_type, index }) => {
  const {
    menu_item_id,
    quantity,
    display_price,
    title,
    display_price_in_miles,
    imageUrl
  } = item;
  const { sendWebkitMessageToIOS } = useContext(CheckoutContext);

  return (
    <View style={styles.itemContainer}>
      <Image style={styles.itemImage} source={{ uri: `${cmsIP}${imageUrl}` }} />
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemTextTitle}>{title}</Text>
        <Text style={styles.itemTextModifiers}></Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          onPress={() =>
            sendWebkitMessageToIOS("incrementCartQuanity", {
              itemId: menu_item_id,
              sign: "subtract",
              cartIndex: index
            })
          }
        >
          <Image
            style={styles.minus}
            source={require("../assets/images/ui-minus-44-x-44-blue.png")}
          />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity
          onPress={() =>
            sendWebkitMessageToIOS("incrementCartQuanity", {
              itemId: menu_item_id,
              sign: "add",
              cartIndex: index
            })
          }
        >
          <Image
            style={styles.plus}
            source={require("../assets/images/ui-plus-44-x-44-blue.png")}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.itemPrice}>
        {payment_type === "MILES"
          ? display_price_in_miles
          : `$${display_price}`}
      </Text>
    </View>
  );
};

const CartContainer = () => {
  const { state, sendWebkitMessageToIOS } = useContext(CheckoutContext);
  const { itemQuantity, cartItems, cmsIP, payment_type } = state;

  return (
    <View style={styles.itemsContainer}>
      <View style={styles.headerBorder}>
        <Text style={styles.headerTitle}>
          {itemQuantity} Items on your check
        </Text>
      </View>
      <View style={styles.cartItemContainer}>
        {cartItems && (
          <ScrollView style={{ flex: 1 }}>
            {cartItems.map((item, idx) => {
              return (
                <ItemContainer
                  item={item}
                  key={idx}
                  index={idx}
                  cmsIP={cmsIP}
                  payment_type={payment_type}
                />
              );
            })}
          </ScrollView>
        )}
      </View>
      <View>
        <TouchableOpacity
          style={styles.addItemButtonContainer}
          onPress={() => sendWebkitMessageToIOS("AddMoreItems")}
        >
          <Image
            style={styles.addItemButtonPlus}
            source={require("../assets/images/ui-plus-44-x-44-white.png")}
          />
          <Text style={styles.addItemButtonText}>Add More Items</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartContainer;

const grey = "#737373";
const white = "#ffffff";
const blue = "#157efb";

const styles = StyleSheet.create({
  itemsContainer: {
    flex: 1
    // margin: 12,
  },
  headerTitle: {
    color: "#737373",
    fontSize: 20,
    height: 30,
    letterSpacing: 0.8,
    textAlign: "left",
    marginTop: 12,
    marginHorizontal: 12
  },
  headerBorder: {
    // borderBottomWidth: 1,
    // borderColor: "#C7C7C7"
  },
  cartItemContainer: {
    flex: 1
  },
  itemContainer: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#C7C7C7",
    marginHorizontal: 12
  },
  itemImage: {
    height: 56,
    width: 56
  },
  itemTextContainer: {
    flexDirection: "column",
    flex: 1,
    marginLeft: 12
  },
  itemTextTitle: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 3
  },
  itemTextModifiers: {
    color: grey,
    fontSize: 15,
    fontWeight: "300"
  },

  itemPrice: {
    fontSize: 17,
    paddingLeft: 14,
    paddingRight: 5
  },
  quantityContainer: {
    flexDirection: "row",
    marginRight: 10,
    marginLeft: 5
  },
  minus: {
    height: 24,
    marginRight: 15,
    width: 24
  },

  plus: {
    height: 24,
    marginLeft: 15,
    width: 24
  },
  quantityText: {
    fontSize: 18
  },
  addItemButtonContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: blue,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    flexDirection: "row",
    paddingVertical: 10
  },
  addItemButtonPlus: {
    height: 21,
    marginLeft: 13,
    marginRight: 8,
    width: 21
  },
  addItemButtonText: {
    color: white,
    fontSize: 22,
    fontWeight: "200"
  }
});
