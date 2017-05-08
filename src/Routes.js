import React from 'react';
import { Route } from 'react-router-dom';
import App from './App';
import News from './components/News';
import Newslisting from './components/Newslisting';
import Newsfilter from './components/Newsfilter';
import Favourites from './components/Favourites';


const Routes = () => (
  <div>
   <Route exact path='/' component={App} />
   <Route exact path='/news' name='news' component={News} />
   <Route exact path='/newslisting/:source' name='newslisting' component={Newslisting} />
   <Route exact path='/newsfilter/:source/:filter' name='newsfilter' component={Newsfilter} />
   <Route exact path='/favourites/:user' name='favourites' component={Favourites} />
  </div>
  );

export default Routes;