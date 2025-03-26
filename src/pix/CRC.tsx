import { Pix, pixValue } from "./pix";

export const crc16 = (data: any) => {
    let crc = 0xFFFF;
    const polynomial = 0x1021;
    for (let i = 0; i < data.length; i++) {
        const byte = data.charCodeAt(i);
        crc ^= byte << 8;
        for (let j = 0; j < 8; j++) {
            if ((crc & 0x8000) !== 0) {
                crc = (crc << 1) ^ polynomial;
            } else {
                crc <<= 1;
            }
        }
        crc &= 0xFFFF;
    }
    return crc.toString(16).toUpperCase().padStart(4, '0');
}

export const payload = (pix: Pix): string => {
    return fillAll(pix.payloadFormatIndicator) +
        pix.merchantAccountInformation.id +  (fillAll(pix.merchantAccountInformation.GUI) + fillAll(pix.merchantAccountInformation.chave)).length +
        fillAll(pix.merchantAccountInformation.GUI) +
        fillAll(pix.merchantAccountInformation.chave) +
        fillAll(pix.merchantCategoryCode) +
        fillAll(pix.transactionCurrency) +
        fillAll(pix.transactionAmount) +
        fillAll(pix.countryCode) +
        fillAll(pix.merchantName) +
        fillAll(pix.merchantCity) +
        fillAll(pix.additionalDataFieldTemplate) +
        '6304'
}
const fillAll = (element: pixValue):string => {
    return element.id + (element.value.length < 10 ? '0' + element.value.length : element.value.length ) + element.value
}