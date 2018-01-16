import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';

class PawGiven extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayStatus: "pending"
    }
  }

  componentDidMount() {
    let self=this;
    fetch(`/api/users/${this.props.userId}/requests`)
      .then(function(results) {
        return results.json();
      })
      .then(function(data){
          if (data[0].status === "accepted") {
            self.setState({
              displayStatus: "accepted"
            })
          } else {
            self.setState({
              displayStatus: "rejected"
            })
          }
      })
      .catch(function(error) {
        console.log(error)
      });
  }


  render () {
    let path = `/dog/${this.props.dogId}`
    const status =this.state.displayStatus ;
    let pawStatus ;
    if(status === 'rejected'){
     pawStatus = 'pending'
    }
    else if(status === 'pending'){
      pawStatus = 'pending'

    }
    else{
      pawStatus = 'accepted'
    }
    return (
        <div className="pawgiven" >
            <div className="paw">
            <Link to={path}><button> Check dog </button></Link>
              ->
               {pawStatus}
            </div>
        </div>
    );
  }
}
export default PawGiven;
