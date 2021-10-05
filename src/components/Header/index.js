import './header.css';
import { styled, alpha } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { orange, green, white, grey } from '@material-ui/core/colors';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: green[500],
      },
      secondary: {
        main: '#fff',
      },
    },
  });

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'secondary',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

export default function Header(){
    return(
        
<header>
<ThemeProvider theme={theme}>
 <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="secondary"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography>
            <Button color="secondary" href="/">O Projeto</Button>
            <Button color="secondary" href="/reciclavel">Os Recicláveis</Button>
            <Button color="secondary" href="/dano">Os danos</Button>
            <Button color="secondary" href="/acao">As ações</Button>
            <Button color="secondary" href="/nossoapp">Nosso Aplicativo</Button>
            <Button color="secondary" href="/contato">Fale Conosco</Button>          
           </Typography>         
           <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              color="secondary"
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

        </Toolbar>
      </AppBar>
    </Box>
    </ThemeProvider>
    </header>
    )
}