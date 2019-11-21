import React, { useState } from 'react';

const VoucherContext = React.createContext();

let initialState = {
	number: '',
	amount: '',
	expireDate: '',
	cvv: '',
};

export const VoucherProvider = ({ children }) => {
	const [voucherData, setVoucherData] = useState([]);
	const [promoAmount, setPromoAmount] = useState(0);
	const addVoucher = voucherObj => {
		setVoucherData(prevState => [...prevState, voucherObj]);
	};

	const addPromo = promoAmount => {
		setPromoAmount(promoAmount);
	};
	let voucherTotal = 0;
	if (voucherData.length) {
		voucherTotal = voucherData.reduce((voucherTotal, voucher) => {
			return voucherTotal + voucher.amount * 100;
		}, 0);
	}
	console.log(`voucherTotal - ${voucherTotal} - promoAmount - ${promoAmount}- promoAmount - ${Number(promoAmount)}`);
	let exceptionAmount = voucherTotal + Number(promoAmount);
	console.log(`exceptionAmount - ${exceptionAmount}`);

	let showException = false;
	if (exceptionAmount > 0) {
		//should this be done with useState?
		showException = true;
	}
	// let showException = false;

	return (
		<VoucherContext.Provider
			value={{
				exceptionAmount,
				showException,
				addVoucher,
				addPromo,
			}}
		>
			{children}
		</VoucherContext.Provider>
	);
};

export default VoucherContext;
