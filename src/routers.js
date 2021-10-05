import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import Header from './components/Header';
import Home from './paginas/Home';
import Reciclavel from './paginas/Reciclavel';
import Dano from './paginas/Dano';
import Noticias from './paginas/Noticias';
import Nossoapp from './paginas/Nossoapp';
import Contato from './paginas/Contato';
import Erro from './paginas/Erro';
import Login from './paginas/Login';
import Gerenciamento from './paginas/Gerenciamento'


const Routes = () => {
    return(
        <BrowserRouter>
        <Header/>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/reciclavel" component={Reciclavel} />
                <Route exact path="/dano" component={Dano} />
                <Route exact path="/noticias" component={Noticias} />
                <Route exact path="/nossoapp" component={Nossoapp} />
                <Route exact path="/contato" component={Contato} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/gerenciamento" component={Gerenciamento} />
                <Route path="*" component={Erro} />
            </Switch>
        </BrowserRouter>
               
    );
}


export default Routes;
