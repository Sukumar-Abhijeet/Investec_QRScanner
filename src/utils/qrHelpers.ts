
import RNQRGenerator from 'rn-qr-generator';

export  const detectQRFromImg = async (IMG_PATH , isBase64) => {
    console.log('extractQRFromImg',IMG_PATH)
    const base64Form = {base64 : IMG_PATH};
    return await RNQRGenerator.detect(isBase64 ? base64Form : { uri: IMG_PATH})
}