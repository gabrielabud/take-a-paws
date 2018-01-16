import React from 'react';
import SignupPopup from './SignupPopup'

export default class SignupButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showPopup: false
    }
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  render() {
  return (
    <li>
    <a className={this.props.className} onClick={this.togglePopup.bind(this)}>Signup</a>
    {this.state.showPopup ?
      <SignupPopup
        closePopup={this.togglePopup.bind(this)}
        logInClicked={this.props.logInClicked}
      />
      : null
    }
    </li>
  )
}
}
