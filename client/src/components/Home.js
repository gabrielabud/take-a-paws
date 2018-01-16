import React, { Component } from 'react';
import Navigation from './Navigation';
import '../css/Home.css'

class Home extends Component {

  render() {
    return (
      <div className="home">
        <div>
          <p>Welcome to Paws world </p>
        </div>
        <div className="home-bg"></div>
      </div>
    );
  }
}

export default Home;
