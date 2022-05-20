import firebase from '../../firebaseConnection';
import 'firebase/auth';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import {
  TextField, Tab, Tabs, Avatar, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle
} from "@material-ui/core";
import PropTypes from 'prop-types';
import { orange, green, grey } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
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
import EditIcon from '@material-ui/icons/Edit';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import ChatIcon from '@material-ui/icons/Chat';
import { Typography } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import ProdutosPDF from '../Relatorios/Produtos/index';
import ChatPage from '../ChatPage';
import './admprod.css'

const theme = createTheme({
  palette: {
    primary: {
      main: green[500],
    },
    secondary: {
      main: orange[500],
    },
    textos: {
      main: grey[800],
    },
  },
});

theme.typography.h1 = {
  fontSize: '1.7rem',
  '@media (min-width:600px)': {
    fontSize: '1.9rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.5rem',
  },
};
theme.typography.h5 = {
  fontSize: '1.1rem',
  '@media (min-width:600px)': {
    fontSize: '1.3rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.4rem',
  },
};
theme.typography.h6 = {
  fontSize: '1.1rem',
  '@media (min-width:600px)': {
    fontSize: '1.3rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.2rem',
  },
};
theme.typography.h2 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.6rem',
  },
};
theme.typography.p = {
  fontSize: '0.8rem',
  '@media (min-width:600px)': {
    fontSize: '0.9rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1rem',
  },
};


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Admproduto() {


  const [dialogo, setDialogo] = React.useState(false);

  const OpenDialogo = () => {
    setDialogo(true);
  };

  const FechaDialogo = () => {
    setDialogo(false);
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [userid, setUserid] = useState('');
  async function checkLogin() {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserid(user.uid);
      } else {
        firebase.auth().signOut();
        localStorage.clear();
        window.location.href = '/login';
      }
    })
  }

  checkLogin();

  const [idProduto, setIdProduto] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [pathimagem, setPathimagem] = useState('');
  const [info, setInfo] = useState('');
  const [percentual, setPercentual] = useState('');
  const [produtos, setProdutos] = useState([]);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [open, setOpen, aberto] = React.useState(false);
  const [excluir, setExcluir] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleExcluir = () => {
    setExcluir(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    async function loadProdutos() {
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

          setProdutos(meusProdutos);
        })
    }

    loadProdutos();

  }, [])

  async function handleAdd() {
    await firebase.firestore().collection('produtos')
      .add({
        descricao: descricao,
        info: info,
        preco: preco,
        pathimagem: pathimagem,
        percentual: percentual
      })
      .then(() => {
        handleClick();
        setDescricao('');
        setInfo('');
        setPreco('');
        setPathimagem('');
        setPercentual('');
        buscaProdutos();
      })
      .catch((error) => {
        alert(error);
        console.log('ERRO: ' + error);
      })
  }

  async function buscaProdutos() {
    await firebase.firestore().collection('produtos')
      .get()
      .then((snapshot) => {
        let lista = [];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            descricao: doc.data().descricao,
            preco: doc.data().preco,
            pathimagem: doc.data().pathimagem,
            info: doc.data().info,
            percentual: doc.data().percentual
          })
        })
        setProdutos(lista);

      })
      .catch(() => {

      })
  }

  async function editarProduto() {
    await firebase.firestore().collection('produtos')
      .doc(idProduto)
      .update({
        descricao: descricao,
        info: info,
        preco: preco,
        pathimagem: pathimagem,
        percentual: percentual
      })
      .then(() => {
        alert('DADOS ATUALIZADOS COM SUCESSO!')
        setIdProduto('');
        setDescricao('');
        setInfo('');
        setPreco('');
        setPathimagem('');
        setPercentual('');
        buscaProdutos();
      })
      .catch((error) => {
        alert("Erro ao gravar alteração: " + error)
      })
  }

  function pegaProduto(id) {
    firebase.firestore().collection('produtos')
      .doc(id)
      .onSnapshot((doc) => {
        setIdProduto(id);
        setDescricao(doc.data().descricao);
        setInfo(doc.data().info);
        setPreco(doc.data().preco);
        setPathimagem(doc.data().pathimagem);
        setPercentual(doc.data().percentual);
      })
  }

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <ThemeProvider theme={theme}>
      <br />

      <ThemeProvider theme={theme}>

        <Box
          sx={{
            bgcolor: '#fafafa',
            pt: 8,
            pb: 10,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h1"
              align="center"
              gutterBottom
              sx={{ color: 'primary.main' }}
            >
              Produtos cadastrados
            </Typography>
            <Typography variant="h2" align="center" color="text.secondary" paragraph>
              Itens cadastrados para venda na plataforma.
            </Typography>
          </Container>
        </Box>



        <Container maxWidth="lg">

          <Paper elevation={1}
            sx={{
              minHeight: 'auto',
              alignItems: 'center',
              alignContent: 'center',
              justifyContent: 'center',
              textAlign: 'center'
            }}></Paper>

          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Produtos" {...a11yProps(0)} />
            </Tabs>
          </Box>

          <TabPanel value={value} index={0}>

            <Container fixed>

              <Button variant="contained" disableElevation startIcon={<PictureAsPdfIcon />}
                sx={{ color: 'white' }}
                color="primary" onClick={(e) => ProdutosPDF(produtos)}>Gera relatório</Button>

              <TableContainer sx={{ marginTop: 2 }} component={Paper}>
                <Table sx={{ minWidth: 550 }} size="small" aria-label="a dense table">
                  <TableHead sx={{ color: 'primary', bgcolor: '#fafafa' }}>
                    <TableRow sx={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                      <TableCell sx={{ visibility: 'hidden' }} align="center">Imagem</TableCell>
                      <TableCell align="center">
                        <Typography variant='h6'>Produto</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant='h6'>Informações</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant='h6'>Preço (R$)</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                    {produtos.map((produto) => {
                      return (
                        <TableRow
                          key={produto.id}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                            alignItems: 'center', justifyContent: 'center', textAlign: 'center'
                          }}
                        >
                          <TableCell sx={{
                            alignItems: 'center',
                            justifyContent: 'center', textAlign: 'center'
                          }}><Avatar variant="rounded" src={produto.pathimagem} height="300" width="320" /></TableCell>
                          <TableCell sx={{
                            alignItems: 'center',
                            justifyContent: 'center', textAlign: 'center'
                          }} component="th" scope="row">
                            <Typography variant='p'>{produto.descricao}</Typography>
                          </TableCell>
                          <TableCell sx={{
                            alignItems: 'center',
                            justifyContent: 'center', textAlign: 'center'
                          }} align="center">
                            <Typography variant='p'>{produto.info}</Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant='p'>R$ {produto.preco}</Typography>
                          </TableCell>
                          <Button
                            variant="contained" disableElevation startIcon={<EditIcon />}
                            onClick={() => pegaProduto(produto.id)}
                            sx={{ margin: 1, color: 'white' }}
                            color="secondary">Editar</Button>

                          <Button
                            variant="contained" disableElevation startIcon={<ChatIcon />}
                            sx={{ margin: 1, color: 'white' }}
                            color="primary"
                            href={`/chatpage/${produto.id}/${userid}`}>Chat</Button>

                          <Button
                            variant="contained" disableElevation startIcon={<EditIcon />}
                            onClick={OpenDialogo}
                            sx={{ margin: 1, color: 'white' }}
                            color="secondary">Open</Button>

                        </TableRow>
                      );
                    })}
                  </TableBody>


                  <Stack spacing={2} sx={{ width: '100%' }}>
                    <Snackbar open={excluir} autoHideDuration={6000} onClose={handleExcluir}>
                      <Alert onClose={handleExcluir} severity="error" sx={{ width: '100%' }}>
                        Produto removido com sucesso!
                      </Alert>
                    </Snackbar>
                  </Stack>
                </Table>
              </TableContainer>

            </Container>

          </TabPanel>
        </Container>



      </ThemeProvider><Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Produto cadastrado com sucesso!
          </Alert>
        </Snackbar>
      </Stack><Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={aberto} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            Erro na gravação do Produto!
          </Alert>
        </Snackbar>


        <Dialog
          open={dialogo}
          TransitionComponent={Transition}
          keepMounted
          onClose={FechaDialogo}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Cadastro de Produtos"}</DialogTitle>
          <DialogContent>
            <Box component="form" noValidate sx={{ mt: 1 }}>

              <TextField
                fullWidth
                margin="normal"
                required
                size="small"
                id="descricao-form"
                label="Descricao"
                defaultValue="Descricao"
                value={descricao} onChange={(e) => setDescricao(e.target.value)} />

              <TextField
                fullWidth
                margin="normal"
                size="small"
                id="outlined-required"
                label="Info"
                type="text"
                defaultValue="CEP"
                value={info} onChange={(e) => setInfo(e.target.value)} />

              <TextField
                fullWidth
                margin="normal"
                size="small"
                id="outlined-required"
                label="Preco"
                type="number"
                defaultValue="Preco"
                value={preco} onChange={(e) => setPreco(e.target.value)} />

              <TextField
                fullWidth
                margin="normal"
                size="small"
                id="outlined-required"
                label="Local da imagem"
                type="text"
                defaultValue="Local" value={pathimagem} onChange={(e) => setPathimagem(e.target.value)} />

              <TextField
                fullWidth
                margin="normal"
                size="small"
                id="outlined-required"
                label="Percentual Repasse"
                type="text"
                defaultValue="Local" value={percentual} onChange={(e) => setPercentual(e.target.value)} />

            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={editarProduto} variant="contained" disableElevation sx={{ mt: 3, mb: 2, color: 'white' }}>Atualizar</Button>
            <Button onClick={handleAdd} variant="contained" disableElevation sx={{ mt: 3, mb: 2, color: 'white' }}>Adicionar</Button>
          </DialogActions>
        </Dialog>

      </Stack>

    </ThemeProvider>
  );
}

export default Admproduto;