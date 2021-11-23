import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from './components/Header';
import Home from './paginas/Home';
import Erro from './paginas/Erro';
import Login from './paginas/Login';
import Gerenciamento from './paginas/Gerenciamento'
import Admpostocoleta from './paginas/Admpostocoleta';
import Postocoleta from './paginas/Postocoleta';
import Noticia from './paginas/Noticia';
import Quemsomos from './paginas/Quemsomos';
import Admproposta from './paginas/Admproposta';
import AdmAvaliacao from './paginas/Admavaliacao';
import Info from './paginas/Noticia/Info';
import ScrollToTop from './paginas/ScrollToTop';

const Routes = () => {
    return(
        <BrowserRouter>
        <Header/>
        <ScrollToTop/>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/gerenciamento" component={Gerenciamento} />
                <Route exact path="/postocoleta" component={Postocoleta} />
                <Route exact path="/noticia" component={Noticia} />
                <Route exact path="/admpostocoleta" component={Admpostocoleta} />
                <Route exact path="/quemsomos" component={Quemsomos} />
                <Route exact path="/admproposta" component={Admproposta} />
                <Route exact path="/admavaliacao" component={AdmAvaliacao} />
                <Route exact path="/info/:id" component={Info} />
                <Route path="*" component={Erro} />
            </Switch>
        </BrowserRouter>
               
    );
}


export default Routes;
