import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';

class PawReceived extends Component {
  constructor(props) {
    super(props)
    this.state = {
      response: "accept",
      displayStatus: "pending"
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    let self=this;
    fetch(`/api/users/${this.props.userId}/${this.props.dogId}/requests`)
      .then(function(results) {
        return results.json();
      })
      .then(function(data){
           console.log(data[0].status)
          if (data[0].status === "accepted") {
            self.setState({
              response: "reject",
              displayStatus: "accepted"
            })
          } else {
            self.setState({
              response: "accept",
              displayStatus: "rejected"
            })
          }
      })
      .catch(function(error) {
        console.log(error)
      });
  }

  handleClick() {
    let status = "";
    let userId = null;
    let dogId = null;

    if (this.state.response === "accept" ) {
      status = "accepted";
      userId = this.props.userId;
      dogId = this.props.dogId;
      axios.put(`/api/requests/${this.props.id}`, { status })
      .then((response) => {
        this.setState({
          response: "reject",
          displayStatus: "accepted"
        });
          console.log(this.state.displayStatus);
      });
    } else if ( this.state.response === "reject" ) {
      status = "rejected"
      axios.put(`/api/requests/${this.props.id}`, { status })
      .then((response) => {
        console.log(this.state.displayStatus);
        this.setState({
          response: "accept",
          displayStatus: "rejected"
        })
      });
    }
  }

  render () {
    return (
        <div className="pawreceived" >
            <div className="paw">
              received from user {this.props.userId} ->
              {this.state.displayStatus}
              <button className="paw" onClick={this.handleClick}>
                {this.state.response}
              </button>
            </div>
        </div>
    );
  }
}
export default PawReceived;
