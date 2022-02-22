/**
 *  Created By @name Sukumar_Abhijeet
 */
 import React from 'react';
 import { LogBox } from 'react-native';
 import { NavigationContainer } from "@react-navigation/native";
 import StackNav from './StackNav';
 
 LogBox.ignoreLogs([
   "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
 ]);
 
 const AppNavigator = () =>{
      return(
         <NavigationContainer>
             <StackNav />
         </NavigationContainer>
      )
  };
 
  export default AppNavigator;