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
           console.log(data[0].status)
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
    return (
        <div className="pawgiven" >
            <div className="paw">
              Given to dog {this.props.dogId} ->
              {this.state.displayStatus}
            </div>
        </div>
    );
  }
}
export default PawGiven;
