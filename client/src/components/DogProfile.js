import React, { Component } from 'react';
import Paw from './Paw';
import dogProfile from '../css/DogProfile.css'
import OwnerAccount from './OwnerAccount'
import Navigation from './Navigation'

class DogProfile extends Component {

  constructor(props) {
    super(props)
    this.state = {
      dogData: [],
      clicked: true,
      requestStatus: 'pending'
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    let self = this;
    const userId = sessionStorage.getItem('id');
    const id = self.props.match.params.dogId
    fetch(`/api/dogs/${id}`)
      .then(function(results) {
        return results.json();
      })
      .then(function(data){
        self.setState({
          dogData: data
        })
      })
      .catch(function(error) {
        console.log(error)
      });
console.log(self.state.requestStatus)
      fetch(`/api/users/${userId}/${id}/requests`)
        .then(function(results) {
          return results.json();
        })
        .then(function(data){
          self.setState({
            requestStatus: data[0].status
          })
            console.log(self.state.requestStatus)
        })
        .catch(function(error) {
          console.log(error)
        });

  }

  handleClick() {
    this.setState({
      clicked: !this.state.clicked
    })
    sessionStorage.setItem('ownerId', this.state.dogData.userId);
  }

  render() {
    if(this.state.clicked) {
      return (
             <div className="dog-profile" key={this.state.dogData.id}>
              <h1>{this.state.dogData.name}</h1>
              <div className="profile-pic">
                <img src={this.state.dogData.image} alt={this.state.dogData.name} />
              </div>
              <p>{this.state.dogData.breed}</p>
              <p>{this.state.dogData.description}</p>
              <button onClick={this.handleClick}>Check Owner</button>
            </div>
      );
    } else {
      return (
        <OwnerAccount onClick={this.handleClick}/>
      );
    }
  }
}

export default DogProfile;
