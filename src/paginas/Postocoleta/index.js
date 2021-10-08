import firebase from '../../firebaseConnection';
import React, {useMemo} from 'react';
import { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import { CellWifiOutlined } from '@material-ui/icons';

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
              <span>Nome: {postocoleta.nome} </span> <br />
              <span>Cep: {postocoleta.cep} </span> <br />
              <span>Endereço: {postocoleta.endereco} </span> <br/>
              <span>Bairro: {postocoleta.bairro} </span> <br/> 
              <span>Destino: {postocoleta.destino} </span> 
              <hr />

            </li>
            
          )
        })}
      </ul>

    </div>
  )
}

export default Postocoleta;