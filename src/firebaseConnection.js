import firebase from 'firebase/app';
import 'firebase/firestore';

let firebaseConfig = {
    apiKey: "AIzaSyAlHdnlJ6ZuWF-HSDk2FOtB8d4Uov8uBuI",
    authDomain: "webbacktrash.firebaseapp.com",
    projectId: "webbacktrash",
    storageBucket: "webbacktrash.appspot.com",
    messagingSenderId: "890900383081",
    appId: "1:890900383081:web:e4914161a103ae340669f8",
    measurementId: "G-2578MKC2BE"
  };
  
  if(!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
  }

  export default firebase;
  