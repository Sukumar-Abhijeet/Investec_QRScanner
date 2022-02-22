/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import Button from '../../Components/atoms/button';
import AppTheme from '../../Configs/Theme';
import NavKeys from '../../navigation/NavKeys';

interface HomeProps{
    navigation : {
        navigate : (key:string) => void;
    }
}

const HomeSurface = ({...props} : HomeProps) =>{

    const {
        navigation:{
            navigate
        }
    } = props;

    const onPress = () => navigate(NavKeys.SCANNER);

     return(
         <View style={styles.container}>
             <Text>Hello Tester !</Text>
             <Text>Would you like to scan a QR Code ?</Text>
             <Button style={styles.button} text={'Yes Please'} onPress={onPress} />
         </View>
     )
 };

 export default HomeSurface;
const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        backgroundColor: AppTheme.white,
        padding:20
    },
    button:{
        marginTop:20
    }
});