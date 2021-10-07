import firebase from '../../firebaseConnection';
import { useState } from 'react';

function Noticia() {

    return (
      <div className="container">
        <br/><br/>
        <a href={"https://www.uol.com.br/tilt/noticias/redacao/2021/10/07/lider-em-lixo-eletronico-na-america-latina-brasil-tem-so-seis-recicladoras.htm"}>
        Líder em lixo eletrônico na América Latina, Brasil tem só seis recicladoras... 
        </a>
      </div>
    );
}
  
export default Noticia;