import Routes from './routers';
import './styles.css';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { orange, green } from '@material-ui/core/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: green[500],
    },
    secondary: {
      main: orange[500],
    },
  },
});

function App() {
  return (
    <div>
      <Routes />     
      </div>
  );
}

export default App;
