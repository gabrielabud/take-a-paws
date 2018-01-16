import React, { Component } from 'react';
import axios, { post } from 'axios';
import { Redirect } from 'react-router';
import Navigation from './Navigation';

class DogForm extends Component {

  constructor(props) {
    super(props);
    this.state ={
      file: null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }

  onFormSubmit(e){
    e.preventDefault()
    this.fileUpload(this.state.file);
  }

  onChange(e) {
    this.setState({ file: e.target.files[0] })
  }

  fileUpload(file){
    const id = sessionStorage.getItem('id');
    const url = `/api/users/image/${id}`;
    const formData = new FormData();
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
          <input type="file" name="image" onChange={this.onChange} />
          <button type="submit">Upload</button>
        </form>
      </div>
   )
  }
}

export default DogForm;
