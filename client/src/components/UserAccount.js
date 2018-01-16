import React from 'react';
import UserPictureUpload from './UserPictureUpload';
import Messenger from './Messenger'
import AccountPaw from './AccountPaw';

class UserAccount extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      userData: [],
      namesData: [],
      namesNamesData:[]
    }
  }

  componentDidMount() {
    let self=this;
    const id = sessionStorage.getItem('id');

    fetch(`/users/${id}`)
      .then(function(results) {
        return results.json();
      })
      .then(function(data){
          self.setState({
            userData: data
          })
      })
      .catch(function(error) {
        console.log(error)
      });

      fetch(`/api/messages/names?receiverId=${id}`)
        .then(function(results) {
          return results.json();
        })
        .then(function(data){
           const unique =[...new Set(data.map(item => item.sender))];
           const uniqueName = [...new Set(data.map(item => item.senderName))];
            self.setState({
              namesData: unique,
              namesNamesData: uniqueName
            })
            console.log(unique)
        })
        .catch(function(error) {
          console.log(error)
        });
  }

  render() {
    return (
      <div>
      <UserPictureUpload />
      <p>{this.state.userData.firstname}</p>
      <p>{this.state.userData.lastname}</p>
      <p>{this.state.userData.username}</p>
      <p>{this.state.userData.email}</p>
      <img className="thumb" src={this.state.userData.image} />
      <Messenger messages={this.state.namesData} names={this.state.namesNamesData}/>
      <AccountPaw />
      </div>
    );
  }
}
export default UserAccount;
