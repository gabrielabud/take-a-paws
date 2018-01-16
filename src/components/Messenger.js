import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

export default class Messenger extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ownerId: ""
    };
  }

  handleClick(arg) {
    sessionStorage.setItem('ownerId', arg)
  }

  render() {
    return (
      <div>
        <nav>
          {
          this.props.messages.map(senderId => (
            <NavLink to='/chat' onClick={(e) => this.handleClick(senderId, e)} exact activeClassName="active">
              <div key={senderId}>
                {senderId}
              </div>
            </NavLink>
          ))
         }
        </nav>
      </div>
    );
 }
};
