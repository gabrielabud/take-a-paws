import React from 'react';
import App from './components/App';
import DogProfile from './components/DogProfile';
import SignUpForm from './components/SignUpForm';
import DogForm from './components/DogForm';
import SignInForm from './components/SignInForm';
import UserAccount from './components/UserAccount';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Chat from './components/Chat';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
}

const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return renderMergedProps(component, routeProps, rest);
    }}/>
  );
}

const Routes = (props) => (
  <Router {...props}>
    <div className="App">
      <Switch>
        <PropsRoute exact path='/' component={App} isLoggedIn={sessionStorage.getItem('id')} />
        <Route exact path="/dog/:dogId" component={DogProfile} />
        <Route exact path="/signup" component={SignUpForm} />n
        <Route exact path="/dogform" component={DogForm} />
        <Route exact path="/signin" component={SignInForm} />
        <Route exact path="/useraccount" component={UserAccount} />
        <Route exact path="/chat" component={Chat} /> 
      </Switch>
      <Route render={({location}) => {
        return location.pathname !== '/' ? <Navigation /> : ''
      }} />
    </div>
  </Router>
);
export default Routes;
