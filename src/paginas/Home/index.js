import { Link } from "react-router-dom";
import './home.css'
import { createTheme, ThemeProvider, responsiveFontSizes  } from '@material-ui/core/styles';
import CustomCheckbox from '@material-ui/core/Checkbox'
import firebase from '../../firebaseConnection';
import { useEffect, useState } from 'react';


let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function Home() {

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
      <div>
        <br/><br/><br/>
        <div>
          <img className="logohome"></img>
        </div>

        <div align="left">
          <h2>
            <p> <font color="Green"> Você tem lixo eletrônico em casa?</font></p>
          </h2>
          <button>Entenda o que é...</button>
        </div>
        <div align="right">
          <h2>
            <p> <font color="Green"> Sabe quanto vale seu lixo eletrônico? </font> </p>
          </h2>
          <button>Saiba mais...</button>
        </div>
        <div align="center">
          <h3>
            <p> Entenda abaixo como nosso projeto funciona.</p>
          </h3>

        </div>

        <div>
          <img className="resumoprojeto"></img>
        </div>

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

      </div>
    

    );
  }
  