import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';


class FirebaseAuth extends Component {

  constructor() {
    super();
    this.state = {
      user: <div className="navtop">
        <nav className="navbar">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
              <a className="navbar-brand" href="/">NewsAPI</a>
            </div>
            <div className="collapse navbar-collapse" id="bs">
            <ul className="nav navbar-nav">
              <li className="active"><Link to='/'>News</Link></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">              
              <li className="active" id="btnLogin" onClick={this.login.bind(this)}><a href="#">Login</a></li>
              <li id="btnLogout" className="hide"><a href="#">Logout</a></li>
            </ul>
            </div>
          </div>
        </nav>
      </div>
    }
  }


addPost(userId, article, newsObj) {
  let newPostKey = firebase.database().ref('favourites').child(userId).push().key;
  firebase.database().ref('favourites/' + userId + '/' + newPostKey).update({
    title: article.title,
    url: article.url,
    description : article.description,
    urlToImage : article.urlToImage,
    source : newsObj.source
  });
}

userExist() {
  if (!firebase.auth().currentUser)
    return false
  else
    return true
}

  login() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    firebase.auth().signInWithPopup(provider).then(result => {       
      window.location.reload()
    });
  }

  logout() {
    firebase.auth().signOut().then(() => {
       window.location.reload()
    }).catch((error) => {
       // An error happened.
   });
  }

  componentDidMount() {
    const auth = firebase.auth();
    auth.onAuthStateChanged(user => {
     if (user) {
      this.setState({
      user: <div className="navtop">
        <nav className="navbar">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
              <a className="navbar-brand" href="/">NewsAPI</a>
            </div>
            <div className="collapse navbar-collapse" id="bs">
            <ul className="nav navbar-nav">
              <li className="active"><Link to='/'>News</Link></li>
              <li><Link to={'/favourites/' + firebase.auth().currentUser.uid}>Favourites</Link></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">              
              <li className="hide" id="btnLogin" onClick={this.login.bind(this)}><a href="#">Login</a></li>
              <li id="btnLogout" className="active" onClick={this.logout.bind(this)}><a href="#">Logout</a></li>
            </ul>
            </div>
          </div>
        </nav>
      </div>
      });
     } else {

     }
    });
  }

  render() {
    return (
      <div>
        {this.state.user}
      </div>
    );
  }
}


export default FirebaseAuth;
