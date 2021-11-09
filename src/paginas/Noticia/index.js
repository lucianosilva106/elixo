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

function Noticia() {

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

  const [noticias, setNoticias] = useState([]);
  
  function handleToogle(id) {
    const lista = noticias.map(item => {
      if (item.id === id) item.isOpen = !item.isOpen
      return item
    })
    setNoticias(lista)
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
    async function loadNoticias() {
      await firebase.firestore().collection('noticias')
        .onSnapshot((doc) => {
          let minhasNoticias = [];
          doc.forEach((item) => {
            minhasNoticias.push({
              id: item.id,
              titulo: item.data().titulo,
              descricao: item.data().descricao,
              data: item.data().data,
              autor: item.data().autor,
              tag: item.data().tag,
              link: item.data().link
            })
          })

          setNoticias(minhasNoticias);
        })
    }

    loadNoticias();

  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Container fixed id="topo"
      sx={{height: 150, marginTop: 6}}>
        <Typography variant="h3" gutterBottom component="div" align="center">
          Noticias

        </Typography>
      </Container>
      <Container fixed>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead sx={{ color: 'primary' }}>
              <TableRow>
                <TableCell align="center">Titulo</TableCell>
                <TableCell align="center">Descricao</TableCell>
                <TableCell align="center">Data</TableCell>
                <TableCell align="center">Autor</TableCell>
                <TableCell align="center">Tag</TableCell>
                <TableCell align="center">Link</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {noticias.map((noticia) => {
                return (
                  <TableRow key={noticia.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">{noticia.titulo}</TableCell>
                    <TableCell align="center">{noticia.descricao}</TableCell>
                    <TableCell align="center">{noticia.data}</TableCell>
                    <TableCell align="center">{noticia.autor}</TableCell>
                    <TableCell align="center">{noticia.tag}</TableCell>
                    <TableCell align="center" class="clickable-row" data-href='{noticia.link}'>{noticia.link}</TableCell>
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

export default Noticia;