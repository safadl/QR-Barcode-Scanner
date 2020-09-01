import 'react-native-gesture-handler'

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
} from 'react-native';

import {

  Colors,

} from 'react-native/Libraries/NewAppScreen';
import QRCodeScanner from './src/components/QRCodeScanner'
import Barcodescanner from './src/components/Barcodescanner';
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons';
import History from './src/components/History'

const Tab= createBottomTabNavigator();
const TabNav=()=>{
  return(
  <Tab.Navigator
  screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === 'QR scan') {
        iconName = focused
          ? 'ios-scan'
          : 'ios-scan-outline';
      } else if (route.name === 'Bar scan') {
        iconName = focused ? 'ios-barcode' : 'ios-barcode-outline';
      }else{
        iconName = focused ? 'list' : 'list-outline';
      }

      // You can return any component that you like here!
      return <Ionicons name={iconName} size={size} color={color} />;
    },
  })}
  tabBarOptions={{
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
  }}
  >
    <Tab.Screen name="QR scan" component={QRCodeScanner} />
    <Tab.Screen name="Bar scan" component={Barcodescanner} />
    <Tab.Screen name="Search History" component={History} />

  </Tab.Navigator>
  )
}

const App= () => {
  return (

    <>
      <StatusBar barStyle="dark-content" />
     

              <NavigationContainer>
                <TabNav />
              </NavigationContainer>
           
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
