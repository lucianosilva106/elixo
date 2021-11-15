import firebase from '../../firebaseConnection';
import 'firebase/auth';
import { useEffect, useState } from 'react';
import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Container from '@material-ui/core/Container';
import DeleteIcon from '@material-ui/icons/Delete';
import { green, orange, grey } from '@material-ui/core/colors';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Stack from '@material-ui/core/Stack'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/core/Alert';
import { Typography } from '@material-ui/core';

import { useQuery } from "graphql-hooks";
import { Image } from 'react-datocms';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Box } from '@material-ui/system';
import { Grid } from '@material-ui/core';

{/*
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Noticia() {

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [abrir, setAbrir] = React.useState(false);
  const abrirAlert = () => {
    setAbrir(true);
  };

  const [open, setOpen, excluiu] = React.useState(false);

  async function checkLogin() {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
      } else {
        firebase.auth().signOut();
        localStorage.clear();
        window.location.href = '/login';
      }
    })
  }

  checkLogin();

  const [noticias, setNoticias] = useState([]);
  
  function handleToogle(id) {
    const lista = noticias.map(item => {
      if (item.id === id) item.isOpen = !item.isOpen
      return item
    })
    setNoticias(lista)
  }

  const handleClick = (id) => {
    setOpen(true);
    return handleToogle(id)
  };

  const handleClose = (id) => {
    setOpen(false);
    return handleToogle(id)
  };

  useEffect(() => {
    async function loadNoticias() {
      await firebase.firestore().collection('noticias')
        .onSnapshot((doc) => {
          let minhasNoticias = [];
          doc.forEach((item) => {
            minhasNoticias.push({
              id: item.id,
              titulo: item.data().titulo,
              descricao: item.data().descricao,
              data: item.data().data,
              autor: item.data().autor,
              tag: item.data().tag,
              link: item.data().link
            })
          })

          setNoticias(minhasNoticias);
        })
    }

    loadNoticias();

  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Container fixed id="topo"
      sx={{height: 150, marginTop: 6}}>
        <Typography variant="h3" gutterBottom component="div" align="center">
          Noticias

        </Typography>
      </Container>
      <Container fixed>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead sx={{ color: 'primary' }}>
              <TableRow>
                <TableCell align="center">Titulo</TableCell>
                <TableCell align="center">Descricao</TableCell>
                <TableCell align="center">Data</TableCell>
                <TableCell align="center">Autor</TableCell>
                <TableCell align="center">Tag</TableCell>
                <TableCell align="center">Link</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {noticias.map((noticia) => {
                return (
                  <TableRow key={noticia.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">{noticia.titulo}</TableCell>
                    <TableCell align="center">{noticia.descricao}</TableCell>
                    <TableCell align="center">{noticia.data}</TableCell>
                    <TableCell align="center">{noticia.autor}</TableCell>
                    <TableCell align="center">{noticia.tag}</TableCell>
                    <TableCell align="center" class="clickable-row" data-href='{noticia.link}'>{noticia.link}</TableCell>
                  </TableRow>
              )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
}

export default Noticia;*/}

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

const HOMEPAGE_QUERY = `query HomePage($limit: IntType) {
  allArtigos(first: $limit) {
    titulo
    descricao
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

function Noticia() {

  const { loading, error, data } = useQuery(HOMEPAGE_QUERY, {
    variables: {
      limit: 10
    }
  });
  if (loading) return (
    <ThemeProvider theme={theme}>
    <Box sx={{ display: 'flex', 
    alignSelf: 'center', 
    top: '50%', 
    left: '50%', 
    position: 'fixed' }}>
  <CircularProgress color="primary" />
  </Box>
  </ThemeProvider>);
  if (error) return "Erro de conexão";

    return (
      <ThemeProvider theme={theme}>
      <><Box
        sx={{
          bgcolor: '#fafafa',
          pt: 8,
          pb: 6,
        }}
      >
        <Typography
          component="h1"
          variant="h1"
          align="center"
          gutterBottom
          sx={{ color: 'primary.main' }}
        >
          Informações
        </Typography>
        <Typography variant="h2" align="center" color="text.secondary" paragraph>
          Confira as principais informações, curiosidades e dicas sobre o descartes de materiais eletrônicos.
        </Typography>
      </Box><Container fixed>

          {data.allArtigos.map(artigo => (
            <Stack direction={{ xs: 'column', sm: 'row' }}
            spacing={{ sm: 2, md: 2 }}>
            <Grid>
              <Card sx={{ maxWidth: 250, minWidth: 50, justifyContent: 'center', alignItems: 'center' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={artigo.tumbnail} />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {artigo.titulo}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" fullWidth variant="contained">Saiba mais</Button>
                </CardActions>
              </Card>
            </Grid>
            </Stack>
          ))}
        </Container></>
        </ThemeProvider>
    );
}
  
export default Noticia;