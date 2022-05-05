import MessageForm from '../MessageForm/MessageForm'

const Feed = (props) => {

    const { chats, activeChat, userName, messages} = props;

    if (chats != null){

        const currentChat = chats[activeChat];

//        console.log(messages);

        const renderMessages = () => {
            const keys = Object.keys(messages) 

            return keys.map((key, index) => {
                const message = messages[key];

                return(
                    <div key={key} style={{ width: '100%' }}>
                        <div className="message-block">
                            {message.sender.username}: {message.text}
                        </div>
                    </div>
                );
            });
        }

        return(
            <div align="center">
                <div className="chat-feed">
                    <div className="=chat-title-container">
                        <div className="chat-title">{currentChat?.title}</div>
                        <div className="chat-subtitle">
                            {
                                currentChat?.people.map((p) => `${p.person.username}`)
                            }
                        </div>
                        {renderMessages()}
                        <div className="message-form-container">
                            <MessageForm {... props} chatId={activeChat} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }else{
        return(
            <div align="center">Não há chats...</div>
        );
    }
}

export default Feed;