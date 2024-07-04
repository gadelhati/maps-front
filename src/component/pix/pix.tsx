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
        chave: { id: '01', value: '02755107600' },
    },
    merchantCategoryCode: { id: '52', value: '0000' },
    transactionCurrency: { id: '53', value: '986' },
    transactionAmount: { id: '54', value: '0.01' },
    countryCode: {id:'58', value: 'BR'},
    merchantName: {id: '59', value: 'ANDREA LUCIANA PAIVA' },
    merchantCity: {id: '60', value: 'RIO DE JANEIRO' },
    additionalDataFieldTemplate: { id: '62', value: '0503***' },
    CRC16: '6304',
}

// CPF 	^[0-9]{11}$ 	12345678901 	
// CNPJ 	^[0-9]{14}$ 	12345678901234 	
// PHONE 	^\+[1-9]\d{1,14}$ 	+5510998765432 	
// EMAIL 	^[a-z0-9.!#$&'*+\/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$ 	pix@bcb.gov.br 	E-mail deve possuir no máximo 77 caracteres e deve ser em minúsculo

// automatizar a emissão de cobranças
// verificar Pix recebidos
// fazer a devolução e conciliação