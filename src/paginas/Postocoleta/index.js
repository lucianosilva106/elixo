import firebase from '../../firebaseConnection';
import React, { useMemo } from 'react';
import { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import { CellWifiOutlined } from '@material-ui/icons';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { CardActionArea, Container } from '@material-ui/core';
import { Box } from '@material-ui/system';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
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
import Collapse from 'react-bootstrap/Collapse';

function Postocoleta() {

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

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
  let mostraend = '';
  const flagmostra = 2;

  const [open, setOpen] = useState(false);

  function handleToogle(id) {
    const postos = postoscoletas.map(item => {
      if (item.id === id) item.isOpen = !item.isOpen
      return item
    })
    setPostoscoletas(postos)
  }

<<<<<<< HEAD
  function handleOnOpen(id){
    setOpen(true);
    return handleToogle(id)
  }

  function handleOnClose(id){
    setOpen(false);
=======
  function handleOnOpen(id) {
    setOpen(true)
    return handleToogle(id)
  }

  function handleOnClose(id) {
    setOpen(false)
>>>>>>> 4a5693b1641e3ee4f4edb4323b0401cdada606e5
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
              nome: item.data().nome,
              cep: item.data().cep,
              endereco: item.data().endereco,
              bairro: item.data().bairro,
              cidade: item.data().cidade,
              estado: item.data().estado,
              destino: item.data().destino,
            })
          })
          setPostoscoletas(meusPostos);
        })
    }

    loadPostos();

  },[])

  return (
    <Container fixed>

      <h1>Postos de Coleta</h1><br />

      <Stack direction={{ xs: 'column', sm: 'row' }}
        divider={<Divider orientation="vertical" flexItem />}
        spacing={{ sm: 2, md: 2 }}
        alignItems="center"
        ustifyContent="center">

        {postoscoletas.map((postocoleta) => {
          mostraend = '';
          if (postocoleta.isOpen === true){
            mostraend = postocoleta.endereco;
          }
          return (
            <Grid
              key={postocoleta.id}>

              <Card sx={{ maxWidth: 250, minWidth: 50, backgroundColor: '#fafafa' }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://cdn.pixabay.com/photo/2021/01/30/14/23/man-5963976_960_720.jpg"
                    alt="posto de coleta"
                  />
                  <CardContent>
                    <Typography gutterBottom component="div"> {postocoleta.nome} </Typography>
                  </CardContent>
                </CardActionArea>

                <IconButton sx={{
                  top: '50%',
                  left: '42%',
                }}
                  aria-label="circle"
                  onClick={() => handleOnOpen(postocoleta.id)}><AddCircleIcon />
                </IconButton>
              </Card>
              <p>{postocoleta.isOpen}</p>
              {postocoleta.isOpen && (
                <div>
<<<<<<< HEAD
                  <p>{postocoleta.endereco}</p>
                  <p>{postocoleta.bairro}</p>
                  <p>{postocoleta.cidade}</p>
                  <p>{postocoleta.estado}</p>
                  <p>{postocoleta.destino}</p>
=======
                  <Button variant="outlined" onClick={handleOnOpen}>
                    Open alert dialog
                  </Button>
                  <Dialog
                    open={open}
                    onClose={handleOnClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Use Google's location service?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        <p>{postocoleta.id}</p>
                        <p>{postocoleta.destino}</p>
                        <p>{postocoleta.endereco}</p>
                        <p>{postocoleta.bairro}</p>
                        <p>{postocoleta.cidade}</p>
                        <p>{postocoleta.estado}</p>
                        <p>{postocoleta.destino}</p>
                        <button onClick={() => handleOnClose(postocoleta.id)}>Fechar</button>
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleOnClose}>Disagree</Button>
                      <Button onClick={() => handleOnClose(postocoleta.id)} autoFocus>
                        Agree
                      </Button>
                    </DialogActions>
                  </Dialog>
>>>>>>> 4a5693b1641e3ee4f4edb4323b0401cdada606e5
                </div>
              )}

              <br />
            </Grid>
          )
        })}
      </Stack>
    </Container>
  )

}

export default Postocoleta;