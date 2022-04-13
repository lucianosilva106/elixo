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
import { CssBaseline } from '@material-ui/core';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import InfoIcon from '@material-ui/icons/Info';
import HomeIcon from '@material-ui/icons/Home';
import FlagIcon from '@material-ui/icons/Flag';
import MoreIcon from '@material-ui/icons/More';
import ListItemButton from '@material-ui/core/ListItemButton';


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

theme.typography.h1 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
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
theme.typography.h6 = {
  fontSize: '1rem',
  '@media (min-width:600px)': {
    fontSize: '1.1rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.2rem',
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

export default function Header() {

  async function checkLogin() {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
          window.location.href = '/produto';
      } else {
          window.location.href = '/login';
      }
    })
  }

  const HomeClick = () => {
    window.location.href = '/';
  };
  const QuemClick = () => {
    window.location.href = '/quemsomos';
  };
  const PostoClick = () => {
    window.location.href = '/postocoleta';
  };
  const NoticiaClick = () => {
    window.location.href = '/noticia';
  };
  const PainelClick = () => {
    var meutipo = localStorage.getItem('tipouser');
    if (meutipo == 'Administrador') {
      window.location.href = '/gerenciamento'
    }
    if (meutipo == 'Usuario') {
      window.location.href = '/gerenciamentousuario'
    }
  };

  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItemButton onClick={() => HomeClick()}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton onClick={() => QuemClick()}>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="Quem Somos" />
        </ListItemButton>
        <ListItemButton onClick={() => PostoClick()}>
          <ListItemIcon>
            <FlagIcon />
          </ListItemIcon>
          <ListItemText primary="Postos de Coleta" />
        </ListItemButton>
        <ListItemButton onClick={() => NoticiaClick()}>
          <ListItemIcon>
            <MoreIcon />
          </ListItemIcon>
          <ListItemText primary="Saiba Mais" />
        </ListItemButton>
        <ListItemButton onClick={() => PainelClick()}>
          <ListItemIcon>
            <MoreIcon />
          </ListItemIcon>
          <ListItemText primary="Painel de Controle" />
        </ListItemButton>

      </List>
      <Divider />
      <List>
        {['Login'].map((text, index) => (
          <ListItem onClick={checkLogin} button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <AccountCircleIcon onClick={checkLogin} /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (

    <header>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {['left'].map((anchor) => (
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" color="primary" elevation={0}>
              <Toolbar>
                <IconButton
                  id="menuresp"
                  size="large"
                  edge="start"
                  color="secondary"
                  aria-label="home"
                  sx={{ mr: 2 }}
                  onClick={toggleDrawer(anchor, true)}
                >
                  <MenuIcon>
                  </MenuIcon>

                </IconButton>
                <Box></Box>
                <Typography className="geral">
                  <Button color="secondary" href="/">Home</Button>
                  <Button color="secondary" href="/quemsomos">Quem Somos</Button>
                  <Button color="secondary" href="/postocoleta">Postos de Coleta</Button>
                  <Button color="secondary" href="/noticia">Saiba Mais </Button>
                  <Button color="secondary" onClick={PainelClick}>Painel de Controle</Button>
                  <Button color="secondary" onClick={checkLogin} variant="outlined" endIcon={<AccountCircleIcon />}>Acessar Loja</Button> 
                   {<text>{'    Seja bem-vindo, ' + localStorage.getItem('nomelogado') + '.'}</text>}
                </Typography>
              </Toolbar>
            </AppBar>
          </Box>))}

         

        {['left'].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)}></Button>
            <SwipeableDrawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
              onOpen={toggleDrawer(anchor, true)}
            >
              {list(anchor)}
            </SwipeableDrawer>
          </React.Fragment>
        ))}

      </ThemeProvider>

    </header>


  )
}