import React, { Component }  from 'react';
import { NavLink } from 'react-router-dom'
import LogOut from './LogOut';
import SignupPopup from './SignupPopup'
import SignupButton from './SignupButton'
import SigninButton from './SigninButton'
import '../css/Navigation.css'

class Navigation extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: sessionStorage.getItem('id'),
      listYourDog: null,
      profile: null,
      home: null,
      logOut: null,
      SignupPopup: null,
      SigninPopup: null
    }
    this.logOutClicked = this.logOutClicked.bind(this)
    this.logInClicked = this.logInClicked.bind(this)
  }

  logOutClicked() {
    this.setState({
      id: null,
      listYourDog: null,
      profile: null,
      home: <li><NavLink className="logo" to="/" exact></NavLink></li>,
      logOut: null,
      SignupPopup: <SignupButton className="signupButton" logInClicked={this.logInClicked} />,
      SigninPopup: <SigninButton className="signinButton" logInClicked={this.logInClicked} />
    })

    if(this.props.setLoggedIn) this.props.setLoggedIn()
  }

  logInClicked() {
    this.setState({
      id: sessionStorage.getItem('id'),
      listYourDog: <li><NavLink className="listDogs" to="/dogform" exact activeClassName="active">List your dog</NavLink></li>,
      profile: <li><NavLink className="profile" to="/useraccount" exact activeClassName="active">Profile</NavLink></li>,
      home: <li><NavLink className="logo" to="/" exact activeClassName="active"></NavLink></li>,
      logOut: <li><LogOut className="logOut" logOutClicked={this.logOutClicked} /></li>,
      SignupPopup: null,
      SigninPopup: null
    })

    if(this.props.setLoggedIn) this.props.setLoggedIn()
  }

  componentDidMount() {
    if (this.state.id != 'null') {
      this.setState({
        listYourDog: <li><NavLink className="listDogs" to="/dogform" exact activeClassName="active">List your dog</NavLink></li>,
        profile: <li><NavLink className="profile" to="/useraccount" exact activeClassName="active">Profile</NavLink></li>,
        home: <li><NavLink className="logo" to="/" exact activeClassName="active"></NavLink></li>,
        logOut: <li><LogOut className="logOut" logOutClicked={this.logOutClicked} /></li>
      });
    } else {
      this.setState({
        home: <li><NavLink className="logo" to="/" exact></NavLink></li>,
        SignupPopup: <SignupButton className="signupButton" logInClicked={this.logInClicked} />,
        SigninPopup: <SigninButton className="signinButton" logInClicked={this.logInClicked} />
      });
    }
  }

  render() {
    return (
      <nav className="navBar">
        <ul className="left">
          {this.state.listYourDog}
        </ul>
        <ul className="center">
          {this.state.home}
        </ul>
        <ul className="right">
          {this.state.profile}
          {this.state.logOut}
          {this.state.SigninPopup}
          {this.state.SignupPopup}
        </ul>
      </nav>
    );
  }
}
export default Navigation;
