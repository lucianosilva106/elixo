import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

function TransacoesPDF(transacoes){

    alert('estou aqui')

    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const reportTitle=[
        {
            text: 'Transacoes',
            fontSize: 15,
            bold: true,
            margin: [15, 20, 0, 45] //left, top, right, bootom
        }
    ];

    const dados = transacoes.map((transacao) => {
        return[
            {text: transacao.data, fontSize: 10, width: 40},
            {text: transacao.descprod, fontSize: 10, width: 40},
            {text: transacao.valortotal, fontSize: 10, width: 40},
            {text: transacao.percentualcomissao, fontSize: 10, width: 40},
            {text: transacao.valorcomissao, fontSize: 10, width: 40}
        ]
    })

    const details=[
        {
            table:{
                headerRows: 1,
                widths: ['*','*','*','*','*'],
//                widths: ['auto','auto','auto','auto','auto'],
                body: [
                    [
                        {text: 'Data', fontSize: 10, width: 40},
                        {text: 'Produto', fontSize: 10, width: 40},
                        {text: 'Valor Total', fontSize: 10, width: 40},
                        {text: 'Perc comissao', fontSize: 10, width: 40},
                        {text: 'Valor Comissao', fontSize: 10, width: 40},
                    ],
                    ...dados
                ]
                
            },
            content: [
            { text: 'Valor Total da comissao:', fontSize: 12},
            ],
            layout: 'headerLineOnly'
        }
    ];

    function Rodape(currentPage, pageCount){
        return(
            {
                text: currentPage + ' / ' + pageCount,
                alignment: 'right',
                fontSize: 9,
                margin: [0, 10, 0, 0]
            }
        )
    }

    const docDefinitions = {
        pageSize: 'A4',
        pageOrientation: 'portrait',
        pageMargins: [5,10,0,10], //left, top, right, bootom
        header: [reportTitle],
        content: [details],
        footer: Rodape


    }

    pdfMake.createPdf(docDefinitions).download();

}

export default TransacoesPDF;