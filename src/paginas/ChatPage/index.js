import firebase from '../../firebaseConnection';
import 'firebase/auth';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { TextField } from "@material-ui/core";
import moment from 'moment'

function ChatPage(props) {

  var idprod = props.match.params.idp
  var idusu = props.match.params.idu
  
  const[idvendedor, setIdvendedor] = useState('');
  const[nomevendedor, setNomevendedor] = useState('');
  const[pathimagem, setPathimagem] = useState('');
  const[nomeproduto, setNomeproduto] = useState('');

  async function pegaProduto(idprod) {
    await firebase.firestore().collection('produtos')
    .doc(idprod)
    .get()
    .then((snapshot) => {
      setIdvendedor(snapshot.data().idusuario);
      setNomeproduto(snapshot.data().descricao);
    //  alert('id vendedor:' + idvendedor)
    })
  }

  pegaProduto(idprod)

  async function pegaVendedor(idvendedor) {
  //  alert('vai pegar nome vendedor')
    await firebase.firestore().collection('usuarios')
    .doc(idvendedor)
    .get()
    .then((snapshot) => {
      setNomevendedor(snapshot.data().nome);
//      alert('nome vendedor:' + nomevendedor)
    })
  }

  pegaVendedor(idvendedor)

  async function pegaImagem(idremetente) {
    await firebase.firestore().collection('usuarios')
    .doc(idremetente)
    .get()
    .then((snapshot) => {
      setPathimagem(snapshot.data().pathimagem);
    })
  }

  pegaImagem(idusu)

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function loadMessages(){
      await firebase.firestore().collection('chats').orderBy('datamsg', 'desc')
      .onSnapshot((doc) => {
        
        let minhasMensagens = [];
        doc.forEach((item) => {
          if (item.data().idproduto == idprod) {
             minhasMensagens.push({
              id: item.id,
              mensagem: item.data().mensagem,
              nomevendedor: item.data().nomevendedor,
              remetente: item.data().remetente,
              pathimagem: item.data().pathimagem,
              datamsg: "12/05/2022"
            })
          }
        })

        setMessages(minhasMensagens);
      })
    }

    loadMessages();

  },[])

  const [formvalue, setFormvalue] = useState('');

  async function sendMessage(){
    pegaVendedor(idvendedor);
//    alert(idprod + '/ '+ nomevendedor + '/' + localStorage.getItem('nomelogado') + '/' + firebase.firestore.Timestamp.now() + '/' + formvalue)
    await firebase.firestore().collection('chats')
    .add({
      idproduto: idprod,
      nomevendedor: nomevendedor,
      remetente: localStorage.getItem('nomelogado'),
      datamsg: firebase.firestore.Timestamp.now(),
      pathimagem: pathimagem,
      mensagem: formvalue
    })
    .then(() => {
      alert('mensagem gravada com sucesso');
    });
  }


  return(
    <>
      <main>

        <div align="center">
          <h2>chat do produto {nomeproduto}</h2>
        </div>

      </main>

      <form>

        <TextField
                  fullWidth
                  margin="normal"
                  required
                  size="small"
                  id="descricao-form"
                  label="Digite sua mensagem aqui"
                  defaultValue="Mensagem_default"
                  value={formvalue} onChange={(e) => setFormvalue(e.target.value)} />

        <button onClick={sendMessage}>Enviar</button>

      </form>


        {messages.map((message) => {
           if (message.remetente === message.nomevendedor)
           {
//            alert('left' + localStorage.getItem('nomelogado') + ' = ' + nomevendedor);
            return(
              <ul align="left">
                <img src={message.pathimagem} height="60" width="80" />
                {message.datamsg} - {message.remetente} diz: {message.mensagem}
              </ul> 
            )
           } else{
//            alert('rigth' + localStorage.getItem('nomelogado') + ' = ' + nomevendedor);
            return(
              <ul align="right">
                 {message.mensagem} : {message.remetente} {message.datamsg} 
                <img src={message.pathimagem} height="60" width="80" />
               
              </ul> 
            )
           }
        })}

    </>
  )

}

export default ChatPage;