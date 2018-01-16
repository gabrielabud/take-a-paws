import React, { Component } from 'react';
import axios from 'axios';
import '../css/Paw.css'

class Paw extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pawed: "paw",
      status: null,
      pawId: ""
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    let self = this;
    let userIden = sessionStorage.getItem('id');
    let dogIden = self.props.dogId;

    fetch(`/api/users/${userIden}/${dogIden}/requests`)
      .then(function(results) {
        return results.json();
      })
      .then(function(data){
          if (data.length > 0) {
            self.setState({
              pawed: 'pawed',
              pawId: data[0].id,
              status: data[0].status
            })
          }
          else  {
            self.setState({
              pawed: 'paw',
              pawId: null,
              status: null
            })
          }
      })
      .catch(function(error) {
        console.log(error)
      });
  }

  handleClick() {
    let status = "pending";
    let userIden = sessionStorage.getItem('id');
    let dogIden = this.props.dogId;
    let pawIden = this.state.pawId;

    if (this.state.pawed === "paw" ) {
      axios.post(`/api/users/${userIden}/${dogIden}/requests`, { status, userIden, dogIden })
      .then((response) => {
        this.setState({ status: "pending", pawed: 'pawed', pawId: response.data.id });
      });
    } else {
      axios.delete(`/api/requests/${pawIden}`)
      .then((response) => {
        this.setState({ status: null, pawed: 'paw', pawId: null })
      });
    }
  }

  render() {
    return (
      <a className={`paw-button ${this.state.pawed}`} onClick={this.handleClick}></a>
    );
  }
}
export default Paw;
