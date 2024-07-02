export interface pixValue {
    id: string,
    value: string
}

export interface Pix {
    payloadFormatIndicator: pixValue,
    merchantAccountInformation: {
        id: '26',
        GUI: pixValue,
        chave: pixValue,
    },
    merchantCategoryCode: pixValue,
    transactionCurrency: pixValue,
    transactionAmount: pixValue,
    countryCode: pixValue,
    merchantName: pixValue,
    merchantCity: pixValue,
    additionalDataFieldTemplate: pixValue,
    CRC16: '6304'
}

export const initialPix : Pix = {
    payloadFormatIndicator: {id:'00', value: '01'},
    merchantAccountInformation: {
        id: '26',
        GUI: { id: '00', value: 'br.gov.bcb.pix' },
        chave: { id: '01', value: 'gadelha.ti@gmail.com' },
    },
    merchantCategoryCode: { id: '52', value: '0000' },
    transactionCurrency: { id: '53', value: '986' },
    transactionAmount: { id: '54', value: '0.01' },
    countryCode: {id:'58', value: 'BR'},
    merchantName: {id: '59', value: 'MARCELO RIBEIRO GADELHA' },
    merchantCity: {id: '60', value: 'RIO DE JANEIRO' },
    additionalDataFieldTemplate: { id: '62', value: '0503***' },
    CRC16: '6304',
}