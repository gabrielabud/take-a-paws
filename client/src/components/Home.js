import React, { Component } from 'react';
import Navigation from './Navigation';
import '../css/Home.css'

class Home extends Component {

  render() {
    return (
      <div className="home">
        <div>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        </div>
        <div className="home-bg"></div>
      </div>
    );
  }
}

export default Home;
