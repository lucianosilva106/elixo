import firebase from '../../firebaseConnection';
import 'firebase/auth';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { TextField } from "@material-ui/core";
import { orange, blueGrey } from '@material-ui/core/colors';
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

const theme = createTheme({
  palette: {
    primary: {
      main: blueGrey[500],
    },
    secondary: {
      main: orange[500],
    },
  },
});


function Meucadastro() {

    const[idusuario,setIdusuario] = useState('');
    const[nome, setNome] = useState('');
    const[cep, setCep] = useState('');
    const[endereco, setEndereco] = useState('');
    const[bairro, setBairro] = useState('');
    const[cidade, setCidade] = useState('');
    const[estado, setEstado] = useState('');
    const[whatsapp, setWhatsapp] = useState('');

   
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
      async function checkLogin(){
        await firebase.auth().onAuthStateChanged(async (user) => {
          if(user){
            await firebase.firestore().collection('usuarios')
            .doc(user.uid)
            .get()
            .then((snapshot) => {
              setIdusuario(user.uid)
              setNome(snapshot.data().nome)
              setCep(snapshot.data().cep)
              setEndereco(snapshot.data().endereco)
              setBairro(snapshot.data().bairro)
              setCidade(snapshot.data().cidade)
              setEstado(snapshot.data().estado)
              setWhatsapp(snapshot.data().whatsapp)
            })
          }else{
            firebase.auth().signOut();
            localStorage.clear();
            window.location.href = '/login';
          }
        })
      }

      checkLogin();

    }, [])  

    async function atualizaUsuario(){
        await firebase.firestore().collection('usuarios')
        .doc(idusuario)
        .update({
          nome: nome,
          cep: cep,
          endereco: endereco,
          bairro: bairro,
          cidade: cidade,
          estado: estado,
          whatsapp: whatsapp
        })
        firebase.firestore().collection('usuarios')
        .doc(idusuario)
        .get()
        .then((snapshot) => {
          setNome(snapshot.data().nome)
          setCep(snapshot.data().cep)
          setEndereco(snapshot.data().endereco)
          setBairro(snapshot.data().bairro)
          setCidade(snapshot.data().cidade)
          setEstado(snapshot.data().estado)
          setWhatsapp(snapshot.data().whatsapp)
        })
    }

    function voltarMenu(){
        window.location.href = '/gerenciamentousuario';
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
              
              <h2>Meus dados cadastrais</h2>

                <TextField
                  fullWidth
                  margin="normal"
                  required
                  size="small"
                  id="usuario-form"
                  label="Usuario"
                  defaultValue="Usuario"
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
                  id="outlined-required"
                  label="Whatsapp"
                  type="text"
                  defaultValue="Whatsapp" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />


                <Button fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}
                  onClick={atualizaUsuario}>Atualizar Cadastro</Button><br />

                <Button fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}
                  onClick={voltarMenu}>Voltar ao Menu</Button><br />

              </Box>
            </Box>
          </Grid>
        </Grid>

        <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Usuário / Cliente atualizado com sucesso!
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
    </ThemeProvider>
   
    );
}
  
export default Meucadastro;