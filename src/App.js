import React, { Component } from 'react';
import './App.css';
import DogList from './components/DogList.js'
import DogProfile from './components/DogProfile.js'
import SignUpForm from './components/SignUpForm.js'
import DogForm from './components/DogForm.js'
import SignInForm from './components/SignInForm.js'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export const DOGS = [
  { id: 1, name: 'Jackie', breed: 'German Shepherd', description: 'Best dog ever', image: 'german-shepherd.jpg' },
  { id: 2, name: 'Joey', breed: 'Spaniel', description: 'So lovable', image: 'spaniel.jpg' },
  { id: 3, name: 'Ice', breed: 'Dobermann', description: 'Loves to exercise', image: 'dobermann.jpg' }
];

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={DogList} />
          <Route exact path="/dog/:dogId" component={DogProfile} />
          <Route exact path="/signup" component={SignUpForm} />
          <Route exact path="/dogform" component={DogForm} />
          <Route exact path="/signin" component={SignInForm} />
        </div>
      </Router>
    );
  }
}

export default App;
