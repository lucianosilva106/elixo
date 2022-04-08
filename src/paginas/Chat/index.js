import firebase from '../../firebaseConnection';
import * as React from 'react';
import { useEffect, useState } from 'react';
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
import { green } from '@material-ui/core/colors';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Stack from '@material-ui/core/Stack'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/core/Alert';
import { Input, Typography } from '@material-ui/core';
import { TextField } from "@material-ui/core";
import './chat.css';

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

export default function Chat({prodToChat}) {

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [abrir, setAbrir] = React.useState(false);
  const abrirAlert = () => {
    setAbrir(true);
  };

  const [open, setOpen, excluiu] = React.useState(false);

  var userlog = '';

  async function checkLogin() {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
          userlog = user;
      } else {
        firebase.auth().signOut();
        localStorage.clear();
        window.location.href = '/login';
      }
    })
  }

  checkLogin();

  const [chats, setChats] = useState([]);
  const [mensagem, setMensagem] = useState('');
  const [idproduto, setIdproduto] = useState('');
  const [idcomprador, setIdcomprador] = useState('');
  const [msgcomprador, setMsgcomprador] = useState('');
  const [datahoramsg, setDatahoramsg] = useState(0);
  const [negociofechado, setNegociofechado] = useState('');
  
  function handleToogle(id) {
    const lista = chats.map(item => {
      if (item.id === id) item.isOpen = !item.isOpen
      return item
    })
    setChats(lista)
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
    async function loadChats() {
      await firebase.firestore().collection('chats')
        .onSnapshot((doc) => {
          let meusChats = [];
          doc.forEach((item) => {
            meusChats.push({
              idproduto: item.data().idproduto,
              idcomprador: item.data().idcomprador,
              msgcomprador: item.data().msgcomprador,
              datahoramsg: item.data().datahoramsg,
              negociofechado: item.data().negociofechado
            })
          })

          setChats(meusChats);
        })
    }

    loadChats();

  }, [])

  async function addMensagem(){
    await firebase.firestore().collection('chats')
    .add({
      idproduto: idproduto,
      idcomprador: userlog,
      msgcomprador: mensagem,
      datahoramsg: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(()=>{
     alert('gravou')
      handleClick();
      setIdproduto('');
      setIdcomprador('');
      setMsgcomprador('');
      setDatahoramsg('');
      buscaChats();
    })
    .catch((error)=>{ 
      alert(error);
      console.log('ERRO: ' + error);
    })
  }

  async function buscaChats(){
    await firebase.firestore().collection('chats')
    .get()
    .then((snapshot) => {
      let lista = [];

      snapshot.forEach((doc) => {
        lista.push({
            idproduto: doc.data().idproduto,
            msgcomprador: doc.data().msgcomprador,
            datahoramsg: doc.data().datahoramsg,
            negociofechado: doc.data().negociofechado
        })
      })
      setChats(lista);

    })
    .catch(() => {

    })
  }

  return (
    <ThemeProvider theme={theme}>
      <Container fixed>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead sx={{ color: 'primary' }}>
              <TableRow>
                <TableCell align="center">Data e Hora</TableCell>
                <TableCell align="center">Mensagem Comprador</TableCell>
                <TableCell align="center">Mensagem Vendedor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {chats.map((chat) => {
                  var a = new Date(chat.datahoramsg * 1000);
                  var months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
                  // Hours part from the timestamp
                  var dia = a.getDay();
                  var mes = months[a.getMonth()];
                  var ano = a.getFullYear() - 1969; 
                  var date = a.getDate();
                  var hours = a.getHours();
                  // Minutes part from the timestamp
                  var minutes = a.getMinutes();
                  // Seconds part from the timestamp
                  var seconds = a.getSeconds();
                  // Will display time in 10:30:23 format
                  var formattedDateTime = date + '/' + mes + '/' + ano + '-' + hours + ':' + minutes + ':' + seconds;
                return (
                  <TableRow key={chat.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="center">{formattedDateTime}</TableCell>
                    <TableCell align="center">{chat.msgcomprador}</TableCell>
                    <TableCell align="center">{chat.msgvendedor}</TableCell>
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
