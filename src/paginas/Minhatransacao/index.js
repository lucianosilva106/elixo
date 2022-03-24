import firebase from '../../firebaseConnection';
import 'firebase/auth';
import { useEffect, useState } from 'react';
import * as React from 'react';
import Table from '@material-ui/core/Table';
import reactTable from 'react-table';
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
import './mtransac.css';

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

function Minhatransacao() {

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [abrir, setAbrir] = React.useState(false);
  const abrirAlert = () => {
    setAbrir(true);
  };

  const [open, setOpen] = useState(false);
  const [idcliente, setIdcliente] = useState('');
  var userlog = "";

  async function checkLogin() {
    await firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
          userlog = user.uid;
      } else {
        firebase.auth().signOut();
        localStorage.clear();
        window.location.href = '/login';
      }
    })
  }

  checkLogin();
 

  const [vendas, setVendas] = useState([]);
  const [vendaprodutos, setVendaprodutos] = useState([]);
  
  function handleToogle(id) {
    const lista = vendas.map(item => {
      if (item.id === id) item.isOpen = !item.isOpen
      return item
    })
    setVendas(lista)
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
    async function loadVendas() {
      await firebase.firestore().collection('vendas')
        .onSnapshot((doc) => {
          let minhasVendas = [];
          doc.forEach((item) => {
            if (item.data().idusuario == userlog){
                minhasVendas.push({
                    id: item.id,
                    datavenda: item.data().datavenda,
                    valortotal: item.data().valortotal
                })
            }
          })

          setVendas(minhasVendas);
        })
    }

    loadVendas();

  }, [])

  const [idclick, setIdClick] = useState('');

  async function loadDetalhes(idVenda) {
    await firebase.firestore().collection('vendaprodutos')
      .onSnapshot((doc) => {
        let minhasVendaprodutos = [];
        doc.forEach((item) => {
          if (item.data().idvenda == idVenda){
              minhasVendaprodutos.push({
                  id: item.id,
                  idproduto: item.data().idproduto,
                  descprod: item.data().descprod,
                  info: item.data().info,
                  valor: item.data().valor
              })
          }
        })

        setVendaprodutos(minhasVendaprodutos);
      })
  }

  function visualizaVenda(id){
    if (open == false)
    {
      handleClick();
      setIdClick(id);
      loadDetalhes(id)
    }
    else
      setOpen(false)
  }

  return (
    <ThemeProvider theme={theme}>
      <Container fixed id="topo"
      sx={{height: 150, marginTop: 6}}>
        <Typography variant="h3" gutterBottom component="div" align="center">
          Minhas compras e vendas realizadas

        </Typography>
      </Container>
      <Container fixed>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead sx={{ color: 'primary' }}>
              <TableRow>
                <TableCell align="center">Data</TableCell>
                <TableCell align="center">Valor Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vendas.map((venda) => {
                return (
                  <TableRow key={venda.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">{venda.datavenda}</TableCell>
                    <TableCell align="center">{venda.valortotal}</TableCell>
                    <Button variant="outlined" startIcon={<DeleteIcon />} 
                      onClick={() => visualizaVenda(venda.id)}
                      sx={{ margin: 1 }}
                      color="secondary">Detalhes</Button>
                    {open && venda.id == idclick && 
                       <TableHead sx={{ color: 'primary' }}>
                         <TableRow>
                           <TableCell align="center">Produto</TableCell>
                           <TableCell align="center">Informações</TableCell>
                           <TableCell align="center">Valor do Produto</TableCell>
                         </TableRow>
                       </TableHead>
                    }
                    {open && venda.id == idclick &&
                      vendaprodutos.map((vendaproduto) => {
                        return (
                          <TableRow key={vendaproduto.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">{vendaproduto.descprod}</TableCell>
                            <TableCell align="center">{vendaproduto.info}</TableCell>
                            <TableCell align="center">{vendaproduto.valor}</TableCell>
                          </TableRow>
                        )
                      })
                      
                    }
                  </TableRow>
                 )
               })
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
}

export default Minhatransacao;