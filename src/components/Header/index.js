import * as React from 'react';
import firebase from '../../firebaseConnection';
import 'firebase/auth';
import 'firebase/storage';
import './header.css';
import { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import { green } from '@material-ui/core/colors';
import { createTheme, ThemeProvider, styled } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { CssBaseline, Menu, Container, Avatar, Tooltip, MenuItem, Badge } from '@material-ui/core';
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
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
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

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

export default function Header() {

  var storage = firebase.storage();
  const [pathimagem, setPathimagem] = useState('');

  var storage = firebase.storage();

  async function checkLogin() {

    if (localStorage.getItem('nomelogado') == null) {
      window.location.href = '/login';
    } else {
      window.location.href = '/produto';
    }

  }

  const HomeClick = () => {
    window.location.href = '/landingpage';
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
  const TermoClick = () => {
    window.location.href = '/termo';
  };
  const MeuCadastroClick = () => {
    if (localStorage.getItem('nomelogado') == null) {
      window.location.href = '/login';
    } else {
      window.location.href = '/meucadastro';
    }
  };
  const MeuCarrinhoClick = () => {
    if (localStorage.getItem('nomelogado') == null) {
      window.location.href = '/login';
    } else {
      window.location.href = '/carrinhocompra';
    }
  };
  const painelClick = () => {
    checkLogin();
    var meutipo = localStorage.getItem('tipouser');
    if (meutipo == 'Administrador') {
      window.location.href = '/gerenciamento'
    }
    if (meutipo == 'Usuario') {
      window.location.href = '/gerenciamentousuario'
    }
  };

  function fazerLogout() {
    firebase.auth().signOut();
    localStorage.clear();
    window.location.href = '/login';
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
        <ListItemButton onClick={() => painelClick()}>
          <ListItemIcon>
            <MoreIcon />
          </ListItemIcon>
          <ListItemText primary="Painel de Controle" />
        </ListItemButton>
        <ListItemButton onClick={() => checkLogin()}>
          <ListItemIcon>
            <MoreIcon />
          </ListItemIcon>
          <ListItemText primary="Acesso a Loja" />
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

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    async function checkCad() {
      await firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          await firebase.firestore().collection('usuarios')
            .doc(user.uid)
            .get()
            .then((snapshot) => {
              setPathimagem(snapshot.data().pathimagem)
            })
        }
      })
    }

    checkCad();

  }, [])

  return (

    <header>
      <ThemeProvider theme={theme}>
        {/* <CssBaseline />
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
                <Typography className="geral">
                  <Button color="secondary" href="/">Home</Button>
                  <Button color="secondary" href="/quemsomos">Quem Somos</Button>
                  <Button color="secondary" href="/noticia">Saiba Mais </Button>
                  <Button color="secondary" onClick={painelClick}>Painel de Controle</Button>
                  <Button color="secondary" onClick={checkLogin} variant="outlined" endIcon={<AccountCircleIcon />}>Entrar</Button> 
                  {<text>{'    Seja bem-vindo, ' + localStorage.getItem('nomelogado') + '.'}</text>} 
                </Typography>
              </Toolbar>
            </AppBar>
        </Box>))} */}

        <AppBar position="fixed" color="primary" elevation={0} sx={{ color: 'secondary.main' }}>
          <Container maxWidth="xl" sx={{ color: 'secondary.main' }}>
            <Toolbar disableGutters sx={{ color: 'secondary.main' }}>


              {/* <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover' }}
                onClick={checkLogin}
              >
                Re-user
      </Typography>*/}

              <Box id="headerlogo"
              noWrap
                onClick={checkLogin}
                sx={{
                  mr: 2, display: { xs: 'none', md: 'flex' },
                  backgroundRepeat: 'no-repeat',
                  width: 50,
                  height: 50,
                }} />

              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, color: 'secondary.main' }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                    color: 'textos.main'
                  }}
                >
                  <MenuItem textAlign="center" color="secondary" onClick={HomeClick}>Home</MenuItem>
                  <MenuItem textAlign="center" color="secondary" onClick={QuemClick}>Quem Somos</MenuItem>
                  <MenuItem textAlign="center" color="secondary" onClick={NoticiaClick}>Saiba Mais</MenuItem>
                  <MenuItem textAlign="center" color="secondary" onClick={checkLogin} variant="outlined" endIcon={<AccountCircleIcon />}>Entrar</MenuItem>
                </Menu>
              </Box>

              <Box id="headerlogo"
                onClick={checkLogin}
                sx={{
                  backgroundRepeat: 'no-repeat',
                  width: 50,
                  height: 50,
                  flexGrow: 1, display: { xs: 'flex', md: 'none' } 
                }} />

              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, color: 'textos.main' }}>
                <Typography className="geral">
                  <Button color="secondary" href="/landingpage">Home</Button>
                  <Button color="secondary" href="/quemsomos">Quem Somos</Button>
                  <Button color="secondary" href="/noticia">Saiba Mais</Button>
                  <Button color="secondary" onClick={checkLogin} variant="outlined" endIcon={<AccountCircleIcon />}>Entrar</Button>
                </Typography>
              </Box>

              <IconButton aria-label="cart" onClick={MeuCarrinhoClick} >
                <ShoppingCartIcon />
              </IconButton>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Login">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar sx={{ border: 2, borderColor: 'secondary.main' }} alt="imagem" src={pathimagem} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px', color: 'textos.main' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem textAlign="center" disabled><Typography variant='p' color="textos.main">{'Olá, ' + localStorage.getItem('nomelogado') + '.'}</Typography></MenuItem>
                  <Divider />
                  <MenuItem textAlign="center" onClick={MeuCadastroClick}>Meu Perfil</MenuItem>
                  <MenuItem textAlign="center" onClick={painelClick}>Painel de Controle</MenuItem>
                  <MenuItem textAlign="center" onClick={TermoClick}>Ajuda</MenuItem>
                  <MenuItem textAlign="center" onClick={fazerLogout}>Logout</MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

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