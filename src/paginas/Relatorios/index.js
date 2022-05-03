import firebase from '../../firebaseConnection';
import 'firebase/auth';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { TextField } from "@material-ui/core";
import { orange, green } from '@material-ui/core/colors';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { InputLabel } from "@material-ui/core";
import Stack from '@material-ui/core/Stack'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/core/Alert';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Container from '@material-ui/core/Container';
import DeleteIcon from '@material-ui/icons/Delete';
import { Typography } from '@material-ui/core';
//import Slide from '@material-ui/core/Slide';
//import './admprod.css'

const theme = createTheme({
  palette: {
    primary: {
      main: green[500],
    },
    secondary: {
      main: orange[500],
    },
  },
});


function Relatorios() {

    async function checkLogin(){
      await firebase.auth().onAuthStateChanged((user) => {
        if(user){
          }else{
            firebase.auth().signOut();
            localStorage.clear();
            window.location.href = '/login';
        }
      })
    }

    checkLogin();

    const menuRel = [{nome: "Relatório de Clientes", descricao: "Esse relatorio lista...."},
                     {nome: "Relatório de Vendas", descricao: "Esse lista as vendas"}
                    ];


    const[dadosParaImpressao, setDadosParaImpressao] = useState([]);

    async function loadProdutos(){
        await firebase.firestore().collection('produtos')
        .onSnapshot((doc) => {
          let meusProdutos = [];
          doc.forEach((item) => {
            meusProdutos.push({
              id: item.id,
              descricao: item.data().descricao,
              preco: item.data().preco,
              pathimagem: item.data().pathimagem,
              info: item.data().info,
              percentual: item.percentual
            })
          })

          setDadosParaImpressao(meusProdutos);
        })
    }

    loadProdutos();

    function GerarDocumento(){
      alert('vai gerar')
    }

   
    return (
      <ThemeProvider theme={theme}>
        <br />

        <ThemeProvider theme={theme}>
          <Container fixed id="topo"
            sx={{height: 150, marginTop: 6}}>
            <Typography variant="h3" gutterBottom component="div" align="center">
              Relatórios
            </Typography>
          </Container>
          <Container fixed>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead sx={{ color: 'primary' }}>
                  <TableRow>
                    <TableCell align="center">Relatório</TableCell>
                    <TableCell align="center">Informações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {menuRel.map((relatorio) => {
                    return (
                      <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">{relatorio.nome}</TableCell>
                        <TableCell align="center">{relatorio.descricao}</TableCell>
                        <Button
                          variant="outlined" startIcon={<DeleteIcon />}
                          onClick={() => GerarDocumento()}
                          sx={{ margin: 1 }}
                          color="secondary">Gerar</Button>                       
                      </TableRow>
                    )
                  })}
               </TableBody>
              </Table>
            </TableContainer>

          </Container>

        </ThemeProvider>

      </ThemeProvider>
    );
}
  
export default Relatorios;