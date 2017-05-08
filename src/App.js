import React, { Component } from 'react';
import FirebaseAuth from './components/FirebaseAuth';
import News from './components/News';

class App extends Component {
  render() {
    return (
      <div>
        <FirebaseAuth />
        <News />
      </div>
    );
  }
}

export default App;