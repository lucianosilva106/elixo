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
        {['Home', 'Quem Somos', 'Postos de Coleta', 'Saiba Mais'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
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
                size="large"
                edge="start"
                color="secondary"
                aria-label="home"
                sx={{ mr: 2 }}
                onClick={toggleDrawer(anchor, true)}
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