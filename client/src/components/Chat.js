import React from "react";
import axios from 'axios';
import io from "socket.io-client";

class Chat extends React.Component{

  constructor(props){
       super(props);

       this.state = {
           senderId: sessionStorage.getItem('id'),
           message: '',
           receiverId: sessionStorage.getItem('ownerId'),
           messages: []
       };

       this.socket = io('localhost:3001');

       this.socket.on('RECEIVE_MESSAGE', function(data){
         addMessage(data);
       })

       const addMessage = data => {
        this.setState({messages: [...this.state.messages, data]});
       }

       this.sendMessage = ev => {
         ev.preventDefault();
         this.socket.emit('SEND_MESSAGE',{
           sender: this.state.senderId,
           message: this.state.message
         });
         const {message, senderId, receiverId} =this.state
         axios.post('/api/messages', {message, senderId, receiverId})
         this.setState({message: ''})
       }
   }

   componentDidMount() {
     let self=this;
     const userId = sessionStorage.getItem('id');
     const ownerId = sessionStorage.getItem('ownerId');

     fetch(`/api/messages?senderId=${userId}&receiverId=${ownerId}`)
       .then(function(results) {
         return results.json();
       })
       .then(function(data){
           self.setState({
             messages: data
           })
       })
       .catch(function(error) {
         console.log(error)
       });
   }

  render(){
        return (
          <div>
            <div className="messages">
              {this.state.messages.map(message => {
                return (
                  <div>{message.senderName}: {message.message}</div>
                )
              })}
            </div>
            <div className="card-footer">

              <br/>
              <input type="text" placeholder="Message" value={this.state.message} onChange={ev=>this.setState({message: ev.target.value})} className="form-control"/>
              <br/>
              <button onClick={this.sendMessage} className="submit-btn">Send</button>
            </div>
          </div>
        );
    }
}
export default Chat;
