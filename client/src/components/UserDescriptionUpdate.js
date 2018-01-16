import React, { Component } from 'react';
import axios, { post } from 'axios';
import { Redirect } from 'react-router';
import Navigation from './Navigation';

class DescriptionUpdate extends Component {

  constructor(props) {
    super(props);
    this.state ={
      description: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event){
    event.preventDefault()
    const id = sessionStorage.getItem('id');
    const {description} = this.state;
    axios.post(`/api/users/description/${id}`,{description})
    .then((response)=> {this.setState({description: response.data.description})});
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }



  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="description" onChange={this.handleChange} />
          <button type="submit">Update description</button>
        </form>
      </div>
   )
  }
}

export default DescriptionUpdate;
