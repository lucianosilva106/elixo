import firebase from '../../firebaseConnection';
import 'firebase/auth';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import {
  TextField, Avatar, FormControlLabel, Checkbox,
  Link, Container, Typography, Box, Tab, Tabs, IconButton
} from "@material-ui/core";
import PropTypes from 'prop-types';
import { orange, green, grey } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Stack from '@material-ui/core/Stack'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/core/Alert';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import Paper from '@material-ui/core/Paper';

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


function Meuproduto() {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [valores, setValores] = React.useState({
    amount: ''
  });

  const mudando = (prop) => (event) => {
    setValores({ ...valores, [prop]: event.target.value });
  };

  var storage = firebase.storage();
  const [image, setImage] = useState('');
  const [endImg] = useState('');
  const [imageAsUrl, setImageAsUrl] = useState('');

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

  const [idProduto, setIdProduto] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [pathimagem, setPathimagem] = useState('');
  const [info, setInfo] = useState('');
  const [percentual, setPercentual] = useState('');

  const [produtos, setProdutos] = useState([]);

  const [excluir, setExcluir] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleExcluir = () => {
    setExcluir(true);
  };


  useEffect(() => {
    async function loadProdutos() {
      await firebase.firestore().collection('produtos')
        .onSnapshot((doc) => {
          let meusProdutos = [];
          doc.forEach((item) => {
            if (item.data().idusuario == userlog) {
              meusProdutos.push({
                id: item.id,
                descricao: item.data().descricao,
                preco: item.data().preco,
                pathimagem: item.data().pathimagem,
                info: item.data().info,
                percentual: item.data().percentual
              })
            }
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
        pathimagem: imageAsUrl,
        percentual: percentual,
        aprovado: false,
        idusuario: userlog
      })
      .then(() => {
        handleClick();
        setDescricao('');
        setInfo('');
        setPreco('');
        setPathimagem('');
        setImageAsUrl('');
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
        pathimagem: imageAsUrl,
        percentual: percentual
      })
      .then(() => {
        alert('DADOS ATUALIZADOS COM SUCESSO!')
        setIdProduto('');
        setDescricao('');
        setInfo('');
        setPreco('');
        setPercentual('');
        setImageAsUrl('');
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

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [open, setOpen] = React.useState(false);
  const [aberto, setAberto] = React.useState(false);

  const handleClick1 = () => {
    setOpen(true);
  };
  const handleClick2 = () => {
    setAberto(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAberto(false);
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>

      <Box
        sx={{
          bgcolor: '#fafafa',
          pt: 8,
          pb: 30,
        }}
      >
        <Container maxWidth="lg">
          <Paper elevation={1}
            sx={{
              minHeight: 'auto',
              alignItems: 'center',
              alignContent: 'center',
              justifyContent: 'center',
              textAlign: 'center'
            }}>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Meus Produtos Cadastrados" {...a11yProps(0)} />
              </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
              <Container component="main" maxWidth="xl">

              <TableContainer sx={{ maxWidth: 'auto' }} component={Paper}>
                  <Table size="small" sx={{ maxWidth: 'auto' }} aria-label="a dense table">
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
                            sx={{ '&:last-child td, &:last-child th': { border: 0 },
                            alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
                          >
                            <TableCell sx={{
                              alignItems: 'center', alignContent: 'center', alignSelf: 'center',
                              justifyContent: 'center', textAlign: 'center'
                            }}>
                              <Avatar variant="rounded" src={produto.pathimagem} 
                            sx={{ width: 90, height: 90, alignItems: 'center', alignContent: 'center', alignSelf: 'center',
                            justifyContent: 'center', textAlign: 'center' }} /></TableCell>
                            <TableCell sx={{
                              alignItems: 'center',
                              justifyContent: 'center', textAlign: 'center'
                            }} scope="row">
                              <Typography variant='p'>{produto.descricao}</Typography>
                            </TableCell>
                            <TableCell sx={{
                              alignItems: 'center',
                              justifyContent: 'center', textAlign: 'center'
                            }} scope="row">
                              <Typography variant='p'>{produto.info}</Typography>
                            </TableCell>
                            <TableCell sx={{
                              alignItems: 'center',
                              justifyContent: 'center', textAlign: 'center'
                            }} scope="row">
                              <Typography variant='p'>R$ {produto.preco}</Typography>
                            </TableCell>
                            <IconButton onClick={() => pegaProduto(produto.id)}
                              sx={{ margin: 1, color: 'textos.main', textAlign: 'center', alignItems: 'center', }}
                              aria-label="delete">
                              <EditIcon />
                            </IconButton>
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

          </Paper>

        </Container>
      </Box>

      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Cadastrado realizado com sucesso!
          </Alert>
        </Snackbar>
      </Stack><Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={aberto} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            Dados preenchidos incorretamente!
          </Alert>
        </Snackbar>
      </Stack>
    </ThemeProvider>
  );

}

export default Meuproduto;