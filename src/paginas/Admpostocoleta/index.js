import firebase from '../../firebaseConnection';
import 'firebase/auth';
import { useEffect, useState } from 'react';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@material-ui/core/styles';
import { TextField } from "@material-ui/core";
import { orange, green } from '@material-ui/core/colors';
import MenuItem from '@material-ui/core/MenuItem';
//import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { InputLabel } from "@material-ui/core";
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
    const[nome, setNome] = useState('');
    const[cep, setCep] = useState('');
    const[endereco, setEndereco] = useState('');
    const[bairro, setBairro] = useState('');
    const[cidade, setCidade] = useState('');
    const[estado, setEstado] = useState('');
    const[destino, setDestino] = useState('');
    const[postoscoletas, setPostoscoletas] = useState([]);

    useEffect(() => {
      async function loadPostos(){
        await firebase.firestore().collection('postoscoletas')
        .onSnapshot((doc) => {
          let meusPostos = [];
          doc.forEach((item) => {
            meusPostos.push({
              id: item.id,
              nome: item.data().nome,
              cep: item.data().cep,
              endereco: item.data().endereco,
              bairro: item.data().bairro,
              cidade: item.data().cidade,
              estado: item.data().estado,
              destino: item.data().destino
            })
          })

          setPostoscoletas(meusPostos);
        })
      }

      loadPostos();

    })
    
    async function handleAdd(){
      await firebase.firestore().collection('postoscoletas')
      .add({
        nome: nome,
        cep: cep,
        endereco: endereco,
        bairro: bairro,
        cidade: cidade,
        estado: estado,
        destino: destino
      })
      .then(()=>{
        alert('POSTO DE COLETA CADASTRADO COM SUCESSO!');
        setNome('');
        setCep('');
        setEndereco('');
        setBairro('');
        setCidade('');
        setEstado('');
        setDestino('');
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
            nome: doc.data().nome,
            cep: doc.data().cep,
            endereco: doc.data().endereco,
            bairro: doc.data().bairro,
            cidade: doc.data().cidade,
            estado: doc.data().estado,
            destino: doc.data().destino
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
        nome: nome,
        cep: cep,
        endereco:endereco,
        bairro: bairro,
        cidade: cidade,
        estado: estado,
        destino: destino
      })
      .then(() => {
        alert('DADOS ATUALIZADOS COM SUCESSO!')
        setIdPosto('');
        setNome('');
        setCep('');
        setEndereco('');
        setBairro('');
        setCidade('');
        setEstado('');
        setDestino('');
      })
      .catch((error) => {
        alert("Erro ao gravar alteração: " + error)
      })
    }

    function pegaPosto(id){
      firebase.firestore().collection('postoscoletas').doc(id)
      .onSnapshot((doc) => {
        setIdPosto(id);
        setNome(doc.data().nome);
        setCep(doc.data().cep);
        setEndereco(doc.data().endereco);
        setBairro(doc.data().bairro);
        setCidade(doc.data().cidade);
        setEstado(doc.data().estado);
        setDestino(doc.data().destino);
      }) 
    }

    async function excluirPosto(id){
      await firebase.firestore().collection('postoscoletas').doc(id)
      .delete()
      .then(() => {
        alert('Posto de Coleta excluído com sucesso!');
        buscaPostos();
      })
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
                  id="outlined-required"
                  label="Id"
                  defaultValue="usar Id só para atualizar dados"
                  value={idPosto} onChange={(e) => setIdPosto(e.target.value)} />

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
  
                <Button fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}
                  onClick={handleAdd}>Enviar Formulário</Button><br />
  
                <Button fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}
                  onClick={editarPosto}>Atualizar Cadastro</Button><br />

              </Box>
            </Box>
          </Grid>
        </Grid>

        <div>
          <h2>Postos Cadastrados</h2>
          <ul>
            {postoscoletas.map((postocoleta) =>{
            return(
              <li key={postocoleta.id}>
                <span>ID: {postocoleta.id} </span> <br />
                <span>Nome: {postocoleta.nome} </span> <br />
                <span>Cep: {postocoleta.cep} </span> <br />
                <span>Endereço: {postocoleta.endereco} </span> <br/>
                <span>Bairro: {postocoleta.bairro} </span> <br/>
                <span>Destino: {postocoleta.destino} </span> 
                <button onClick={() => pegaPosto(postocoleta.id)}>Alterar</button>  
                <button onClick={() => excluirPosto(postocoleta.id)}>Excluir</button>
                <hr />

              </li>
              
              )
            })}
          </ul>
        </div>
      </ThemeProvider >

 
    );
}
  
export default Admpostocoleta;