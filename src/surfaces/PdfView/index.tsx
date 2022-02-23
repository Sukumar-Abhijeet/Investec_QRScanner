/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useRef,useState} from 'react';
import {View,Text,StyleSheet,Dimensions} from 'react-native';
import Pdf from 'react-native-pdf';
import ViewShot , {captureScreen} from "react-native-view-shot";
import Button from '../../Components/atoms/button';
import { detectQRFromImg } from '../../utils/qrHelpers';
import ScreenInfo from '../../utils/deviceHelper';
import ModalComponent from '../Home/modal';

const barThickness = 20;
const topThickNess = 80;

const PdfViewSurface = ({...props}) =>{

    const {route:{params:{docPath}}} = props;
    const source = { uri: docPath , cache: true };
    const [visible, setVisible] = useState(false);
    const [qrResult, setQrResult] = useState(null);

    console.log('source',source);

    const viewShotRef = useRef(null);

    const checkQR = async (IMG_PATH) =>{
        console.log('IMG_PATH',IMG_PATH);
        try{
            const qrResult = await detectQRFromImg(IMG_PATH, true);
            console.log('qrResult',qrResult);
            if(qrResult){
                setQrResult(qrResult);
                setVisible(true);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    const onCapture = () => {
        captureScreen({
            format: "png",
            quality: 1,
            result : 'base64'
          }).then(
            uri => checkQR(uri),
            error => console.error("Oops, snapshot failed", error)
          );
    };

     return(
         <View style={{flex:1}}>
             <ViewShot style={{flex:1}} ref={viewShotRef} options={{ format: "jpg", quality: 0.9 }}>
                <Pdf
                    source={source}
                    onLoadComplete={(numberOfPages,filePath) => {
                        console.log(`Number of pages: ${numberOfPages}`);
                    }}
                    // onPageChanged={(page,numberOfPages) => {
                    //     console.log(`Current page: ${page}`);
                    // }}
                    onError={(error) => {
                        console.log(error);
                    }}
                    // onPressLink={(uri) => {
                    //     console.log(`Link pressed: ${uri}`);
                    // }}
                    style={styles.pdf}/>
            </ViewShot>
            <View style={styles.borderBar} />
            <View style={[styles.borderBar,{bottom:40}]} />
            <View style={styles.borderBarVertical} />
            <View style={[styles.borderBarVertical,{right:0}]} />
            <Button text={'Scan QR'} onPress={onCapture} />
            <ModalComponent visible={visible} setVisible={setVisible} qrResult={qrResult} setQrResult={setQrResult} />
         </View>
     )
 };

 export default PdfViewSurface;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    },
    borderBar:{
        width : ScreenInfo.SCREEN_WIDTH,
        height : topThickNess,
        backgroundColor : '#ebebeb',
        position : 'absolute',
    },
    borderBarVertical:{
        width : barThickness,
        height : ScreenInfo.SCREEN_HEIGHT,
        backgroundColor : '#ebebeb',
        position : 'absolute',
    }
});