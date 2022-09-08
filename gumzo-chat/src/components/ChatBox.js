function ChatBox ({messages}) {
    return (
        <div className="max-w-7xl mx-auto">
            <p>Chat box</p>
            {messages.map((message) => (
                <p key={message.id}>{message.body}</p>
            ))}
        </div>
    )
}

export default ChatBox