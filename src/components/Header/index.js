import * as React from 'react';
import firebase from '../../firebaseConnection';
import 'firebase/auth';
import './header.css';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import { green } from '@material-ui/core/colors';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },
    secondary: {
      main: green[500],
    },
  },
});


export default function Header() {

  async function checkLogin() {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        window.location.href = '/gerenciamento';

      } else {
        window.location.href = '/login';
      }
    })
  }

  return (

    <header>
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="fixed" color="primary" elevation={0}>
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="secondary"
                aria-label="home"
                sx={{ mr: 2 }}
                href="/"
              >
                <MenuIcon>
                </MenuIcon>

              </IconButton><Typography>
                <Button color="secondary" href="/">Home</Button>
                <Button color="secondary" href="/quemsomos">Quem Somos</Button>
                <Button color="secondary" href="/postocoleta">Postos de Coleta</Button>
                <Button color="secondary" href="/noticia">Saiba Mais </Button>
                <Button color="secondary" onClick={checkLogin} variant="outlined" endIcon={<AccountCircleIcon />}>Login</Button>
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>

      </ThemeProvider>
    </header>
  )
}