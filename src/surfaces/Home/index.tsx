/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState,useEffect} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import Button from '../../Components/atoms/button';
import AppTheme from '../../Configs/Theme';
import NavKeys from '../../navigation/NavKeys';

import DocumentPicker, {isInProgress,types} from 'react-native-document-picker';
import {launchImageLibrary} from 'react-native-image-picker';
// import {pdf} from 'pdf-to-img';
//   import { fromPath } from "pdf2pic";

import RNPdfToImage from 'react-native-pdf-to-image';
import RNQRGenerator from 'rn-qr-generator';
import ModalComponent from './modal';
import { detectQRFromImg } from '../../utils/qrHelpers';
  

  const pickOptions = {
    presentationStyle: 'fullScreen',
    copyTo: 'cachesDirectory',
  };

  const pdf2picOptions = {
    quality: 100,
    density: 300,
    format: 'png',
    width: 600,
    height: 600,
  };

  const imageOptions = {
    selectionLimit: 1,
    mediaType: 'photo',
    includeBase64: true,
  }

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

    const [documentResult, setDocumentResult]  = useState();
    const [imageResult, setImageResult] = useState();
    const [visible, setVisible] = useState(false);
    const [qrResult, setQrResult] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        documentResult && convertPDFToPic();
    },[documentResult]);

    useEffect(()=>{
        if(imageResult) extractQRFromImg(imageResult.uri);
    },[imageResult]);

    const handleDocumentError = (err: unknown) => {
        if (DocumentPicker.isCancel(err)) {
            console.warn('cancelled')
        } else if (isInProgress(err)) {
            console.warn('multiple pickers were opened, only the last will be considered')
        } else {
            throw err
        }
    }

    const onDocumentPick= async () => {
    try {
        const pickerResult = await DocumentPicker.pickSingle(pickOptions);
        setDocumentResult(pickerResult)
    } catch (e) {
        handleDocumentError(e)
    }
    }

    const onGettingImage = (res) =>{
        res && setImageResult(res.assets[0]);
    }

    const onImagePick = async () => {
    try {
        launchImageLibrary(imageOptions, onGettingImage);
    } catch (e) {
        console.log('error', e);
    }
    }

    const onScannerPick = () => navigate(NavKeys.SCANNER);

    const extractQRFromImg = async (IMG_PATH) => {

        const resp = await detectQRFromImg(IMG_PATH);
        console.log('resp',resp);
        setLoading(true);
        console.log('extractQRFromImg',IMG_PATH)
        RNQRGenerator.detect({ uri: IMG_PATH})
        .then((response) =>  setQrResult(response))
        .catch(error => console.log('Cannot detect QR code in image', error))
        .finally(() => {
            setTimeout(()=>{
                setLoading(false)
            },400)
        });
    }

    const convertPDFToPic = async () => {
        const PATH_TO_QR_CODE = documentResult.uri;
        navigate(NavKeys.PDF_VIEW,{docPath : PATH_TO_QR_CODE});
        console.log('result',PATH_TO_QR_CODE);

    //   const res = await RNPdfToImage.convert(PATH_TO_QR_CODE);
    //   console.log('res',res);

    //   const doc = await pdf(PATH_TO_QR_CODE, {scale: 2.0});
    //   console.log('doc',doc);

    // const res = await RNPdfToImage.convert(result.uri);
    // console.log('res',res);
    //   const base64Response = await fromPath(result.uri, pdf2picOptions)(1,true);
    //   console.log('base64Response',base64Response);
    }
    
    return(
        <View style={styles.container}>
            <Text>Hello Tester !</Text>
            <Text>Pick or scan a QR code</Text>
            <Button style={styles.button} text={'Pick A Document'} onPress={onDocumentPick} />
            <Button style={styles.button} text={'Pick A QR Image'} onPress={onImagePick} />
            {/* <Button style={styles.button} text={'Open QR Scanner'} onPress={onScannerPick} /> */}
            <ModalComponent visible={visible} setVisible={setVisible} qrResult={qrResult} setQrResult={setQrResult} />
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