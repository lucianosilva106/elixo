import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

function ProdutosPDF(produtos){

    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const reportTitle=[
        {
            text: 'Produtos',
            fontSize: 15,
            bold: true,
            margin: [15, 20, 0, 45] //left, top, right, bootom
        }
    ];

    const dados = produtos.map((produto) => {
        return[
            {text: produto.descricao, fontSize: 10, margin: [0, 2, 0, 2]},
            {text: produto.info, fontSize: 10, margin: [0, 2, 0, 2]},
            {text: produto.preco, fontSize: 10, margin: [0, 2, 0, 2]}
        ]
    })

    const details=[
        {
            table:{
                headerRows: 1,
                widths: ['*','*','*','*'],
                body: [
                    [
                        {text: 'Descricao', style: 'tableHeader', fontSize: 10},
                        {text: 'Informacoes', style: 'tableHeader', fontSize: 10},
                        {text: 'Preco', style: 'tableHeader', fontSize: 10},
                    ],
                    ...dados
                ]
                
            },
            layout: 'headerLineOnly'
        }
    ];

    function Rodape(currentPage, pageCount){
        return(
            {
                text: currentPage + ' / ' + pageCount,
                alignment: 'right',
                fontSize: 9,
                margin: [0, 10, 20, 0]
            }
        )
    }

    const docDefinitions = {
        pageSize: 'A4',
        pageMargins: [15,50,15,40],
        header: [reportTitle],
        content: [details],
        footer: Rodape


    }

    pdfMake.createPdf(docDefinitions).download();

}

export default ProdutosPDF;