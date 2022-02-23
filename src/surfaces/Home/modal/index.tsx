/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {View,StyleSheet,Text} from 'react-native';

import Modal from 'react-native-modal';
import Button from '../../../Components/atoms/button';
import AppTheme from '../../../Configs/Theme';
import { useEffect } from 'react';

const ModalComponent = ({...props}) =>{

    const {visible, setVisible, qrResult,setQrResult} = props;

    console.log('qrResult',qrResult);

    const onDismiss = () => {
        setVisible(false);
        setQrResult(null);
    }

    useEffect(()=>{
        qrResult && setVisible(true);
    },[qrResult])

    const renderModalContent = () => {
        return(
            <View style={styles.modalContainer}>
                <Text>
                    {qrResult?.values?.toString()}
                </Text>
                <Button style={styles.buttonStyles} text='Close' onPress={onDismiss} />
            </View>
        )
    }

     return(
         <View>
              <Modal
                backdropColor={AppTheme.black}
                dismissable={true}
                hasBackdrop={true}
                isVisible={visible}
                onBackButtonPress={onDismiss}
                onBackdropPress ={onDismiss}
                style={{justifyContent:'center',alignItems:'center',margin:0,padding:0}}
                useNativeDriver={true}
            >
                {renderModalContent()}
            </Modal>
         </View>
     )
 };

 export default ModalComponent;
const styles = StyleSheet.create({
    modalContainer:{
        width:'95%',
        height:'55%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius:6,
        backgroundColor:AppTheme.white,
        padding:15
    },
    buttonStyles:{
        position:'absolute',
        bottom:10,
        alignSelf:'center'
    }
});