import firebase from '../../firebaseConnection';
import 'firebase/auth';
import * as React from 'react';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { TextField } from "@material-ui/core";
import { orange, green } from '@material-ui/core/colors';
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
  },
});


function Carrinhocompra() {

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
 
    async function checkLogin(){
      await firebase.auth().onAuthStateChanged(async (user) => {
        if(user){
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

        }else{
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


    if (localStorage.length == 0){
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
    
    function fechaCompra(){
        gravarCompra();
    }

    var carrinho = JSON.parse(localStorage.getItem('produtocarrinho'));

    var idvenda = "";
    var i=0;

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

    async function deletaProduto(){
      alert('vou apagar')
//    excluir posicao e recarregar carrinho      
      carrinho = JSON.parse(localStorage.getItem('produtocarrinho'));

    }

    var total = 0;
    
      return (

        <ThemeProvider theme={theme}>
          <Container fixed id="topo"
            sx={{height: 150, marginTop: 6}}>
            <Typography variant="h4" gutterBottom component="div" align="center">
              Produtos no carrinho - { localStorage.length + 1 } itens
            </Typography>
          </Container>
          <Container fixed>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead sx={{ color: 'primary' }}>
                  <TableRow>
                    <TableCell align="center">Produto</TableCell>
                    <TableCell align="center">Preço</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                  carrinho.map((item) => {
                      var vl = 0;
                      vl = parseInt(item.valor);
                      total += vl;
                      return (
                        <TableRow key={carrinho.key} sx={{ '&:last-child td, &:last-child th': { border: 0 }}} >
                          <TableCell scope="row">{item.descprod}</TableCell>
                          <TableCell align="center">{item.valor}</TableCell>
                          <Button
                            variant="outlined" startIcon={<DeleteIcon />}
                            onClick={() => deletaProduto(item.key)}
                            sx={{ margin: 1 }}
                            color="secondary">Excluir</Button>                       
                        </TableRow>
                      );
                    })
                 }
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
            <br />
            <div align="center">
              <text>Valor Total: R$ {total}</text> <br/>
              <button onClick={fechaCompra}>fechar Compra</button>
            </div>
          </Container>
          <Grid mx={2} my={2} container spacing={4} columns={12}>
              <Grid item xs={8} sm={6} md={5} component={Paper} elevation={0} square>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <h3>Fechamento de Transação - Dados do cliente</h3>
                <TextField
                    fullWidth
                    margin="normal"
                    required
                    size="small"
                    id="cliente-form"
                    label="Cliente"
                    defaultValue="Cliente"
                    value={nome} onChange={(e) => setNome(e.target.value)} />
    
                  <TextField
                    fullWidth
                    margin="normal"
                    size="small"
                    id="outlined-required"
                    label="CEP"
                    type="text"
                    defaultValue="CEP" value={cep} onChange={(e) => setCep(e.target.value)} />
    
                  <TextField
                    fullWidth
                    margin="normal"
                    size="small"
                    id="outlined-required"
                    label="Endereço"
                    type="text"
                    defaultValue="Rua" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
    
                  <TextField
                    fullWidth
                    margin="normal"
                    size="small"
                    id="outlined-required"
                    label="Bairro"
                    type="text"
                    defaultValue="Rua" value={bairro} onChange={(e) => setBairro(e.target.value)} />
    
                  <TextField
                    fullWidth
                    margin="normal"
                    size="small"
                    id="outlined-required"
                    label="Cidade"
                    type="text"
                    defaultValue="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />
    
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

              </Box>
              </Grid>

              <Grid item xs={8} sm={2} md={5} component={Paper} elevation={0} square>
              <Box component="form" noValidate sx={{ mt: 1 }}>
              <h3>Forma de Pagamento</h3>
              <TextField
                  fullWidth
                  margin="normal"
                  size="small"
                  id="outlined-required"
                  label="Data"
                  type="text"
                  defaultValue="Data" value={datavenda} onChange={(e) => setDatavenda(e.target.value)} />

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
                  type="text"
                  defaultValue="Numero do cartão" value={numerocartao} onChange={(e) => setNumerocartao(e.target.value)} />

                <TextField
                  fullWidth
                  margin="normal"
                  size="small"
                  id="outlined-required"
                  label="Validade"
                  type="text"
                  defaultValue="Validade" value={validade} onChange={(e) => setValidade(e.target.value)} />

                <TextField
                  fullWidth
                  margin="normal"
                  size="small"
                  id="outlined-required"
                  label="Codigo de segurança"
                  type="text"
                  defaultValue="Codigo de seguranca" value={codseguranca} onChange={(e) => setCodseguranca(e.target.value)} />

              </Box>
              </Grid>
            </Grid>
        </ThemeProvider>
    );
}
  
export default Carrinhocompra;