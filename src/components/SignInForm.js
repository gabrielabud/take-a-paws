import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import validator from 'validator';
import Input from 'react-validation/build/input';
import Form from 'react-validation/build/form';
import { Redirect } from 'react-router'

export default class SignInForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      status: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    axios.post('http://localhost:3001/signin', { email, password })
      .then((response) => this.setState({ status: response.data.message}))
        .then(axios.get(`http://localhost:3001/id/${email}`)
          .then(function (response) {
            sessionStorage.setItem('id', response.data.id);
          })
        );
  }

  render() {
      const { status } = this.state;
      if(status === "200") {
        return <Redirect to='/' />;
      }

      const required = (value) => {
        if (!value.toString().trim().length) {
          return 'required field';
        }
      };

      const email = (value) => {
        if (!validator.isEmail(value)) {
          return `${value} is not a valid email.`
        }
      };

      return (
        <Form onSubmit={this.handleSubmit}>
        <label>
          Email:
          <Input name="email" value={this.state.email} validations={[required, email]} onChange={this.handleChange} />
        </label>
        <label>
          Password:
          <Input type="password" name="password" value={this.state.password} validations={[required]} onChange={this.handleChange} />
        </label>
        <Input type="submit" value="Submit" />
      </Form>
    );
  }
}
