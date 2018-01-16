import React from 'react';
import SigninPopup from './SigninPopup'

export default class SigninButton extends React.Component {

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
        <a className={this.props.className} onClick={this.togglePopup.bind(this)}>Signin</a>
        {this.state.showPopup ?
          <SigninPopup
            closePopup={this.togglePopup.bind(this)}
            logInClicked={this.props.logInClicked}
          />
          : null
        }
      </li>
    )
  }
}
