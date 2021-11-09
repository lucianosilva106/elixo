import React from 'react';
import { useState, useEffect } from 'react';
import firebase from "../../firebaseConnection";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MuiAlert from '@material-ui/core/Alert';
import { green } from '@material-ui/core/colors';
import Slide from '@material-ui/core/Slide';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import './admaval.css';

const theme = createTheme({
    palette: {
      primary: {
        main: '#fff',
      },
      secondary: {
        main: green[500],
      },
    },
  });

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
  

function AdmAvaliacao() {

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });

    const [pergunta1, setPergunta1] = useState('');
    const [resposta1, setResposta1] = useState(0);
    const [resposta2, setResposta2] = useState(0);
    const [resposta3, setResposta3] = useState(0);
    const [resposta4, setResposta4] = useState(0);
 
    const [mensagens, setMensagens] = useState([]);

    useEffect(() => {
        function loadAvaliacoes(id){
            firebase.firestore().collection('avaliacoes').doc(id)
            .onSnapshot((doc) => {
                setPergunta1(doc.data().pergunta1);
                setResposta1(doc.data().resposta1);
                setResposta2(doc.data().resposta2);
                setResposta3(doc.data().resposta3);
                setResposta4(doc.data().resposta4);
                })
            }
        loadAvaliacoes('0rF3cVgRBbFFQY5LSWD5');

        async function loadMensagens() {
            await firebase.firestore().collection('mensagens')
              .onSnapshot((doc) => {
                let minhasMensagens = [];
                doc.forEach((item) => {
                  minhasMensagens.push({
                    avaliacao: item.data().avaliacao,
                    datamensagem: item.data().datamensagem,
                    email: item.data().email,
                    mensagem: item.data().mensagem
                  })
                })
      
                setMensagens(minhasMensagens);
              })
          }
      
          loadMensagens();
      

    }, [])        
 
    const data = [
        {pergunta: 'Ruim', resposta: resposta1},
        {pergunta: 'Razoável', resposta: resposta2},
        {pergunta: 'Boa', resposta: resposta3},
        {pergunta: 'Otima', resposta: resposta4}
    ];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active) {
            return (
                <div className="custom-tooltip">
                    <p className="pergunta">{`${payload[0].value}`}</p>
                </div>
            );
        }
    
        return null;
    };
   
    
    return (
        <div align="center">
            <h2>Resultado das avaliações do site</h2>
            <h3>{pergunta1}</h3>
            <BarChart width={700} height={400} data={data}>
                <Bar dataKey="resposta" fill="green" stroke="green" barSize={100}/>
                <XAxis dataKey="pergunta" stroke="green"/>
                <YAxis stroke="green"/>
                <Tooltip content={<CustomTooltip />}/>
            </BarChart>
            <br/>
            <ThemeProvider theme={theme}>
                <h3>Mensagens enviadas</h3>
                <Container fixed>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead sx={{ color: 'primary' }}>
                                <TableRow>
                                    <TableCell align="center">Data</TableCell>
                                    <TableCell align="center">Avaliacao</TableCell>
                                    <TableCell align="center">Email</TableCell>
                                    <TableCell align="center">Mensagem</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {mensagens.map((mensagem) => {
                                    return (
                                    <TableRow key={mensagem.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">{mensagem.datamensagem}</TableCell>
                                        <TableCell align="center">{mensagem.avaliacao}</TableCell>
                                        <TableCell align="center">{mensagem.email}</TableCell>
                                        <TableCell align="center">{mensagem.mensagem}</TableCell>
                                    </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </ThemeProvider>
        </div>
    );
}
    
export default AdmAvaliacao;