import firebase from '../../firebaseConnection';
import 'firebase/auth';
import * as React from 'react';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { TextField, Avatar, FormControlLabel, Checkbox, Link, Container, Typography } from "@material-ui/core";
import { orange, green, grey } from '@material-ui/core/colors';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { InputLabel } from "@material-ui/core";
import Stack from '@material-ui/core/Stack'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/core/Alert';
import HowToRegIcon from '@material-ui/icons/HowToReg';

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
  
    
    async function handleAdd(){
      await firebase.auth().createUserWithEmailAndPassword(email, senha)
      .then( async (value) => {
          handleClick1()
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
            handleClick2();
          }
      })
    }

    return (
      <ThemeProvider theme={theme}>


<Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <HowToRegIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Cadastre-se
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
              <TextField
                  fullWidth
                  required
                  size="small"
                  id="cliente-form"
                  label="Nome e Sobrenome"
                  defaultValue="Cliente"
                  autoComplete='cliente'
                  value={nome} onChange={(e) => setNome(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
              <TextField
                  fullWidth
                  required
                  size="small"
                  id="email-form"
                  label="Email"
                  type="email"
                  defaultValue="Email"
                  autoComplete='email'
                  value={email} onChange={(e) => setEmail(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
              <TextField
                  fullWidth
                  required
                  size="small"
                  id="senha-form"
                  label="Senha"
                  type="password"
                  defaultValue="Senha"
                  value={senha} onChange={(e) => setSenha(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
              <TextField
                  fullWidth
                  required
                  size="small"
                  id="senha-form"
                  label="Confirmar senha"
                  type="password"
                  defaultValue="Senha" />
              </Grid>
              <Grid item xs={12}>
              <TextField
                  fullWidth
                  size="small"
                  id="outlined-required"
                  label="Endereço"
                  type="text"
                  defaultValue="Rua" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
                  fullWidth
                  size="small"
                  id="outlined-required"
                  label="CEP"
                  type="number"
                  defaultValue="CEP" value={cep} onChange={(e) => setCep(e.target.value)} />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
                  fullWidth
                  size="small"
                  id="outlined-required"
                  label="Bairro"
                  type="text"
                  defaultValue="Rua" value={bairro} onChange={(e) => setBairro(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
              <TextField
                  fullWidth
                  size="small"
                  id="outlined-required"
                  label="Cidade"
                  type="text"
                  defaultValue="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />
              </Grid>
              <Grid item xs={12} sm={6}>
              <InputLabel id="demo-simple-select-helper-label">Estado</InputLabel>
                <Select
                  fullWidth
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
              <Grid item xs={12} sm={6}>
              <TextField
              margin='normal'
                  fullWidth
                  size="small"
                  id="outlined-textarea"
                  label="Whatsapp"
                  placeholder="Contato"
                  type="tel"
                  value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  component="h4"
              variant="h4"
                  label="Concordo e estou ciente dos Termos de Uso e Privacidade presentes nessa plataforma."
                />
              </Grid>
            </Grid>
            <Button fullWidth variant="contained" disableElevation sx={{ mt: 3, mb: 2, color: 'white' }}
                  onClick={handleAdd}>Enviar</Button>
          </Box>
        </Box>
      </Container>



        <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Cadastrado realizado com sucesso!
          </Alert>
        </Snackbar>
        </Stack>

        <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={aberto} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            Dados preenchidos incorretamente!
          </Alert>
        </Snackbar>
        </Stack>
      </ThemeProvider>
    );
}
  
export default Cadastro;