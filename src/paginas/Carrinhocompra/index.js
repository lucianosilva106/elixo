import firebase from '../../firebaseConnection';
import 'firebase/auth';
import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { TextField, Tab, Tabs, Card, CardContent, IconButton } from "@material-ui/core";
import PropTypes from 'prop-types';
import { orange, green, grey } from '@material-ui/core/colors';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
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
      minimal: grey[500],
    },
    banner: {
      main: green[500],
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
  fontSize: '0.9rem',
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

function Carrinhocompra() {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [endereco, setEndereco] = useState('');
  const [cep, setCep] = useState('');
  const [nome, setNome] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [idcliente, setIdcliente] = useState('');

  const [formapagamento, setFormapagamento] = useState('');
  const [nomecartao, setNomecartao] = useState('');
  const [numerocartao, setNumerocartao] = useState('');
  const [validade, setValidade] = useState('');
  const [codseguranca, setCodseguranca] = useState('');

  const [datavenda, setDatavenda] = useState('');

  var userlog = "";

  async function checkLogin() {
    await firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        userlog = user.uid;
        await firebase.firestore().collection('usuarios')
          .doc(user.uid)
          .get()
          .then((snapshot) => {
            setIdcliente(user.uid)
            setNome(snapshot.data().nome)
            setCep(snapshot.data().cep)
            setEndereco(snapshot.data().endereco)
            setBairro(snapshot.data().bairro)
            setCidade(snapshot.data().cidade)
            setEstado(snapshot.data().estado)
          })

      } else {
        firebase.auth().signOut();
        localStorage.clear();
        window.location.href = '/login';
      }
    })
  }

  checkLogin();

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [open, setOpen] = useState(false);
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


  if (localStorage.length == 0) {
    return (
      <div>
        <h2>Carrinho de compras vazio...</h2>
        <button onClick={() => window.location.href = '/produto'}>Ir para a Loja</button>
      </div>
    )
  }

  var dataAtual = '';
  var data = new Date();
  var dia = String(data.getDate()).padStart(2, '0');
  var mes = String(data.getMonth() + 1).padStart(2, '0');
  var ano = data.getFullYear();
  dataAtual = dia + '/' + mes + '/' + ano;

  function fechaCompra() {
    gravarCompra();
  }

  var carrinho = JSON.parse(localStorage.getItem('produtocarrinho'));

  var idvenda = "";
  var i = 0;

  async function gravarCompra() {
    //      alert('vai gravar:' + datavenda + ' - ' +formapagamento + ' - '+idcliente + ' ' + total);
    await firebase.firestore().collection('vendas')
      .add({
        datavenda: datavenda,
        formapagamento: formapagamento,
        idcliente: idcliente,
        valortotal: total,
        idusuario: userlog
      })
      .then((value) => {
        idvenda = value.id;
        alert('gravou ok:' + idvenda);
        // ler o array e gravar o detalhe

        carrinho.map(async (det) => {
          await firebase.firestore().collection('vendaprodutos')
            .add({
              idvenda: idvenda,
              idproduto: det.idprod,
              descprod: det.descprod,
              valor: det.valor,
            })
            .then(() => {
              alert('produto add ok')
            })
            .catch(() => {
              alert('erro ao add produto da venda')
            })
        })

        handleClick();
        setFormapagamento('');
        setNomecartao('');
        setNumerocartao('');
        setValidade('');
        setCodseguranca('');
        localStorage.clear('produtocarrinho');
        alert('limpou o localstorage carrinho');
        window.location.href = '/gerenciamentousuario';
      })
      .catch((error) => {
        alert('erro ao adicionar transacao: ' + error);
      })
  }

  async function deletaProduto(procarid) {
    //    excluir posicao e recarregar carrinho      
    const data = JSON.parse(localStorage.getItem('produtocarrinho'))
      .filter(item => item.idprod !== procarid)
    localStorage.setItem('produtocarrinho', JSON.stringify(data))
    carrinho = JSON.parse(localStorage.getItem('produtocarrinho'));
  }

  var total = 0;

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
                <Tab label="Carrinho" {...a11yProps(0)} />
                <Tab label="Endereço de entrega" {...a11yProps(1)} />
                <Tab label="Pagamento" {...a11yProps(2)} />
              </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
              <Container component="main" maxWidth="xl">
                <TableContainer sx={{ maxWidth: 550 }} component={Paper}>
                  <Table size="small" sx={{ maxWidth: 550 }} aria-label="a dense table">
                    <TableHead sx={{ color: 'primary', bgcolor: '#fafafa' }}>
                      <TableRow sx={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                        <TableCell sx={{ visibility: 'hidden' }} align="center">Imagem</TableCell>
                        <TableCell align="center">
                          <Typography variant='h6'>Descrição</Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant='h6'>Preço (R$)</Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody sx={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                      {carrinho.map((item) => {
                        var vl = 0;
                        vl = parseInt(item.valor);
                        total += vl;
                        return (
                          <TableRow key={carrinho.key} sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                            alignItems: 'center', justifyContent: 'center', textAlign: 'center'
                          }}>
                            <TableCell sx={{
                              alignItems: 'center',
                              justifyContent: 'center', textAlign: 'center'
                            }}><img src={item.imgpath} height="60" width="80" /></TableCell>
                            <TableCell sx={{
                              alignItems: 'center',
                              justifyContent: 'center', textAlign: 'center'
                            }} scope="row">
                              <Typography variant='p'>{item.descprod}</Typography>
                            </TableCell>
                            <TableCell sx={{
                              alignItems: 'center',
                              justifyContent: 'center', textAlign: 'center'
                            }} align="center">
                              <Typography variant='p'>R$ {item.valor}</Typography>
                            </TableCell>
                            <TableCell sx={{
                              alignItems: 'center',
                              justifyContent: 'center', textAlign: 'center'
                            }} align="center">
                              <IconButton onClick={() => deletaProduto(item.idprod)}
                                sx={{ margin: 1, color: 'textos.main', textAlign: 'center' }}
                                aria-label="delete">
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
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


                <Card sx={{
                  maxWidth: 220, maxHeight: 70, justifyContent: 'center',
                  alignItems: 'center', marginTop: '2%', bgcolor: '#fafafa'
                }}>
                  <CardContent sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    <Typography variant='h6'>R$ {total}</Typography>
                    <Typography sx={{ mb: 1.5 }} color="textos.minimal">
                      Total
                    </Typography>
                  </CardContent>
                </Card>

              </Container>

            </TabPanel>

            <TabPanel sx={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
              value={value} index={1}>
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Box component="form" noValidate sx={{ mt: 1 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>

                        <TextField
                          fullWidth
                          margin="normal"
                          required
                          size="small"
                          id="cliente-form"
                          label="Cliente"
                          defaultValue="Cliente"
                          value={nome} onChange={(e) => setNome(e.target.value)} />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          margin="normal"
                          size="small"
                          id="outlined-required"
                          label="CEP"
                          type="text"
                          defaultValue="CEP" value={cep} onChange={(e) => setCep(e.target.value)} />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          margin="normal"
                          size="small"
                          id="outlined-required"
                          label="Endereço"
                          type="text"
                          defaultValue="Rua" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          margin="normal"
                          size="small"
                          id="outlined-required"
                          label="Bairro"
                          type="text"
                          defaultValue="Rua" value={bairro} onChange={(e) => setBairro(e.target.value)} />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          margin="normal"
                          size="small"
                          id="outlined-required"
                          label="Cidade"
                          type="text"
                          defaultValue="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />
                      </Grid>
                      <Grid item xs={12}>
                        <InputLabel id="demo-simple-select-helper-label">Estado</InputLabel>
                        <Select
                          fullWidth
                          margin="normal"
                          size="small"
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          value={estado}
                          label="Estado"
                          onChange={(e) => setEstado(e.target.value.toString())}
                        >
                          <MenuItem value="">
                          </MenuItem>
                          <MenuItem value={'SP'}>São Paulo</MenuItem>
                          <MenuItem value={'RJ'}>Rio de Janeiro</MenuItem>
                          <MenuItem value={'MG'}>Minas Gerais</MenuItem>
                        </Select>
                      </Grid>
                    </Grid>

                  </Box>
                </Box>
              </Container>
            </TabPanel>

            <TabPanel value={value} index={2}>
              <Container component="main" maxWidth="xl">
                <Grid id="grid-bg1" container component="main" align="left"
                  sx={{ alignItems: 'center', height: '450px', justifyContent: 'center' }}>
                  <Stack direction={{ sm: 'row' }}
                    spacing={{ xs: 1, sm: 2, md: 12 }} alignItems="center" justifyContent="space-evenly">
                    <Box>
                      <InputLabel id="demo-simple-select-helper-label">Forma de Pagamento</InputLabel>
                      <Select
                        fullWidth
                        margin="normal"
                        size="small"
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={formapagamento}
                        label="Estado"
                        onChange={(e) => setFormapagamento(e.target.value.toString())}
                      >
                        <MenuItem value=""></MenuItem>
                        <MenuItem value={'Boleto'}>Boleto Bancario</MenuItem>
                        <MenuItem value={'Cartao de Credito'}>Cartão de Crédito</MenuItem>
                        <MenuItem value={'PIX'}>Transferência PIX</MenuItem>
                      </Select>

                      <TextField
                        fullWidth
                        margin="normal"
                        size="small"
                        id="outlined-required"
                        label="Nome do cartão"
                        type="text"
                        defaultValue="Nome igual ao do cartão" value={nomecartao} onChange={(e) => setNomecartao(e.target.value)} />

                      <TextField
                        fullWidth
                        margin="normal"
                        size="small"
                        id="outlined-required"
                        label="Numero do cartão"
                        type="number"
                        defaultValue="Numero do cartão" value={numerocartao} onChange={(e) => setNumerocartao(e.target.value)} />

                      <TextField
                        fullWidth
                        margin="normal"
                        size="small"
                        id="outlined-required"
                        type="date"
                        defaultValue="Validade" value={validade} onChange={(e) => setValidade(e.target.value)} />

                      <TextField
                        fullWidth
                        margin="normal"
                        size="small"
                        id="outlined-required"
                        label="Codigo de segurança"
                        type="number"
                        mask="000"
                        defaultValue="Codigo de seguranca" value={codseguranca} onChange={(e) => setCodseguranca(e.target.value)} />


                    </Box>
                    <Box>
                      <Card sx={{
                        minWidth: 450, maxHeight: 200, justifyContent: 'center',
                        alignItems: 'center', marginTop: '2%', bgcolor: '#fafafa'
                      }} elevation={0}>
                        <CardContent sx={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                          <Typography variant='h6'>R$ {total}</Typography>
                          <Typography sx={{ mb: 1.5 }} color="textos.minimal">
                            Total
                          </Typography>
                          <Typography variant='p'>R$ 21,50</Typography>
                          <Typography sx={{ mb: 1.4 }} color="textos.minimal">
                            Frete
                          </Typography>
                          <Typography variant='h6'>R$ {total + 21.50}</Typography>
                          <Typography sx={{ mb: 1.5 }} color="textos.minimal">
                            Total com frete
                          </Typography>
                        </CardContent>
                      </Card>

                      <Button variant='contained' fullWidth
                        disableElevation sx={{
                          color: 'white',
                          mt: 2,
                        }} onClick={fechaCompra}>Finalizar compra</Button>
                    </Box>

                  </Stack>
                </Grid>
              </Container>
            </TabPanel>

          </Paper>
        </Container>
      </Box>

      
    </ThemeProvider >
  );
}

export default Carrinhocompra;