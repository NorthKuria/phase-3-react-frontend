import {useState} from 'react'

function ChatBox ({messages, users, handlePosting, deleteMessage}) {
    const [body, setBody] = useState('')

    const handleChange = (e) => {
        setBody(e.target.value)
    }

    function post_message(){
        fetch(`https://lit-savannah-30118.herokuapp.com/messages`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id : 1,
                body : body
            })
        })
        .then(r => r.json())
        .then(data => {
            handlePosting(data)
        })
    }

    if (users){

        return (
            <div className="max-w-7xl mx-auto border-2 w-1/2 h-5/6 flex flex-col justify-between p-4 chat-box">
                <p>Chat box</p>
                <div>
                    {messages.map((message) => (
                        <p key={message.id} onClick={() => deleteMessage(message.id)}>{message.body}</p>
                    ))}
                </div>
                <div className="flex">
                    <input type="text" value={body} onChange={handleChange} className="border-2 grow" placeholder='Enter your message..' />
                    <button onClick={() => {post_message()}}>SEND</button>
                </div>
            </div>
        )
    }else {
        return ("Loading..")
    }
    
}

export default ChatBox