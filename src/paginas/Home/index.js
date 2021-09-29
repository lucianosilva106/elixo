import { Link } from "react-router-dom";
import './home.css'
import { createTheme, ThemeProvider, responsiveFontSizes  } from '@material-ui/core/styles';
import CustomCheckbox from '@material-ui/core/Checkbox'

let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function Home() {
    return (
      <div>
        <h2>
          <p>
            Bem vindo a você que se interessou em visitar-nos, contribuir e obter mais informações sobre a reciclagem de lixo eletrônico
          </p>
        </h2>
      </div>
    );
  }
  