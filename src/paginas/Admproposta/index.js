import firebase from '../../firebaseConnection';
import 'firebase/auth';
import { useEffect, useState } from 'react';
import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Container from '@material-ui/core/Container';
import DeleteIcon from '@material-ui/icons/Delete';
import { green } from '@material-ui/core/colors';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Stack from '@material-ui/core/Stack'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/core/Alert';
import { Typography } from '@material-ui/core';
import './admprop.css';
import Postocoleta from '../Postocoleta';

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

function Admproposta() {

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [abrir, setAbrir] = React.useState(false);
  const abrirAlert = () => {
    setAbrir(true);
  };

  const [open, setOpen, excluiu] = React.useState(false);

  async function checkLogin() {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
      } else {
        firebase.auth().signOut();
        localStorage.clear();
        window.location.href = '/login';
      }
    })
  }

  checkLogin();

  const [propostas, setPropostas] = useState([]);
  
  function handleToogle(id) {
    const lista = propostas.map(item => {
      if (item.id === id) item.isOpen = !item.isOpen
      return item
    })
    setPropostas(lista)
  }

  const handleClick = (id) => {
    setOpen(true);
    return handleToogle(id)
  };

  const handleClose = (id) => {
    setOpen(false);
    return handleToogle(id)
  };

  useEffect(() => {
    async function loadPropostas() {
      await firebase.firestore().collection('propostas')
        .onSnapshot((doc) => {
          let minhasPropostas = [];
          doc.forEach((item) => {
            minhasPropostas.push({
              id: item.id,
              nome: item.data().nome,
              cep: item.data().cep,
              endereco: item.data().endereco,
              bairro: item.data().bairro,
              cidade: item.data().cidade,
              estado: item.data().estado,
              tipolixo: item.data().tipolixo,
              mensagem: item.data().mensagem
            })
          })

          setPropostas(minhasPropostas);
        })
    }

    loadPropostas();

  }, [])

  async function excluirProposta(id) {
    await firebase.firestore().collection('propostas').doc(id)
      .delete()
      .then(() => {
        alert('Solicitação excluída com sucesso!')
      })

  }

  return (
    <ThemeProvider theme={theme}>
      <Container fixed id="topo"
      sx={{height: 150, marginTop: 6}}>
        <Typography variant="h3" gutterBottom component="div" align="center">
          Interessados em tornar-se postos de coleta

        </Typography>
      </Container>
      <Container fixed>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead sx={{ color: 'primary' }}>
              <TableRow>
                <TableCell align="center">Nome</TableCell>
                <TableCell align="center">Cep</TableCell>
                <TableCell align="center">Endereço</TableCell>
                <TableCell align="center">Bairro</TableCell>
                <TableCell align="center">Cidade</TableCell>
                <TableCell align="center">Estado</TableCell>
                <TableCell align="center">Mensagem</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {propostas.map((proposta) => {
                return (
                  <TableRow key={proposta.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">{proposta.nome}</TableCell>
                    <TableCell align="center">{proposta.cep}</TableCell>
                    <TableCell align="center">{proposta.endereco}</TableCell>
                    <TableCell align="center">{proposta.bairro}</TableCell>
                    <TableCell align="center">{proposta.cidade}</TableCell>
                    <TableCell align="center">{proposta.estado}</TableCell>
                    <TableCell align="center">{proposta.mensagem}</TableCell>
                    <Button variant="outlined" startIcon={<DeleteIcon />} 
                      onClick={() => excluirProposta(proposta.id)}
                      sx={{ margin: 1 }}
                      color="secondary">Remover</Button>
                  </TableRow>
              )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
}

export default Admproposta;