import firebase from '../../firebaseConnection';
import { useEffect, useState } from 'react';

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

      })
      .catch(() => {

      })
    }

    return (
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

//      <div>  
//        <ReactTable  
//          data={data}  
//          columns={columns}  
//          defaultPageSize = {2}  
//        pageSizeOptions = {[2,4,6]}  
//        />  
//      </div>        

    );
}

export default Postocoleta;