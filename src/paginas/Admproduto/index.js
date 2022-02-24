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
import Slide from '@material-ui/core/Slide';
import './admprod.css'

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


function Admproduto() {

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

    const[idProduto, setIdProduto] = useState('');
    const[descricao, setDescricao] = useState('');
    const[preco, setPreco] = useState('');
    const[pathimagem, setPathimagem] = useState('');
    const[info, setInfo] = useState('');
    const[percentual, setPercentual] = useState('');
    const[produtos, setProdutos] = useState([]);
    
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

          setProdutos(meusProdutos);
        })
      }

      loadProdutos();

    }, [])
    
    async function handleAdd(){
      await firebase.firestore().collection('produtos')
      .add({
        descricao: descricao,
        info: info,
        preco: preco,
        pathimagem: pathimagem,
        percentual: percentual
      })
      .then(()=>{
        handleClick();
        setDescricao('');
        setInfo('');
        setPreco('');
        setPathimagem('');
        setPercentual('');
        buscaProdutos();
      })
      .catch((error)=>{ 
        alert(error);
        console.log('ERRO: ' + error);
      })
    }

    async function buscaProdutos(){
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

    async function editarProduto(){
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

    function pegaProduto(id){
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

    return (
      <ThemeProvider theme={theme}>
        <br />
  
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid id="imgdrink"
            xs={false}
            sm={4}
            item
            md={7}
            sx={{
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
        
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} square>
            <Box
              sx={{
                my: 8,
                mx: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box component="form" noValidate sx={{ mt: 1 }}>
              
              <h2>Cadastro de Produtos</h2>

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

                <Button fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}
                  onClick={handleAdd}>Incluir Cadastro</Button><br />
  
                <Button fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}
                  onClick={editarProduto}>Atualizar Cadastro</Button><br />

              </Box>
            </Box>
          </Grid>
        </Grid>

        <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Produto cadastrado com sucesso!
          </Alert>
        </Snackbar>
        </Stack>

        <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={aberto} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            Erro na gravação do Produto!
          </Alert>
        </Snackbar>
        </Stack>

        <ThemeProvider theme={theme}>
          <Container fixed id="topo"
            sx={{height: 150, marginTop: 6}}>
            <Typography variant="h3" gutterBottom component="div" align="center">
              Produtos cadastrados
            </Typography>
          </Container>
          <Container fixed>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead sx={{ color: 'primary' }}>
                  <TableRow>
                    <TableCell align="center">Produto</TableCell>
                    <TableCell align="center">Informações</TableCell>
                    <TableCell align="center">Preço</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {produtos.map((produto) => {
                    return (
                      <TableRow
                        key={produto.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">{produto.descricao}</TableCell>
                        <TableCell align="center">{produto.info}</TableCell>
                        <TableCell align="center">{produto.preco}</TableCell>
                        <Button
                          variant="outlined" startIcon={<DeleteIcon />}
                          onClick={() => pegaProduto(produto.id)}
                          sx={{ margin: 1 }}
                          color="secondary">Alterar</Button>                       
                      </TableRow>
                    )
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
        </ThemeProvider>
      </ThemeProvider>
    );
}
  
export default Admproduto;