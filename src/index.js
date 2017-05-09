import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router} from 'react-router-dom';
import Routes from './Routes';
import * as firebase from 'firebase';
import './styles/main.css';

  const config = {
    apiKey: "AIzaSyB89UfsZjSnvda76EdN4qwsjBfhvcqia78",
    authDomain: "libraryapplication-3e3d5.firebaseapp.com",
    databaseURL: "https://libraryapplication-3e3d5.firebaseio.com",
    projectId: "libraryapplication-3e3d5",
    storageBucket: "libraryapplication-3e3d5.appspot.com",
    messagingSenderId: "242818936620"
  };
  firebase.initializeApp(config);


ReactDOM.render(
 <Router>
  <Routes />
 </Router>,
  document.getElementById('root')
);
