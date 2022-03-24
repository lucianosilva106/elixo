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
import CssBaseline from '@material-ui/core/CssBaseline';
import { InputLabel } from "@material-ui/core";
import Stack from '@material-ui/core/Stack'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/core/Alert';
import './cad.css'

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


function Cadastro() {


    const[email, setEmail] = useState('');
    const[senha, setSenha] = useState('');
    const[idusuario, setIdUsuario] = useState('');
    const[nome, setNome] = useState('');
    const[cep, setCep] = useState('');
    const[endereco, setEndereco] = useState('');
    const[bairro, setBairro] = useState('');
    const[cidade, setCidade] = useState('');
    const[estado, setEstado] = useState('');
    const[whatsapp, setWhatsapp] = useState('');
    const[tipo, setTipo] = useState('');

    const[user, setUser] = useState('false');
    const [userLogged, setUserLogged] = useState({});
    
    const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });  
    
    const [open, setOpen, aberto] = React.useState(false);

    const handleClick = () => {
      setOpen(true);
    };

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
  
    
    async function handleAdd(){
      await firebase.auth().createUserWithEmailAndPassword(email, senha)
      .then( async (value) => {
          alert('Usuário cadastrado com sucesso!')
          await firebase.firestore().collection('usuarios')
          .doc(value.user.uid)
          .set({
            nome: nome,
            cep: cep,
            endereco: endereco,
            bairro: bairro,
            cidade: cidade,
            estado: estado,
            whatsapp: whatsapp,
            tipo: 'Usuario'
          })
          firebase.auth().signOut();
          localStorage.clear();
          window.location.href = '/login';
      })
      .catch((error) => {
          if (error.code === 'auth/email-already-in-use'){
              alert('Este e-mail já está cadastrado! Informe sua senha apenas.');
          } else if (error.code === 'auth/weak-password'){
            alert('Senha muito fraca! Tente novamente.');
          } else if (error.code === 'auth/invalid-email'){
            alert('E-mail inválido! Tente novamente.');
          }
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
              
              <h2>Cadastro de Usuário / Cliente</h2>

              <TextField
                  fullWidth
                  margin="normal"
                  required
                  size="small"
                  id="email-form"
                  label="Email"
                  defaultValue="Email"
                  value={email} onChange={(e) => setEmail(e.target.value)} />

                <TextField
                  fullWidth
                  margin="normal"
                  required
                  size="small"
                  id="senha-form"
                  label="Senha"
                  defaultValue="Senha"
                  value={senha} onChange={(e) => setSenha(e.target.value)} />


                <TextField
                  fullWidth
                  margin="normal"
                  required
                  size="small"
                  id="cliente-form"
                  label="Nome do cliente"
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
  
                <TextField
                  fullWidth
                   margin="normal"
                  size="small"
                  id="outlined-textarea"
                  label="Whatsapp"
                  placeholder="Contato"
                  multiline value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
  
                <Button fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}
                  onClick={handleAdd}>Enviar Cadastro</Button><br /> <br />
  
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Usuário / Cliente cadastrado com sucesso!
          </Alert>
        </Snackbar>
        </Stack>

        <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={aberto} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            Erro na gravação do Usuário / Cliente
          </Alert>
        </Snackbar>
        </Stack>
      </ThemeProvider>
    );
}
  
export default Cadastro;