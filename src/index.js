import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Deutch from './Deutch';
import Cards from './Cards';
import CodeNotes from './CodeNotes';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
      <Switch>
        <Route path = '/deutch' component = {Deutch}/>
        <Route path = '/cards' component = {Cards}/>
        <Route path = '/codenotes' component = {CodeNotes}/>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
