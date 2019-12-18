import React from "react";

// const PromoContext = React.createContext();

const PromoStateContext = React.createContext();
const PromoDispatchContext = React.createContext();

const promoReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_PROMOCODE": {
      return { ...state, promoCode: action.payload };
    }
    default: {
      throw new Error(`Unsupported action type: ${action.type}`);
    }
  }
};

const usePromoState = () => {
  const context = React.useContext(PromoStateContext);
  if (!context) {
    throw new Error(`usePromoState must be used within a PromoProvider`);
  }
  return {
    promoState: context
  };
};

const usePromoDispatch = () => {
  const context = React.useContext(PromoDispatchContext);
  if (!context) {
    throw new Error("usePromoDispatch must be used within a PromoProvider");
  }
  // const [dispatch] = context;

  return {
    promoDispatch: context
  };
};

const initialState = { promoCode: "" };

const PromoProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(promoReducer, initialState);
  // const value = React.useMemo(() => [state, dispatch], [state]);
  // console.log(`value - ${JSON.stringify(value)}`);

  return (
    <PromoStateContext.Provider value={state}>
      <PromoDispatchContext.Provider value={dispatch}>
        {children}
      </PromoDispatchContext.Provider>
    </PromoStateContext.Provider>
  );
};

// function CountProvider({ children }) {
//   const [state, dispatch] = React.useReducer(countReducer, { count: 0 });
//   return (
//     <CountStateContext.Provider value={state}>
//       <CountDispatchContext.Provider value={dispatch}>
//         {children}
//       </CountDispatchContext.Provider>
//     </CountStateContext.Provider>
//   );
// }

export { PromoProvider, usePromoState, usePromoDispatch };
