const Feed = (props) => {

    const { chats, activeChat, userName, messages1} = props;

    if (chats != null){
        const currentChat = chats[activeChat];

        console.log(currentChat);
    
        return(
            <div>
                <div className="chat-feed">
                    <div className="=chat-title-container">
                        <div className="chat-title">{currentChat.title}</div>

                    </div>
                </div>
            </div>
        );
    }else{
        return(
            <div>Não há chats</div>
        );
    }
}

export default Feed;