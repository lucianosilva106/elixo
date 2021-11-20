import Routes from './routers';
import * as React from 'react';
import './styles.css';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { orange, green, grey } from '@material-ui/core/colors';
import { useQuery } from "graphql-hooks";
import CircularProgress from '@material-ui/core/CircularProgress';
import { Box } from '@material-ui/system';
import Tooltip from '@material-ui/core/Tooltip'
import Fab from '@material-ui/core/Fab';
import StarIcon from '@material-ui/icons/Star';
import Avaliacao from "../src/paginas/Avaliacao";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import { Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { IconButton } from '@material-ui/core';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';
import {ptBR} from '@material-ui/core/locale'


const HOMEPAGE_QUERY = `query HomePage($limit: IntType) {
  allArtigos(first: $limit) {
    titulo
    tumbnail {
      responsiveImage(imgixParams: { fit: crop, w: 300, h: 300, auto: format }) {
        srcSet
        webpSrcSet
        sizes
        src
        width
        height
        aspectRatio
        alt
        title
        base64
      }
    }
  }
}`;

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
  ptBR,
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
theme.typography.p = {
  fontSize: '0.8rem',
  '@media (min-width:600px)': {
    fontSize: '0.9rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1rem',
  },
};

function App() {

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const [open, setOpen, aberto] = React.useState(false);

  const [abrir, setAvaliar] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAvaliar(false);
    window.location.href = '../';
  };

  const abrirAvaliacao = () => {
    setAvaliar(true);
  };

  const { loading, error, data } = useQuery(HOMEPAGE_QUERY, {
    variables: {
      limit: 10
    }
  });
  if (loading) return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        display: 'flex',
        align: 'center',
        justifyContent: 'center',
        top: '50%',
        left: '50%',
        position: 'fixed'
      }}>
        <CircularProgress color="primary" />
      </Box>
    </ThemeProvider>);
  if (error) return "Something Bad Happened";

  function Copyright(props) {
    return (
      <Typography variant="p" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="/">
          Re-User
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  return (
    <div>
      <Routes />
      <ThemeProvider theme={theme}>
        <Box sx={{
          display: 'grid', width: '100%', justifyContent: 'flex-end',
          alignItems: 'center', zIndex: '1500',
        }}>
          <Tooltip title="Avalie-nos">
            <Fab sx={{
              justifyContent: 'center',
              alignSelf: 'flex-end', alignItems: 'center',
            }}
              onClick={abrirAvaliacao}
              size="small" color="primary">
              <StarIcon />
            </Fab>
          </Tooltip>
        </Box>

        <Dialog
          sx={{ justifyContent: 'center', alignItems: 'center', }}
          open={abrir}
          TransitionComponent={Transition}
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Sua opinião é muito importante para nós!"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Quanto a iniciativa do site, achou interessante?
            </DialogContentText>
            <Avaliacao />
          </DialogContent>
        </Dialog>

        <footer className="footer">
          <div className="footer__social">
            <IconButton aria-label="InstagramIcon" href="https://www.instagram.com.br">
              <InstagramIcon />
            </IconButton>
            <IconButton aria-label="FacebookIcon" href="https://www.facebook.com.br">
              <FacebookIcon />
            </IconButton>
            <IconButton aria-label="YouTubeIcon" href="https://www.youtube.com.br">
              <YouTubeIcon />
            </IconButton>
          </div>
          <Typography variant="p" className="footer__copyright" sx={{ color: 'textos.main' }}><Copyright sx={{ mt: 5 }} /></Typography>
        </footer>
      </ThemeProvider>
    </div>
  );


}

export default App;
