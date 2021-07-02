import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Link} from 'react-router-dom';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      extraOutput: ''
    };
    this.extraOptions = this.extraOptions.bind(this)
  }
  
  extraOptions (pageId) 
  {
    if(pageId === 1)
    {
      this.setState({extraOutput: 
        <div>
          <Link className = "Link" to = "/cards">Learning cards</Link>
        </div>
      }) 
    }
  }

  render () {
    return (
      <div className="App">
        <div>
          <div onClick = {() => this.extraOptions(1)} className = "navItem">
            <Link className = "Link" to = "/deutch">Deutch</Link>
          </div>
          <div className = "navItem">
            <Link className = "Link" to = "/codenotes">CodeNotes</Link>
          </div>
        </div>
        {this.state.extraOutput}
      </div>
    )
  };
}


