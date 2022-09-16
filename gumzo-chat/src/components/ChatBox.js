import {useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

function ChatBox ({messages, users, handlePosting, deleteMessage}) {
    const [body, setBody] = useState('')

    const handleChange = (e) => {
        setBody(e.target.value)
    }

    function post_message(){
        setBody('')
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
                        <div className="flex justify-end p-3 mt-3">
                        <div className="flex flex-col self-center items-center">
                            <img src={require('../user_avatar.png')} alt="user avatar" width="40" height="40" />
                        </div>
                        <div className="bg-indigo-500 text-white max-w-sm rounded-lg py-4 px-6 inline block">
                            <p key={message.id} onClick={() => deleteMessage(message.id)}>{message.body}</p>
                        </div>
                        </div>
                    ))}
                </div>
                <div className="flex pt-2">
                    <input 
                        type="text" 
                        value={body} 
                        onChange={handleChange} 
                        className="border-2 grow p-3 text-lg focus:outline-none" 
                        placeholder='Enter your message..' 
                        onKeyPress={event => event.key === 'Enter' ? post_message(event) : null}
                    />
                    <button className="active:outline-none text-white bg-indigo-600 inline-block" onClick={() => {post_message()}}>
                        <div className="flex justify-center">
                            <FontAwesomeIcon icon={faPaperPlane} style={{width: '1rem'}} />
                            <p className="ml-2">SEND</p>
                        </div>
                    </button>
                </div>
            </div>
        )
    }else {
        return ("Loading..")
    }
    
}

export default ChatBox