import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
  render() {
    return (
<div className="navbar-wrapper">
        <div className="container">
            <nav className="navbar navbar-inverse navbar-static-top">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="/">NewsAPI</a>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                        <ul className="nav navbar-nav">
                            <li className="active"><Link to='/news'>News</Link></li>
                            <li><Link to='/favourites/user'>Favourites</Link></li>
                        </ul>

                        <div className="navbar-right">
                        <ul className="nav navbar-nav">
                            <li className="active" id="btnLogin"><a href="forms/loginForm">Login</a></li>
                            <li id="btnLogout" className="hide"><a href="#contact">Logout</a></li>
                        </ul>
                    </div>

                    </div>
                </div>
            </nav>
        </div>
    </div>
    );
  }
}

export default Nav;
