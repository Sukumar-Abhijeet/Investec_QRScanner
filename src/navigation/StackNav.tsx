/**
 *  Created By @name Sukumar_Abhijeet
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeSurface from '../surfaces/Home';
import ScannerSurface from '../surfaces/Scanner';
import NavKeys from './NavKeys';

const Stack = createStackNavigator();

const {HOME,SCANNER} = NavKeys;

const  StackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={HOME} component={HomeSurface} />
      <Stack.Screen name={SCANNER} component={ScannerSurface} />
    </Stack.Navigator>
  );
}

export default StackNav;