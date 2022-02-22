/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {
    TouchableOpacity,Text,StyleSheet,
    StyleProp,
    ViewStyle, TextStyle
} from 'react-native';
import AppTheme from '../../../Configs/Theme';

interface ButtonProps{
    onPress ?: () => void;
    isDisabled ? : boolean;
    text : string;
    style ? : StyleProp<ViewStyle>;
    textStyle ? : StyleProp<TextStyle>;
}

const Button = ({...props} : ButtonProps) =>{

    const {
        onPress,
        text,
        style,
        textStyle,
        isDisabled = false
    } = props;

     return(
         <TouchableOpacity disabled = {isDisabled} onPress={onPress} style={[styles.defaultStyle,style]}>
             <Text style={[styles.defaultTextStyle,textStyle]}>{text}</Text>
         </TouchableOpacity>
     )
 };

 export default Button;
const styles = StyleSheet.create({
    defaultStyle:{
        backgroundColor: AppTheme.success,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:10,
        borderRadius:4
    },
    defaultTextStyle:{
        color:AppTheme.white,
        fontWeight:'bold',
    }
});