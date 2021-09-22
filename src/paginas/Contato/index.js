import firebase from '../../firebaseConnection';
import { useState } from 'react';

function Contato() {
    const[nome, setNome] = useState('');
    const[email, setEmail] = useState('');
    const[mensagem, setMensagem] = useState('');
    const[resposta, setResposta] = useState('');
    const[mensagens, setMensagens] = useState([]);

    async function handleAdd(){
      await firebase.firestore().collection('mensagens')
 //     .doc('1234')
      .add({
        nome: nome,
        email: email,
        Mensagem: mensagem,
        resposta: ''
      })
//      .set({
//        nome: nome,
//        email: email
//      })
      .then(()=>{
        console.log('MENSAGEM CADASTRADA COM SUCESSO!');i
        setEmail('');
        setMensagem('');
        setNome('');
      })
      .catch((error)=>{ 
        console.log('ERRO: ' + error);
      })
    }

    async function buscaMensagens(){
      await firebase.firestore().collection('mensagens')
      .get()
      .then((snapshot) => {
        let lista = [];

        snapshot.forEach((doc) => {
          lista.push({
            nome: doc.data().nome,
            email: doc.data().email,
            mensagem: doc.data().Mensagem,
            resposta: doc.data().resposta
          })
        })
        setMensagens(lista);

      })
      .catch(() => {

      })
    }

    return (
      <div className="container">
        <h1>Deixe sua mensagem</h1><br />
        <label>Nome:</label>
        <input type="text" value={nome} onChange={ (e) => setNome(e.target.value)} /> <br />

        <label>E-mail:</label>
        <input type="email" value={email} onChange={ (e) => setEmail(e.target.value)} /> <br />

        <label>Mensagem</label>
        <textarea type="text" value={mensagem} onChange={ (e) => setMensagem(e.target.value)}></textarea>

        <button onClick={ handleAdd }>Enviar</button>
        <button onClick={ buscaMensagens }>Buscar mensagens</button>
        <h2>Perguntas frequentes...</h2>

        <ul>
          {mensagens.map((mensagem) =>{
            return(
              <li key={mensagem.id}>
                <span>Nome: {mensagem.nome} </span> <br />
                <span>Email: {mensagem.email} </span> <br />
                <span>Mensagem: {mensagem.mensagem} </span> <br />
                <span>Resposta: {mensagem.resposta} </span> <br /> <br />

              </li>
            )
          })}
        </ul>

      </div>
    );
}
  
export default Contato;