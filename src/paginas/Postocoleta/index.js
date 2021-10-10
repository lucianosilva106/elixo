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

function Postocoleta() {


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

      {postoscoletas.map((postocoleta) => {
        return (
          <Box
          spacing={2}
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
                    <Typography variant="body2" color="text.secondary"> {postocoleta.cep} </Typography>
                    <Typography variant="body2" color="text.secondary">{postocoleta.endereco} </Typography>
                    <Typography variant="body2" color="text.secondary">{postocoleta.bairro} </Typography>
                    <Typography variant="body2" color="text.secondary">{postocoleta.destino} </Typography>

                  </CardContent>
                </CardActionArea>
              </Card>
           <br />
          </Box>

        )
      })}


    </Container>
  )
}

export default Postocoleta;