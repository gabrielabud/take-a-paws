import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Paw from './Paw';

class Dog extends Component {
  render () {
    return (
        <div>
            <Link to={this.props.to} className="mask"><img src={this.props.image} alt={this.props.name} /></Link>
            <div className="meta">
              <h2>{this.props.name}</h2>
              <Paw dogId={this.props.id} />
            </div>
        </div>
    );
  }
}
export default Dog;
