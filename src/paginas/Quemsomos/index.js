import { Link } from "react-router-dom";
import { createTheme, ThemeProvider, responsiveFontSizes  } from '@material-ui/core/styles';
import CustomCheckbox from '@material-ui/core/Checkbox'

let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function Quemsomos() {
    return (
      <div>
        <h3>
          <p> O objetivo do projeto é a mudança cultural dos indivíduos sobre a importância do descarte
              sustentável do lixo eletrônico. </p>
          <p>
              O projeto é voltado para a pessoa física que não tem acesso às informações a respeito  de
              como deve ser o descarte de peças eletrônicas obsoletas, precisando de manutenção ou em desuso.</p>
          <p>
              Esta plataforma traz uma solução Web inovadora e escalonável, com foco no segmento de mercado 
              específico de descarte de eletrônicos. </p>
          <p>
              Com base nos levantamentos e pesquisas realizadas no decorrer do projeto, 
              foi identificado o problema cultural no qual as pessoas muitas vezes não sabem o que é 
              e como descartar corretamente o lixo eletrônico. Visando facilitar esse processo, 
              a solução web tem como cerne inicial a orientação dessas pessoas, 
              além de direcioná-las à locais apropriados para o descarte consciente. </p>
        </h3>
      </div>
    );
  }
  