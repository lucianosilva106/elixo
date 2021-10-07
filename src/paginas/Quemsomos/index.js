import { Link } from "react-router-dom";
import { createTheme, ThemeProvider, responsiveFontSizes  } from '@material-ui/core/styles';
import CustomCheckbox from '@material-ui/core/Checkbox'

let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function Quemsomos() {
    return (
      <div>
        <h2>
          <p>
            Somos uma empresa que se preocupa com o meio ambiente e quer que o resto se foda...
          </p>
        </h2>
      </div>
    );
  }
  