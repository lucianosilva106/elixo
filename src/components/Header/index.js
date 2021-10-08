import './header.css';
import { styled, alpha } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { orange, green, white, grey, purple, amber, cyan } from '@material-ui/core/colors';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

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


export default function Header(){
    return(
        
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
            
          </IconButton>
          
          <Typography>
            <Button color="secondary" href="/">Home</Button>
            <Button color="secondary" href="/quemsomos">Quem Somos</Button>
            <Button color="secondary" href="/postocoleta">Postos de Coleta</Button>
            <Button color="secondary" href="/noticia">Notícias</Button>
            <Button color="secondary" href="/cadastre">Seja um Posto de Coleta</Button>
           </Typography>         

        </Toolbar>
      </AppBar>
    </Box>
    </ThemeProvider>
    </header>
    )
}