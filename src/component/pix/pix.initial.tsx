import { Pix } from "./pix.interface";

export const initialPix: Pix = {
    calendario: {
        criacao: new Date("2020-09-15T19:39:54.013Z"),
        apresentacao: new Date("2020-04-01T18:00:00Z"),
        expiracao: 3600
    },
    txid: "fc9a4366ff3d4964b5dbc6c91a8722d3",
    revisao: 3,
    status: "ATIVA",
    valor: {
        original: 500.00,
        modalidadeAlteracao: 0
    },
    chave: "7407c9c8-f78b-11ea-adc1-0242ac120002",
    solicitacaoPagador: "Informar cartao fidelidade",
    infoAdicionais: [
        {
            nome: "quantidade",
            valor: 2
      }
    ]
}