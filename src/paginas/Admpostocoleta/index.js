import firebase from '../../firebaseConnection';
import 'firebase/auth';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@material-ui/core/styles';
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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Container from '@material-ui/core/Container';
import DeleteIcon from '@material-ui/icons/Delete';
import { Typography } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import './admposto.css'

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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function Admpostocoleta() {

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

    const[idPosto, setIdPosto] = useState('');
    const[ativo, setAtivo] = useState('');
    const[nome, setNome] = useState('');
    const[cep, setCep] = useState('');
    const[endereco, setEndereco] = useState('');
    const[bairro, setBairro] = useState('');
    const[cidade, setCidade] = useState('');
    const[estado, setEstado] = useState('');
    const[destino, setDestino] = useState('');
    const[localizacao, setLocalizacao] = useState('');
    const[latitude, setLatitude] = useState('');
    const[longitude, setLongitude] = useState('');
    const[postoscoletas, setPostoscoletas] = useState([]);
    
    const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
  
    const [abrir, setAbrir] = React.useState(false);
    const abrirAlert = () => {
      setAbrir(true);
    };
  
    
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
      async function loadPostos(){
        await firebase.firestore().collection('postoscoletas')
        .onSnapshot((doc) => {
          let meusPostos = [];
          doc.forEach((item) => {
            meusPostos.push({
              id: item.id,
              ativo: item.data().ativo,
              nome: item.data().nome,
              cep: item.data().cep,
              endereco: item.data().endereco,
              bairro: item.data().bairro,
              cidade: item.data().cidade,
              estado: item.data().estado,
              destino: item.data().destino,
              localizacao: item.data().localizacao,
              latitude: item.data().latitude,
              longitude: item.data().longitude
            })
          })

          setPostoscoletas(meusPostos);
        })
      }

      loadPostos();

    }, [])
    
    async function handleAdd(){
      await firebase.firestore().collection('postoscoletas')
      .add({
        ativo: ativo,
        nome: nome,
        cep: cep,
        endereco: endereco,
        bairro: bairro,
        cidade: cidade,
        estado: estado,
        destino: destino,
        localizacao: localizacao,
        latitude: latitude,
        longitude: longitude
      })
      .then(()=>{
        handleClick();
        setAtivo('');
        setNome('');
        setCep('');
        setEndereco('');
        setBairro('');
        setCidade('');
        setEstado('');
        setDestino('');
        setLocalizacao('');
        setLatitude('');
        setLongitude('');
        buscaPostos();
      })
      .catch((error)=>{ 
        alert('deu erro')
        console.log('ERRO: ' + error);
      })
    }

    async function buscaPostos(){
      await firebase.firestore().collection('postoscoletas')
      .get()
      .then((snapshot) => {
        let lista = [];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            ativo: doc.data().ativo,
            nome: doc.data().nome,
            cep: doc.data().cep,
            endereco: doc.data().endereco,
            bairro: doc.data().bairro,
            cidade: doc.data().cidade,
            estado: doc.data().estado,
            destino: doc.data().destino,
            localizacao: doc.data().localizacao,
            latitude: doc.data().latitude,
            longitude: doc.data().longitude
          })
        })
        setPostoscoletas(lista);

      })
      .catch(() => {

      })
    }

    async function editarPosto(){
      await firebase.firestore().collection('postoscoletas')
      .doc(idPosto)
      .update({
        ativo: ativo,
        nome: nome,
        cep: cep,
        endereco:endereco,
        bairro: bairro,
        cidade: cidade,
        estado: estado,
        destino: destino,
        localizacao: localizacao,
        latitude: latitude,
        longitude: longitude
      })
      .then(() => {
        alert('DADOS ATUALIZADOS COM SUCESSO!')
        setIdPosto('');
        setAtivo('');
        setNome('');
        setCep('');
        setEndereco('');
        setBairro('');
        setCidade('');
        setEstado('');
        setDestino('');
        setLocalizacao('');
        setLatitude('');
        setLongitude('');
        buscaPostos();
      })
      .catch((error) => {
        alert("Erro ao gravar alteração: " + error)
      })
    }

    function pegaPosto(id){
      firebase.firestore().collection('postoscoletas').doc(id)
      .onSnapshot((doc) => {
        setIdPosto(id);
        setAtivo(doc.data().ativo);
        setNome(doc.data().nome);
        setCep(doc.data().cep);
        setEndereco(doc.data().endereco);
        setBairro(doc.data().bairro);
        setCidade(doc.data().cidade);
        setEstado(doc.data().estado);
        setDestino(doc.data().destino);
        setLocalizacao(doc.data().localizacao);
        setLatitude(doc.data().latitude);
        setLongitude(doc.data().longitude);
      }) 
    }

    async function excluirPosto(id){
      await firebase.firestore().collection('postoscoletas').doc(id)
      .delete()
      .then(() => {
        handleExcluir();
        buscaPostos();
      })
    }

    function buscaCep(){

    }

    let tabsituacao = '';

    function setaSituacao(situacao){
      if (situacao){
        tabsituacao = 'ATIVO'
      } else {
        tabsituacao = 'INATIVO'
      }
      return tabsituacao
    }

    return (
      <ThemeProvider theme={theme}>
        <br />
  
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid id="imgcontato"
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
              
              <h2>Cadastro de Posto de Coleta</h2>

                <TextField
                  fullWidth
                  margin="normal"
                  required
                  size="small"
                  id="empresa-form"
                  label="Empresa"
                  defaultValue="Empresa"
                  value={nome} onChange={(e) => setNome(e.target.value)} />
  
                <TextField
                  fullWidth
                  margin="normal"
                  size="small"
                  id="outlined-required"
                  label="CEP"
                  type="text"
                  defaultValue="CEP" value={cep} onChange={(e) => setCep(e.target.value)} />
                  <Button onClick={buscaCep}>Pesquisar</Button>
  
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
  
                <TextField
                  fullWidth
                  margin="normal"
                  size="small"
                  id="outlined-textarea"
                  label="Destino do lixo coletado"
                  placeholder="Destino"
                  multiline value={destino} onChange={(e) => setDestino(e.target.value)} />
  
                <TextField
                  fullWidth
                  margin="normal"
                  size="small"
                  id="outlined-textarea"
                  label="Localizacao no mapa"
                  placeholder="Localizacao"
                  multiline value={localizacao} onChange={(e) => setLocalizacao(e.target.value)} />

                <TextField
                  fullWidth
                  margin="normal"
                  size="small"
                  id="outlined-textarea"
                  label="Latitude no mapa"
                  placeholder="Latitude"
                  multiline value={latitude} onChange={(e) => setLatitude(e.target.value)} />

                <TextField
                  fullWidth
                  margin="normal"
                  size="small"
                  id="outlined-textarea"
                  label="Longitude no mapa"
                  placeholder="Longitude"
                  multiline value={longitude} onChange={(e) => setLongitude(e.target.value)} />

                <InputLabel id="demo-simple-select-helper-label">Situacao</InputLabel>
                <Select
                  fullWidth
                  margin="normal"
                  size="small"
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={ativo}
                  label="Situacao"
                  onChange={(e) => setAtivo(e.target.value)}
                >
                  <MenuItem value="">
                  </MenuItem>
                  <MenuItem value={true}>Ativado</MenuItem>
                  <MenuItem value={false}>Desativado</MenuItem>
                </Select>

                <Button fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}
                  onClick={handleAdd}>Incluir Cadastro</Button><br />
  
                <Button fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}
                  onClick={editarPosto}>Atualizar Cadastro</Button><br />

              </Box>
            </Box>
          </Grid>
        </Grid>

        <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Posto de Coleta cadastrado com sucesso!
          </Alert>
        </Snackbar>
        </Stack>

        <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={aberto} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            Erro na gravação do Posto de Coleta!
          </Alert>
        </Snackbar>
        </Stack>

        <br /> <br /> <br /> <br /> <br />
        <br /> <br /> <br /> <br /> <br /> 
        <br /> <br /> <br /> <br /> <br /> 
        <br /> <br /> <br /> <br /> <br /> <br />

        <ThemeProvider theme={theme}>
          <Container fixed id="topo"
            sx={{height: 150, marginTop: 6}}>
            <Typography variant="h3" gutterBottom component="div" align="center">
              Postos de Coletas cadastrados
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
                    <TableCell align="center">Destino</TableCell>
                    <TableCell align="center">Situacao</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {postoscoletas.map((postocoleta) => {
                    return (
                      <TableRow
                        key={postocoleta.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">{postocoleta.nome}</TableCell>
                        <TableCell align="center">{postocoleta.cep}</TableCell>
                        <TableCell align="center">{postocoleta.endereco}</TableCell>
                        <TableCell align="center">{postocoleta.bairro}</TableCell>
                        <TableCell align="center">{postocoleta.cidade}</TableCell>
                        <TableCell align="center">{postocoleta.estado}</TableCell>
                        <TableCell align="center">{postocoleta.destino}</TableCell>
                        <TableCell align="center">{setaSituacao(postocoleta.ativo)}</TableCell>
                        <Button
                          variant="outlined" startIcon={<DeleteIcon />}
                          onClick={() => pegaPosto(postocoleta.id)}
                          sx={{ margin: 1 }}
                          color="secondary">Alterar</Button>

                        <Button
                          variant="outlined" startIcon={<DeleteIcon />}
                          onClick={() => excluirPosto(postocoleta.id)}
                          sx={{ margin: 1 }}
                          color="secondary">Remover</Button>
                      </TableRow>
                    )
                  })}
               </TableBody>
               <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={excluir} autoHideDuration={6000} onClose={handleExcluir}>
                  <Alert onClose={handleExcluir} severity="error" sx={{ width: '100%' }}>
                    Posto de Coleta removido com sucesso!
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
  
export default Admpostocoleta;