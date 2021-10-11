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
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Stack from '@material-ui/core/Stack';


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

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const [nome, setNome] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [bairro, setBairro] = useState('');
  const [destino, setDestino] = useState('');
  const [postoscoletas, setPostoscoletas] = useState([]);

  useEffect(() => {
    async function loadPostos() {
      await firebase.firestore().collection('postoscoletas')
        .onSnapshot((doc) => {
          let meusPostos = [];
          doc.forEach((item) => {
            meusPostos.push({
              nome: item.data().nome,
              cep: item.data().cep,
              endereco: item.data().endereco,
              bairro: item.data().bairro,
              destino: item.data().destino
            })
          })

          setPostoscoletas(meusPostos);
        })
    }

    loadPostos();

  })

  async function buscaPostos() {
    await firebase.firestore().collection('postoscoletas')
      .get()
      .then((snapshot) => {
        let lista = [];

        snapshot.forEach((doc) => {
          lista.push({
            nome: doc.data().nome,
            cep: doc.data().cep,
            endereco: doc.data().endereco,
            bairro: doc.data().bairro,
            destino: doc.data().destino

          })
        })
        setPostoscoletas(lista);
        alert('setou postos');

      })
      .catch(() => {

      })
  }

  return (
    <Container fixed>

      <h1>Postos de Coleta</h1><br />

      <Stack direction="row" spacing={2}>

      {postoscoletas.map((postocoleta) => {
        return (
          <Box
            spacing={2}
            cols={3}
            key={postocoleta.id}>

            <Card direction="row" sx={{ maxWidth: 250, backgroundColor: '#fafafa' }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://cdn.pixabay.com/photo/2021/01/30/14/23/man-5963976_960_720.jpg"
                  alt="posto de coleta"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div"> {postocoleta.nome} </Typography>               
                </CardContent>
              </CardActionArea>

              <IconButton sx={{
                top: '50%', 
                left: '42%',
              }}
              aria-label="circle" onClick={handleClickOpen}><AddCircleIcon /></IconButton>
            </Card>
            <br />
          </Box>
        )
      })}
      </Stack>

{postoscoletas.map((postocoleta) => {

  <div>

        <BootstrapDialog 
          key={postocoleta.id}
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
            Modal title
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <Typography>
            {postocoleta.nome}
            </Typography>
            <Typography>
            {postocoleta.cep}
            </Typography>
            <Typography>
            {postocoleta.endereco}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Save changes
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>
})}

    </Container>
  )
  
}

export default Postocoleta;