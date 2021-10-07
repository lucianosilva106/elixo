import firebase from '../../firebaseConnection';
import { useEffect, useState } from 'react';

function Admproposta() {

    const[idProposta, setIdProposta] = useState('');
    const[nome, setNome] = useState('');
    const[cep, setCep] = useState('');
    const[endereco, setEndereco] = useState('');
    const[bairro, setBairro] = useState('');
    const[tipolixo, setTipolixo] = useState('');
    const[mensagem, setMensagem] = useState('');
    const[propostas, setPropostas] = useState([]);

    useEffect(() => {
      async function loadPropostas(){
        await firebase.firestore().collection('propostas')
        .onSnapshot((doc) => {
          let minhasPropostas = [];
          doc.forEach((item) => {
            minhasPropostas.push({
              id: item.id,
              nome: item.data().nome,
              cep: item.data().cep,
              endereco: item.data().endereco,
              bairro: item.data().bairro,
              tipolixo: item.data().tipolixo,
              mensagem: item.data().mensagem
            })
          })

          setPropostas(minhasPropostas);
        })
      }

      loadPropostas();

    })
    
    async function buscaPropostas(){
      await firebase.firestore().collection('propostas')
      .get()
      .then((snapshot) => {
        let lista = [];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            nome: doc.data().nome,
            cep: doc.data().cep,
            endereco: doc.data().endereco,
            bairro: doc.data().bairro,
            tipolixo: doc.data().tipolixo,
            mensagem: doc.data().mensagem
          })
        })
        setPropostas(lista);

      })
      .catch(() => {

      })
    }

    return (
      <div className="container">
        <h1>Relacao de Solicitações para Posto de Coleta</h1><br />

        <button onClick={ buscaPropostas }>Atualizar</button> <br/>
        
        <ul>
          {propostas.map((proposta) =>{
            return(
              <li key={proposta.id}>
                <span>ID: {proposta.id} </span> <br />
                <span>Nome: {proposta.nome} </span> <br />
                <span>Cep: {proposta.cep} </span> <br />
                <span>Endereço: {proposta.endereco} </span> 
                <hr />

              </li>
              
            )
          })}
        </ul>

      </div>

    );
}

export default Admproposta;