import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
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
          eLixo
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

    useEffect(() => {
      async function checkLogin(){
        await firebase.auth().onAuthStateChanged((user) => {
          if(user){
//            alert('checkando login')
            setUser(true);
            setUserLogged({
              uid: user.uid,
              email: user.email
            });
          }else{
//            alert('sem login')
            setUser(false);
            setUserLogged({});

          }
        })
  
      }
  
      checkLogin();
      
    }, []);
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      // eslint-disable-next-line no-console
      console.log({
        email: data.get('email'),
        password: data.get('password'),
      });
//      alert(email + ' - ' + senha)
    };

    async function fazerLogin(){
//      alert('fazer login')
      await firebase.auth().signInWithEmailAndPassword(email, senha)
      .then( (value) => {
        setUser(true);
        setUserLogged({
          uid: user.uid,
          email: user.email
        });
      })
      .catch( (error) => {
        alert('Email e senha inválidos!')
        firebase.auth().signOut();
        setUser(false);
        setUserLogged({});
      })
    }
  
    return (
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(https://lh3.googleusercontent.com/proxy/usqTg6WRYROa8xmhFLGVKgkTKqwFZ8xGRZfpkY9uSu7a_-g3OO2mgVz45BHliFJaeTaoPMfMdDnsgZuPCJGpHzSPSaI)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Login
              </Typography>
              <Box component="form" Validate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Login"
                  name="name"
                  autoComplete="name"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
//                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Lembrar-me"
                />
                <Button 
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}   
                  color="primary"       
                >
                  Entrar
                </Button>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  }