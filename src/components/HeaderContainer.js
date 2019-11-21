import React from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
// import {ScrollView} from 'react-native-gesture-handler';

let translations = {};
translations.scanYourBoardingPassToViewOffers =
  'SCAN YOUR BOARDING PASS TO VIEW OFFERS';

let warnings = {
  alcoholWarningTitle: 'Alcohol Warning:',
  rawFoodProductTitle: 'Raw Food Product:',
  allergyWarningBody:
    'Menu items contain common food allergens such as those found in peanuts, tree nuts, fish, shellfish, eggs, milk, wheat and soy. Our facilities are NOT allergen free environments.',
  rawFoodProductBody:
    'Consuming raw or undercooked meats, poultry, seafood, shellfish or eggs may increase your risk of food borne illnesses.',
  alcoholWarningBody:
    'Customers must be 21 years of age or older to order and/ or drink alcoholic beverages.',
  allergyWarningTitle: 'Allergy Warning:',
};

const HeaderContainer = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerStyle}>
        <TouchableOpacity style={styles.backButton} onPress={() => {}}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <ScrollView
          style={styles.warningsContainer}
          contentContainerStyle={{
            // alignItems: "flex-start",
            flexDirection: 'row',
          }}>
          <View style={{flex: 42, marginHorizontal: 2}}>
            <Text style={styles.warningText}>
              <Text style={styles.warningTitle}>
                {warnings.allergyWarningTitle}{' '}
              </Text>
              {warnings.allergyWarningBody}
            </Text>
          </View>
          <View style={{flex: 26, marginHorizontal: 2}}>
            <Text style={styles.warningText}>
              <Text style={styles.warningTitle}>
                {warnings.alcoholWarningTitle}{' '}
              </Text>
              {warnings.alcoholWarningBody}
            </Text>
          </View>
          <View style={{flex: 32, marginHorizontal: 2}}>
            <Text style={styles.warningText}>
              <Text style={styles.warningTitle}>
                {warnings.rawFoodProductTitle}{' '}
              </Text>

              {warnings.rawFoodProductBody}
            </Text>
          </View>
        </ScrollView>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logoImage}
            source={require('../assets/images/logo-powered-by-flo.png')}
          />
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={styles.scanBoardingPassStyle}
          onPress={() => console.log('handleScanBoardingPass')}>
          <Text style={styles.scanBoardingPassTextStyle}>
            {translations.scanYourBoardingPassToViewOffers}
          </Text>
          <Image
            style={[styles.scanBooardingCameraImage]}
            source={require('../assets/images/icon-camera-heading.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderContainer;

const lightGrey = '#f6f6f6';
const grey = '#C7C7C7';
const blue = '#157efb';

const buttonGrey = '#e7e7e7';
const textGrey = '#888888';

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  headerContainer: {
    height: 109,
  },
  headerStyle: {
    height: 61,
    backgroundColor: lightGrey,
    borderBottomWidth: 1,
    borderColor: grey,
    flexDirection: 'row',
    flex: 1,
  },
  backButton: {
    alignItems: 'center',
    backgroundColor: buttonGrey,
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    marginLeft: 10,
    marginTop: 10,
    width: 92,
  },
  backButtonText: {
    color: blue,
    textAlign: 'center',
    width: 92,
  },
  warningsContainer: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 7,
  },
  warningTitle: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: textGrey,
    textAlign: 'justify',
  },
  warningText: {
    fontSize: 8.5,
    color: textGrey,
  },
  logoContainer: {
    marginTop: 18,
    marginRight: 20,
  },
  logoImage: {
    height: 23,
    width: 92,
  },
  scanBoardingPassStyle: {
    height: 48,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  scanBoardingPassTextStyle: {
    color: '#007aff',
    fontSize: 25,
    fontWeight: '500',
    letterSpacing: 0.5,
    textAlign: 'center',
  },

  scanBooardingCameraImage: {
    height: 24,
    marginLeft: 12,
    marginRight: 12,
    width: 32,
  },
});
