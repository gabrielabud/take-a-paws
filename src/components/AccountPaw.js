import React, { Component } from 'react';
import axios from 'axios';
import AccountPawsReceived from './AccountPawsReceived';
import AccountPawsGiven from './AccountPawsGiven';

class AccountPaw extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pawsReceived: [],
      pawsGiven: [],
      dogId: null
    };
  }

  componentDidMount() {
    let self = this;
    let userIden = parseInt(sessionStorage.getItem('id'));
    let dogIden = null;

    fetch(`http://localhost:3001/api/dogs`)
    .then(function(results) {
      return results.json();
    })
    .then(function(data) {

      function isUserDog(doggy) {
        return doggy.userId === userIden;
      }

      dogIden = data.find(isUserDog).id
      self.setState({
        dogId: dogIden
      })

      fetch(`http://localhost:3001/api/requests/${dogIden}`)
      .then(function(results) {
        return results.json();
      })
      .then(function(data){
        self.setState({
          pawsReceived: data
        })
        console.log(self.state.pawsReceived)

      })
      .catch(function(error) {
        console.log(error)
      });

    })
    .catch(function(error) {
      console.log(error)
    });

    fetch(`http://localhost:3001/api/users/${userIden}/requests`)
    .then(function(results) {
      return results.json();
    })
    .then(function(data){
      self.setState({
        pawsGiven: data
      })
      console.log(self.state.pawsGiven)

    })
    .catch(function(error) {
      console.log(error)
    });
  }

  render() {
    return (
      <div>
      <AccountPawsReceived pawsReceived={this.state.pawsReceived}/>
      <AccountPawsGiven pawsGiven={this.state.pawsGiven}/>
      </div>
    );
  }
}
export default AccountPaw;
