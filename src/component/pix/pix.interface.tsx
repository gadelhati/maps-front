export interface Pix {
    calendario: {
        criacao: Date,
        apresentacao: Date,
        expiracao: number
    },
    txid?: string,
    revisao: number,
    status: string,
    valor: {
        original: number,
        modalidadeAlteracao: number
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