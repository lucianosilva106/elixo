import firebase from '../../firebaseConnection';
import 'firebase/auth';

export default function Gerenciamento() {

    async function checkLogin(){
        await firebase.auth().onAuthStateChanged((user) => {
          if(user){
//            alert('checkando login OK')
//            setUser(true);
//            setUserLogged({
//              uid: user.uid,
//              email: user.email
            }else{
              alert('Area restrita!! Se você é um Administrador, faça o login acessando /login.')
//            setUser(false);
//            setUserLogged({});
          }
        })
    }
    
    checkLogin();

    function fazerLogout(){
        firebase.auth().signOut();
    }

    return (
      <div>
        <h2> Area restrita aos Administradores para gerenciamento de notícias e postos de coleta</h2>
        <br/>
        <tr/>
        <button onClick={ fazerLogout }>Logout</button>
      </div>
    );
  }
  