import React, { useState, useContext } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';

import VoucherContext from '../context/VoucherContext';
import CheckoutContext from '../context/CheckoutContext';

let enterPromoCode = 'Enter Promo Code';

let promoScannerEnabled = false;

const validatePromoCode = promoCode => {
	console.log(promoCode.length);
	if (promoCode && promoCode.length === 8) {
		return true;
	}
	return false;
};

const fetchAPIPost = async (url, payload) => {
	try {
		if (validatePromoCode(payload.promoCode)) {
			let response = await fetch(url, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					pan: payload.promoCode,
					user: '',
					reason: 'validate promotionCode',
				}),
			});
			let data = await response.json();
			//update to handle multiple promo - currently only one promo allowed
			console.log(`data - ${JSON.stringify(data)}`);
			if (data.success) {
				console.log(`data success - ${JSON.stringify(data.success)}`);
				return data.data[0].amount_redemption_max;
			} else {
				throw new Error(data.message);
			}
		} else {
			throw new Error();
		}
	} catch (err) {
		console.log(`FETCH ERROR - ${err}`);
		// Alert.alert('Invalid Promo Code');
	}
};

const PromoCode = () => {
	const [promoCode, setPromoCode] = useState();
	const [promoEnabled, setPromoEnabled] = useState(true);
	const { addPromo } = useContext(VoucherContext);

	const { sendWebkitMessageToIOS } = useContext(CheckoutContext);

	// let redemptionAmount;
	return (
		<View style={styles.container}>
			<Text style={styles.header}>{enterPromoCode}</Text>
			<View style={styles.inputContainer}>
				<View style={styles.input}>
					<TextInput
						autoCorrect={false}
						type='text'
						maxLength={8}
						onChangeText={text => {
							setPromoCode(text);
						}}
						style={styles.inputField}
						value={promoCode}
						editable={promoEnabled}
					/>
				</View>
				{promoScannerEnabled && (
					<View style={[styles.cameraContainer]}>
						<TouchableOpacity onPress={() => {}}>
							<Image
								style={[styles.cameraImage]}
								source={require('../assets/images/icon-camera-heading.png')}
							/>
						</TouchableOpacity>
					</View>
				)}
				<View style={[styles.button]}>
					<TouchableOpacity
						onPress={() => {
							// async () => {
							// let redemptionAmount = await fetchAPIPost(
							// 	'http://ewrccms05-staging.sys.otg.localdomain/papi/giftcardbalance',
							// 	{ promoCode }
							// );
							//if Success
							// if (redemptionAmount) {
							// addPromo(redemptionAmount);
							sendWebkitMessageToIOS('handlePromoCodeSubmit', { promoCode: 'KATEST22' });
							if (true) {
								setPromoCode('1 Promo Applied');
								setPromoEnabled(false);
							} else {
								setPromoCode('');
							}
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

const darkGrey = '#737373';
const lightGrey = '#f0f0f1';
const blue = '#157efb';
const white = '#ffffff';

const styles = StyleSheet.create({
	container: {
		// marginBottom: 10
	},
	header: {
		color: darkGrey,
		fontSize: 18,
		fontWeight: '600',
		marginLeft: 8,
		// width: 233,
		// marginTop: 10
	},
	inputContainer: {
		// display: "flex",
		flexDirection: 'row',
		marginTop: 5,
		height: 36,
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
		flex: 1,
	},
	inputField: {
		padding: 10,
	},
	button: {
		alignItems: 'center',
		backgroundColor: blue,
		//flex: 1,
		//flexDirection: "row",
		height: 36,
		justifyContent: 'center',
		// marginLeft: -30,
		marginRight: 10,
		width: 36,
		borderTopRightRadius: 8,
		borderBottomRightRadius: 8,
	},
	buttonText: {
		color: white,
		fontSize: 18,
		fontWeight: '500',
	},
	cameraContainer: {
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		backgroundColor: lightGrey,
	},
	cameraImage: {
		display: 'flex',
		height: 24,
		// marginLeft: -45.5,
		marginRight: 5,
		width: 32.5,
	},
});
