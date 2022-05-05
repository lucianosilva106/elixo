import React from 'react';
import { useState } from 'react';
import { sendMessage, isTyping  } from "react-chat-engine";

const MessageForm = (props) => {
    const [text, setText] = useState('');
    const [isTyping, setTyping] = useState(false);
    
    const {creds, chatId} = props;

    const handleSubmit = (event) => {
        event.preventDefault();

        if (text.length > 0){
            sendMessage(creds, chatId, {text});
            setText('');            
        }
        setTyping(false);
    }

    const handleChange = (event) => {
        const text_msg = event.target.value;

        setText(text_msg);

        if (text_msg.length > 0){
            setTyping(true);
        }else{
            setTyping(false)
        }

    }

    return(
        <div>
            {isTyping ? <div style={{float: 'left'}}>{props.userName} está digitando...</div> : <div />}
            <form className="message-form" onSubmit={handleSubmit}>
             <input 
             className="message-input"
             placeholder="Envie sua mensagem" 
             value={text}
             onChange={handleChange}
             onSubmit={handleSubmit}
             />
            </form>
        </div>
    )

}

export default MessageForm;