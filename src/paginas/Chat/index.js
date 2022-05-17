import {React, useState} from 'react';
import firebase from '../../firebaseConnection';
import 'firebase/auth';
import 'firebase/storage';
import { ChatEngine,  getOrCreateChat } from 'react-chat-engine';
import Feed from '../../components/Feed/Feed';
import './chat.css';
import {Button, Input} from "@material-ui/core";

const Chat = () => {

  const [username, setUsername] = useState('')

	function createDirectChat(creds) {
		getOrCreateChat(
			creds,
			{ is_direct_chat: true, usernames: [username] },
			() => setUsername('')
		)
	}
  
    function renderChatForm(creds) {
      return (
        <div>
          <input 
            placeholder='Username' 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
          <button onClick={() => createDirectChat(creds)}>
            Create
          </button>
        </div>
      )
    }

  return(
      <ChatEngine
        height="90vh"
//        projectID={process.env.REACT_APP_PROJECT_ID}
        projectID='90033265-9086-499b-b032-eaed12efbbf7'
        userName='l.ferreira1975'
        userSecret='Feneme1975*'
//        userSecret={process.env.REACT_APP_USER_SECRET}
        renderNewChatForm={(creds) => renderChatForm(creds)}
      />
   
  )

}

export default Chat;