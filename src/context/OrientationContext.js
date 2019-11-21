import React, {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';

const OrientationContext = React.createContext();

const getOrientation = () => {
  if (Dimensions.get('window').width < Dimensions.get('window').height) {
    return 'portrait';
  } else {
    return 'landscape';
  }
};

export const OrientationProvider = ({children}) => {
  const [orientation, setOrientation] = useState(getOrientation());

  useEffect(() => {
    Dimensions.addEventListener('change', () => {
      setOrientation(getOrientation());
    });

    return () => {
      console.log('Cleaned up Listener');
      Dimensions.removeEventListener('change');
    };
  }, []);

  return (
    <OrientationContext.Provider value={{orientation}}>
      {children}
    </OrientationContext.Provider>
  );
};

export default OrientationContext;
