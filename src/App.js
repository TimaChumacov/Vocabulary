import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Link} from 'react-router-dom';

//navigation component. its named app coz it was named so in react template and chaning it was more work than i thought
function App() {
  return (
    <div className="App">
      <div className = "navItem">
        <Link className = "Link" to = "/deutch">Deutch</Link>
      </div>
      <div className = "navItem">
        <Link className = "Link" to = "">Home</Link>
      </div>
  </div>
  );
}

export default App;
