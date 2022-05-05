import React from 'react';
import { ChatEngine } from 'react-chat-engine';
import Feed from '../../components/Feed/Feed';
import './chat.css'

function Chat(){

  return(
    <div>
      <ChatEngine
        height="100vh"
//        projectID={process.env.REACT_APP_PROJECT_ID}
        projectID='90033265-9086-499b-b032-eaed12efbbf7'
        userName='l.ferreira1975'
//        userSecret={process.env.REACT_APP_USER_SECRET}
        userSecret='Feneme1975*'
        renderChatFeed={(chatProps) => <Feed {... chatProps} />} // ... espalha todos os parametros do chatProps
      />
    </div>
  )

}

export default Chat;