import firebase from '../../firebaseConnection';
import React from 'react';
import { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { CardActionArea, Container } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Stack from '@material-ui/core/Stack';
import Divider from '@material-ui/core/Divider';
import { Box } from '@material-ui/system';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { orange, green, grey } from '@material-ui/core/colors';

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

function Postocoleta() {


  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };

  const [postoscoletas, setPostoscoletas] = useState([]);

  const [open, setOpen] = useState(false);

  function handleToogle(id) {
    const postos = postoscoletas.map(item => {
      if (item.id === id) item.isOpen = !item.isOpen
      return item
    })
    setPostoscoletas(postos)
  }

  function handleOnOpen(id) {
    setOpen(true);
    return handleToogle(id)
  }

  function handleOnClose(id) {
    setOpen(false);
    return handleToogle(id)

  }

  useEffect(() => {
    async function loadPostos() {
      await firebase.firestore().collection('postoscoletas')
        .onSnapshot((doc) => {
          let meusPostos = [];
          doc.forEach((item) => {
            meusPostos.push({
              id: item.id,
              ativo: item.data().ativo,
              nome: item.data().nome,
              cep: item.data().cep,
              endereco: item.data().endereco,
              bairro: item.data().bairro,
              cidade: item.data().cidade,
              estado: item.data().estado,
              destino: item.data().destino,
              localizacao: item.data().localizacao,
              latitude: item.data().latitude,
              longitude: item.data().longitude
            })
          })
          setPostoscoletas(meusPostos);
        })
    }

    loadPostos();

  }, [])

  function handleRedirect(redireciona) {
    window.open(redireciona);

  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: '#fafafa',
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h1"
            align="center"
            gutterBottom
            sx={{color:'primary.main'}}
          >
            Postos de Coleta
          </Typography>
          <Typography variant="h2" align="center" color="text.secondary" paragraph>
            Confira os principais Postos de Coleta dos materiais eletrônicos na sua região.
          </Typography>
        </Container>
      </Box>

    <Container fixed
    sx={{marginTop: '2%'}}>
      
      <Stack direction={{ xs: 'column', sm: 'row' }}
        spacing={{ sm: 2, md: 2 }}
        alignItems="center"
        justifyContent="center"
        sx={{
          alignItems: 'center',
          alignSelf: 'center',
          justifySelf: 'center'
        }}>

        {postoscoletas.map((postocoleta) => {
          if (postocoleta.ativo) {
            return (
              <Grid sx={{
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                justifySelf: 'center'
              }}
                key={postocoleta.id}>

                <Card sx={{ maxWidth: 250, minWidth: 50, 
                  backgroundColor: '#fafafa', justifyContent: 'center', alignItems: 'center', boxShadow: 5 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image="https://cdn.pixabay.com/photo/2021/01/30/14/23/man-5963976_960_720.jpg"
                      alt="posto de coleta"
                    />
                    <CardContent sx={{
                      justifyContent: 'center', alignItems: 'center', alignSelf: 'center',
                      justifySelf: 'center'
                    }}>
                      <Typography gutterBottom component="div"> {postocoleta.nome} </Typography>
                    </CardContent>
                  </CardActionArea>

                  <IconButton sx={{
                    top: '50%',
                    left: '42%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    justifySelf: 'center'
                  }}
                    aria-label="circle"
                    onClick={() => handleOnOpen(postocoleta.id)}><AddCircleIcon 
                    sx={{ alignSelf: 'center', justifyContent: 'center', color: 'primary.main' }} />
                  </IconButton>
                </Card>
                <p>{postocoleta.isOpen}</p>
                {postocoleta.isOpen && (
                  <div>
                    <Dialog
                      open={open}
                      onClose={() => handleOnClose(postocoleta.id)}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle variant="h5" sx={{color:'primary.main'}} id="alert-dialog-title">
                        {postocoleta.nome}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">                        
                          <Typography variant="h6" gutterBottom>Endereço:</Typography>
                          <Typography variant="p" gutterBottom>{postocoleta.endereco} - </Typography>
                          <Typography variant="p" gutterBottom>{postocoleta.bairro} - </Typography>
                          <Typography variant="p" gutterBottom>{postocoleta.cidade}/</Typography>
                          <Typography variant="p" gutterBottom>{postocoleta.estado}</Typography>
                          <Typography variant="h6" gutterBottom>Destino Final do Material:</Typography>
                          <Typography variant="p" gutterBottom>{postocoleta.destino}</Typography>
                          <Typography variant="h6" gutterBottom hidden>Localizacao:</Typography>
                          <Typography variant="p" gutterBottom hidden>{postocoleta.localizacao}</Typography>
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button variant="outlined" disableElevation size="small"
                          onClick={() => handleRedirect(postocoleta.localizacao)} autoFocus>
                          Como chegar
                        </Button>

                      </DialogActions>
                    </Dialog>
                  </div>
                )}
              </Grid>
            )
          }
        })}
      </Stack>
    </Container>
    </ThemeProvider>
  )

}

export default Postocoleta;