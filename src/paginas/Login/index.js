import * as React from 'react';
import './login.css'
import { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { orange, green } from '@material-ui/core/colors';
import firebase from 'firebase';
import Stack from '@material-ui/core/Stack'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/core/Alert';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';


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

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Re-user
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignInSide() {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [user, setUser] = useState(false);
  const [userLogged, setUserLogged] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });


  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const [duas, setDuas] = React.useState(false);
  const handleToggle = () => {
    setDuas(!open);
  };

  const DuasFunction = () => {
    handleToggle();
    fazerLogin();
  }

  const cadastrarCliente = () => {
    window.location.href = "/cadastro";
  }

  let meutipo = '';

  async function fazerLogin() {
    await firebase.auth().signInWithEmailAndPassword(email, senha)
      .then(async (value) => {
        setUser(true);
        setUserLogged({
          uid: user.uid,
          email: user.email
        });
        await firebase.firestore().collection('usuarios')
        .doc(value.user.uid)
        .get()
        .then((snapshot) => {
          meutipo = snapshot.data().tipo;
          localStorage.setItem('nomelogado', snapshot.data().nome)
          localStorage.setItem('tipouser', snapshot.data().tipo)
        })
//        if (meutipo === 'Administrador') {
//          window.location.href = "/gerenciamento"
//        }
//        if (meutipo === 'Usuario') {
//          window.location.href = "/gerenciamentousuario"
//        }
        window.location.href = "/produto"
      })
      .catch((error) => {
        handleClick();
        firebase.auth().signOut();
        setUser(false);
        setUserLogged({});
      })
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid id="loginbackground"
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'auto',
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
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Faça seu Login
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                //                  id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Endereço de e-mail"
                //                  name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                //                  name="password"
                label="Senha"
                type="password"
                //                  id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Lembrar-me"
              />
              <Button type="submit" fullWidth variant="contained" disableElevation sx={{ mt: 3, mb: 2, color: 'white' }}
                onClick={DuasFunction}
              >Entrar</Button>
              <Button type="submit" fullWidth variant="outlined" disableElevation sx={{ mt: 1, mb: 2, color: 'primary' }}
                onClick={cadastrarCliente}
              >Cadastre-se</Button>

              <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                  <Alert onClose={handleClose} severity="error" sx={{ width: '100%'}}>
                    Login ou senha incorretos!
                  </Alert>
                </Snackbar>
              </Stack>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={duas}
        onClick={DuasFunction}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </ThemeProvider>
  );
}

