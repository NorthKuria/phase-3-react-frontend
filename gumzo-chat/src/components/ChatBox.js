import {useState} from 'react'

function ChatBox ({messages, users, handlePosting}) {
    const [body, setBody] = useState('')

    const handleChange = (e) => {
        setBody(e.target.value)
    }

    function post_message(){
        fetch(`http://localhost:5000/messages`,{
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
            <div className="max-w-7xl mx-auto border-2 w-1/2 h-96 flex flex-col justify-between">
                <p>Chat box</p>
                <div>
                    {messages.map((message) => (
                        <p key={message.id}>{message.body}</p>
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