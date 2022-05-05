import React from 'react';
import { ChatEngine } from 'react-chat-engine';
import Feed from '../../components/Feed/Feed'
import './chat.css'

function Chat(){

  return(
    <div>
      <ChatEngine
        height="100vh"
        projectID='90033265-9086-499b-b032-eaed12efbbf7'
        userName='l.ferreira1975'
        userSecret='Feneme1975*'
        renderChatFeed={(chatProps) => <Feed {... chatProps} />}
      />
    </div>
  )

}

export default Chat;