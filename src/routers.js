import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Header from './components/Header';
import Home from './paginas/Home';
import Erro from './paginas/Erro';
import Login from './paginas/Login';
import Gerenciamento from './paginas/Gerenciamento';
import Gerenciamentousuario from './paginas/Gerenciamentousuario';
import Admpostocoleta from './paginas/Admpostocoleta';
import Postocoleta from './paginas/Postocoleta';
import Produto from './paginas/Produto'
import Noticia from './paginas/Noticia';
import Quemsomos from './paginas/Quemsomos';
import Admproposta from './paginas/Admproposta';
import Admproduto from './paginas/Admproduto';
import Cadastro from './paginas/Cadastro';
import AdmAvaliacao from './paginas/Admavaliacao';
import Info from './paginas/Noticia/Info';
import ScrollToTop from './paginas/ScrollToTop';
import Meucadastro from './paginas/Meucadastro';
import Admprodutousuario from './paginas/Admprodutousuario';
import Carrinhocompra from './paginas/Carrinhocompra';
import Minhatransacao from './paginas/Minhatransacao';
import Produtoupload from './paginas/Produtoupload';
import Landingpage from './paginas/Landingpage';
import Admaprovacao from './paginas/Admaprovacao';
import Meuproduto from './paginas/Meusprodutos';
import Chat from './paginas/Chat';
import Transacao from './paginas/Transacao';
import Paypal from './paginas/Paypal';
import ChatPage from './paginas/ChatPage';
import TermosUso from './paginas/TermosUso';

const Routes = () => {
    return(
        <BrowserRouter>
        <Header/>
        <ScrollToTop/>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/cadastro" component={Cadastro} />
                <Route exact path="/meucadastro" component={Meucadastro} />
                <Route exact path="/admprodutousuario" component={Admprodutousuario} />
                <Route exact path="/gerenciamento" component={Gerenciamento} />
                <Route exact path="/gerenciamentousuario" component={Gerenciamentousuario} />
                <Route exact path="/postocoleta" component={Postocoleta} />
                <Route exact path="/noticia" component={Noticia} />
                <Route exact path="/admpostocoleta" component={Admpostocoleta} />
                <Route exact path="/produto" component={Produto} />
                <Route exact path="/quemsomos" component={Quemsomos} />
                <Route exact path="/admproposta" component={Admproposta} />
                <Route exact path="/admproduto" component={Admproduto} />
                <Route exact path="/admavaliacao" component={AdmAvaliacao} />
                <Route exact path="/admaprovacao" component={Admaprovacao} />
                <Route exact path="/carrinhocompra" component={Carrinhocompra} />
                <Route exact path="/minhatransacao" component={Minhatransacao} />
                <Route exact path="/paypal" component={Paypal} />
                <Route exact path="/chat" component={Chat} />
                <Route exact path="/chatpage/:idp/:idu" component={ChatPage} />
                <Route exact path="/transacao" component={Transacao} />
                <Route exact path="/landingpage" component={Landingpage} />
                <Route exact path="/produtoupload" component={Produtoupload} />
                <Route exact path="/meusprodutos" component={Meuproduto} />
                <Route exact path="/info/:id" component={Info} />
                <Route exact path="/termosuso" component={TermosUso} />
                <Route path="*" component={Erro} />
            </Switch>
        </BrowserRouter>
               
    );
}


export default Routes;
