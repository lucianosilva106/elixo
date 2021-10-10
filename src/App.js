import Routes from './routers';
import './styles.css';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { orange, green } from '@material-ui/core/colors';
import { useQuery } from "graphql-hooks";
import { Image } from 'react-datocms';

const HOMEPAGE_QUERY = `query HomePage($limit: IntType) {
  allArtigos(first: $limit) {
    titulo
    tumbnail {
      responsiveImage(imgixParams: { fit: crop, w: 300, h: 300, auto: format }) {
        srcSet
        webpSrcSet
        sizes
        src
        width
        height
        aspectRatio
        alt
        title
        base64
      }
    }
  }
}`;

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

  const { loading, error, data } = useQuery(HOMEPAGE_QUERY, {
    variables: {
      limit: 10
    }
  });
  if (loading) return "Loading...";
  if (error) return "Something Bad Happened";

  return (
    <div>
      <Routes />     
      </div>
  );
}

export default App;
