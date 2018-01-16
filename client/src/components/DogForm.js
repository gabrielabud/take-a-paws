import React, { Component } from 'react';
import axios, { post } from 'axios';
import { Redirect } from 'react-router';
import Navigation from './Navigation';

class DogForm extends Component {
  constructor(props) {
    super(props);
    this.state ={
      name: '',
      breed: '',
      description: '',
      redirect: false,
      file:null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onFormSubmit(e){
    e.preventDefault() // Stop form submit

    this.fileUpload(this.state.file);
  }

  onChange(e) {
    this.setState({file:e.target.files[0]})
  }
  fileUpload(file){
    const {name, breed, description} = this.state;
    const id = sessionStorage.getItem('id');
    const url = `/api/users/${id}/dogs`;
    const formData = new FormData();
    formData.append('name',name)
    formData.append('breed',breed)
    formData.append('description',description)
    formData.append('file',file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
        }
    }
    return  post(url, formData,config)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
          </label>
          <label>
            Breed:
            <input type="text" name="breed" value={this.state.breed} onChange={this.handleChange} />
          </label>
          <label>
            Description:
            <input type="text" name="description" value={this.state.description} onChange={this.handleChange} />
          </label>
          <input type="file" name="image" onChange={this.onChange} />
          <button type="submit">Upload</button>
        </form>
      </div>
   )
  }
}

export default DogForm;
