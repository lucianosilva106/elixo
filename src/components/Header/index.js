import './header.css';
import { Link } from 'react-router-dom';

export default function Header(){
    return(
        <header>
            <Link className="links" to="/">O Projeto</Link>
            <Link className="links" to="/reciclavel">Os Recicláveis</Link>
            <Link className="links" to="/dano">Os danos</Link>
            <Link className="links" to="/acao">As ações</Link>
            <Link className="links" to="/nossoapp">Nosso Aplicativo</Link>
            <Link className="links" to="/contato">Fale Conosco</Link>
            <Link className="links" to="/arearestrita">Área restrita</Link>
        </header>
    )
}