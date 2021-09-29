import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from './components/Header';
import Home from './paginas/Home';
import Reciclavel from './paginas/Reciclavel';
import Dano from './paginas/Dano';
import Acao from './paginas/Acao';
import Nossoapp from './paginas/Nossoapp';
import Contato from './paginas/Contato';
import Erro from './paginas/Erro';
import Arearestrita from './paginas/Arearestrita';
import teste from './paginas/teste';

const Routes = () => {
    return(
        <BrowserRouter>
            <Header/>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/reciclavel" component={Reciclavel} />
                <Route exact path="/dano" component={Dano} />
                <Route exact path="/acao" component={Acao} />
                <Route exact path="/nossoapp" component={Nossoapp} />
                <Route exact path="/contato" component={Contato} />
                <Route exact path="/arearestrita" component={Arearestrita} />
                <Route exact path="/teste" component={teste} />
                <Route path="*" component={Erro} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
