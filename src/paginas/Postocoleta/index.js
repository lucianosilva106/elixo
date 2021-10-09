import firebase from '../../firebaseConnection';
import React, {useMemo} from 'react';
import { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import { CellWifiOutlined } from '@material-ui/icons';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { CardActionArea } from '@material-ui/core';

function Postocoleta() {


    const[nome, setNome] = useState('');
    const[cep, setCep] = useState('');
    const[endereco, setEndereco] = useState('');
    const[bairro, setBairro] = useState('');
    const[destino, setDestino] = useState('');
    const[postoscoletas, setPostoscoletas] = useState([]);

    useEffect(() => {
      async function loadPostos(){
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

    async function buscaPostos(){
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

    return(
      <div className="container">

      <h1>Relacao de Posto de Coleta</h1><br />

      <button onClick={ buscaPostos }>Atualizar</button> <br/>
      
      <ul>
        {postoscoletas.map((postocoleta) =>{
          return(
            <li key={postocoleta.id}>
              <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardContent>
        <Typography gutterBottom variant="h5" component="div"> {postocoleta.nome} </Typography> 
        <Typography variant="body2" color="text.secondary"> {postocoleta.cep} </Typography>
              <span>Endereço: {postocoleta.endereco} </span> <br/>
              <span>Bairro: {postocoleta.bairro} </span> <br/> 
              <span>Destino: {postocoleta.destino} </span> 
              
              </CardContent>
      </CardActionArea>
    </Card>
            </li>
            
          )
        })}
      </ul>

    </div>
  )
}

export default Postocoleta;