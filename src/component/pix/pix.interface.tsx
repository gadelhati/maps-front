export interface Pix {
    calendario: {
        criacao: Date,
        apresentacao: Date,
        expiracao: number
    },
    devedor?: {
        cpf?: string,
        cnpj?: string,
        nome?: string,
    },
    txid?: string,
    revisao: number,
    status: string,
    valor: {
        original: number,
        abatimento: number,
        desconto: number,
        juros: number,
        multa: number,
        final: number,
        modalidadeAlteracao: number,
    },
    chave: string,
    solicitacaoPagador: string,
    infoAdicionais: [
        {
            nome: string,
            valor: number
        }
    ]
}