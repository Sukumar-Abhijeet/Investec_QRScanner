/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {View,Text,StyleSheet} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Button from '../../Components/atoms/button';
import AppTheme from '../../Configs/Theme';
import Toast from 'react-native-simple-toast';

interface ScannerProps{
    navigation : {
        goBack : () => void;
    }
}

const ScannerSurface = ({...props}: ScannerProps) =>{

    const {
        navigation
    } =  props;

    const onSuccess = e => {
       Toast.show('Scan Completed');
       console.log("onSuccess",e);
       onDone();
    };

    const onDone = () => navigation.goBack();

     return(
         <View style={styles.container}>
            <QRCodeScanner
                onRead={onSuccess}
                flashMode={RNCamera.Constants.FlashMode.torch}
                topContent={
                <Text style={styles.headText}>
                Place the QR code inside the box
                </Text>
                }
                bottomContent={
                    <Button  text={'Close'} style={{width:'90%'}} onPress={onDone} />
                }
            />
         </View>
     )
 };

 export default ScannerSurface;
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: AppTheme.white
    },
    headText:{
        fontSize:20
    }
});