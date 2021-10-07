import firebase from '../../firebaseConnection';
import { useEffect, useState } from 'react';

function Cadastre() {

    const[nome, setNome] = useState('');
    const[cep, setCep] = useState('');
    const[endereco, setEndereco] = useState('');
    const[bairro, setBairro] = useState('');
    const[tipolixo, setTipolixo] = useState('');
    const[mensagem, setMensagem] = useState('');

    async function handleAdd(){
      await firebase.firestore().collection('propostas')
      .add({
        nome: nome,
        cep: cep,
        endereco: endereco,
        bairro: bairro,
        tipolixo: tipolixo,
        mensagem: mensagem
      })
      .then(()=>{
        alert('Solicitação de Posto de Coleta recebido com sucesso!');
        setNome('');
        setCep('');
        setEndereco('');
        setBairro('');
        setTipolixo('');
        setMensagem('');
      })
      .catch((error)=>{ 
        console.log('ERRO: ' + error);
      })
    }

    return (
      <div className="container">
        <h1>Formulário de Solcitacao de Posto de Coleta</h1><br />

        <label>Nome:</label>
        <input type="text" value={nome} onChange={ (e) => setNome(e.target.value)} /> <br />

        <label>Cep:</label>
        <input type="text" value={cep} onChange={ (e) => setCep(e.target.value)} /> <br />

        <label>Endereço:</label>
        <input type="text" value={endereco} onChange={ (e) => setEndereco(e.target.value)} /> <br />

        <label>Bairro:</label>
        <input type="text" value={bairro} onChange={ (e) => setBairro(e.target.value)} /> <br />

        <label>Material a ser coletado:</label>
        <input type="text" value={tipolixo} onChange={ (e) => setTipolixo(e.target.value)} /> <br />

        <label>Deixe-nos uma mensagem:</label>
        <textarea type="text" value={mensagem} onChange={ (e) => setMensagem(e.target.value)} /> <br/> <br/>

        <button onClick={ handleAdd }>Enviar Formulário</button> <br/>

      </div>
    );
}
  
export default Cadastre;