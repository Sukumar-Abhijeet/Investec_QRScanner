/**
 *  Created By @name Sukumar_Abhijeet
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeSurface from '../surfaces/Home';
import ScannerSurface from '../surfaces/Scanner';
import NavKeys from './NavKeys';
import PdfViewSurface from '../surfaces/PdfView';

const Stack = createStackNavigator();

const {HOME,SCANNER,PDF_VIEW} = NavKeys;

const  StackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={HOME} component={HomeSurface} />
      <Stack.Screen name={SCANNER} component={ScannerSurface} />
      <Stack.Screen name={PDF_VIEW} component={PdfViewSurface} />
    </Stack.Navigator>
  );
}

export default StackNav;