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
import Slide from '@material-ui/core/Slide';
import Container from '@material-ui/core/Container';
import DeleteIcon from '@material-ui/icons/Delete';
import { green } from '@material-ui/core/colors';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Stack from '@material-ui/core/Stack'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/core/Alert';
import { Typography } from '@material-ui/core';
import './admapro.css';

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

function Admaprovacao() {

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [abrir, setAbrir] = React.useState(false);
  const abrirAlert = () => {
    setAbrir(true);
  };

  const [open, setOpen, excluiu] = React.useState(false);
  const [openaprovado, setOpenaprovado] = React.useState(false);

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

  const [produtos, setProdutos] = useState([]);
  const [aprovado, setAprovado] = useState('');
  
  function handleToogle(id) {
    const lista = produtos.map(item => {
      if (item.id === id) item.isOpen = !item.isOpen
      return item
    })
    setProdutos(lista)
  }

  const handleClick = (id) => {
    setOpen(true);
    setOpenaprovado(true);
    return handleToogle(id)
  };

  const handleClickAprov = (id) => {
    setOpenaprovado(true);
    return handleToogle(id)
  };


  const handleClose = (id) => {
    setOpen(false);
    return handleToogle(id)
  };

  useEffect(() => {
    async function loadProdutos() {
      await firebase.firestore().collection('produtos')
        .onSnapshot((doc) => {
          let meusProdutos = [];
          doc.forEach((item) => {
            if (item.data().aprovado == false)
            {
              meusProdutos.push({
                id: item.id,
                descricao: item.data().descricao,
                info: item.data().info,
                preco: item.data().preco,
              })
            }
          })

          setProdutos(meusProdutos);
        })
    }

    loadProdutos();

  }, [])

  async function excluirProduto(id) {
    await firebase.firestore().collection('produtos').doc(id)
      .delete()
      .then(() => {
        handleClick();
      })
  }

  async function aprovarProduto(id) {
    await firebase.firestore().collection('produtos').doc(id)
      .update({
          aprovado: true
      })
      .then(() => {
            handleClickAprov();
      })
      .catch((error) =>{
          alert('Erro ao aprovar produto: ' + error)
      })
  }

  return (
    <ThemeProvider theme={theme}>
      <Container fixed id="topo"
      sx={{height: 150, marginTop: 6}}>
        <Typography variant="h4" gutterBottom component="div" align="center">
          Produtos para aprovação cadastral e liberação para a LOJA.

        </Typography>
      </Container>
      <Container fixed>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead sx={{ color: 'primary' }}>
              <TableRow>
                <TableCell align="center">Imagem</TableCell>
                <TableCell align="center">Descricao</TableCell>
                <TableCell align="center">Informações</TableCell>
                <TableCell align="center">Preço</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {produtos.map((produto) => {
                return (
                  <TableRow key={produto.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell><img src={produto.pathimagem} height="60" width="80" /></TableCell>
                    <TableCell component="th" scope="row">{produto.descricao}</TableCell>
                    <TableCell align="center">{produto.info}</TableCell>
                    <TableCell align="center">{produto.valor}</TableCell>
                    <Button variant="outlined" startIcon={<DeleteIcon />} 
                      onClick={() => aprovarProduto(produto.id)}
                      sx={{ margin: 1 }}
                      color="secondary">Aprovar</Button>
                    <Button variant="outlined" startIcon={<DeleteIcon />} 
                      onClick={() => excluirProduto(produto.id)}
                      sx={{ margin: 1 }}
                      color="secondary">Remover</Button>
                  </TableRow>
              )
              })}
            </TableBody>

            <Stack spacing={2} sx={{ width: '100%' }}>
              <Snackbar open={openaprovado} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                  Produto aprovado com sucesso!
                </Alert>
              </Snackbar>
            </Stack>

            <Stack spacing={2} sx={{ width: '100%' }}>
              <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                  Produto excluído com sucesso!
                </Alert>
              </Snackbar>
            </Stack>
          </Table>
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
}

export default Admaprovacao;