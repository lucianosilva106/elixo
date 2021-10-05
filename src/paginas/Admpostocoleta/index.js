import firebase from '../../firebaseConnection';
import { useEffect, useState } from 'react';

function Admpostocoleta() {

    const[idPosto, setIdPosto] = useState('');
    const[nome, setNome] = useState('');
    const[cep, setCep] = useState('');
    const[endereco, setEndereco] = useState('');
    const[postoscoletas, setPostoscoletas] = useState([]);

    useEffect(() => {
      async function loadPostos(){
        await firebase.firestore().collection('postoscoletas')
        .onSnapshot((doc) => {
          let meusPostos = [];
          doc.forEach((item) => {
            meusPostos.push({
              id: item.id,
              nome: item.data().nome,
              cep: item.data().cep,
              endereco: item.data().endereco
            })
          })

          setPostoscoletas(meusPostos);
        })
      }

      loadPostos();

    })
    
    async function handleAdd(){
      await firebase.firestore().collection('postoscoletas')
      .add({
        nome: nome,
        cep: cep,
        endereco: endereco
      })
      .then(()=>{
        alert('POSTO DE COLETA CADASTRADO COM SUCESSO!');
        setNome('');
        setCep('');
        setEndereco('');
        buscaPostos();
      })
      .catch((error)=>{ 
        console.log('ERRO: ' + error);
      })
    }

    async function buscaPostos(){
      await firebase.firestore().collection('postoscoletas')
      .get()
      .then((snapshot) => {
        let lista = [];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            nome: doc.data().nome,
            cep: doc.data().cep,
            endereco: doc.data().endereco
          })
        })
        setPostoscoletas(lista);

      })
      .catch(() => {

      })
    }

    async function editarPosto(){
      await firebase.firestore().collection('postoscoletas')
      .doc(idPosto)
      .update({
        nome: nome,
        cep: cep,
        endereco:endereco
      })
      .then(() => {
        alert('DADOS ATUALIZADOS COM SUCESSO!')
        setIdPosto('');
        setNome('');
        setCep('');
        setEndereco('');
      })

    }

    return (
      <div className="container">
        <h1>Cadastro de Posto de Coleta</h1><br />

        <label>ID:</label>
        <input type="text" value={ idPosto } onChange={ (e) => setIdPosto(e.target.value)} /> <br/>

        <label>Nome:</label>
        <input type="text" value={nome} onChange={ (e) => setNome(e.target.value)} /> <br />

        <label>Cep:</label>
        <input type="text" value={cep} onChange={ (e) => setCep(e.target.value)} /> <br />

        <label>Endereço:</label>
        <input type="text" value={endereco} onChange={ (e) => setEndereco(e.target.value)} /> <br />

        <button onClick={ handleAdd }>Cadastrar</button> <br/>
        <button onClick={ buscaPostos }>Atualizar</button> <br/>
        <button onClick={ editarPosto }>Editar</button>

        <ul>
          {postoscoletas.map((postocoleta) =>{
            return(
              <li key={postocoleta.id}>
                <span>ID: {postocoleta.id} </span> <br />
                <span>Nome: {postocoleta.nome} </span> <br />
                <span>Cep: {postocoleta.cep} </span> <br />
                <span>Endereço: {postocoleta.endereco} </span> 
                <hr />

              </li>
              
            )
          })}
        </ul>

      </div>
    );
}
  
export default Admpostocoleta;