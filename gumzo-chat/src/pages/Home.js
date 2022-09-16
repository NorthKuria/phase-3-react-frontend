import { useEffect, useState, React } from 'react';

import ChatBox from '../components/ChatBox';
import ChatMenu from '../components/ChatMenu';

function Home () {
    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState([])
    const [connection, setConnection] = useState(false)

    if (!connection){
        window.ws = new WebSocket("wss://lit-savannah-30118.herokuapp.com/");
        setConnection(true)

        window.ws.onmessage = function(message) {
            var data = JSON.parse(message.data);
            console.log(data)
            setMessages(current => [...current, {id: data.handle, body: data.text}]);
        };
    }
    
    const handlePosting = (body) => {
        window.ws.send(JSON.stringify({ handle: 1, text: body}));
    }


    function deleteMessage(id){
        fetch(`https://lit-savannah-30118.herokuapp.com/messages/${id}`,{
        method: "DELETE",
        })
        .then(r => r.json())
        .then(() => {
        const filtered = messages.filter((message) => message.id !== id)
            setMessages(filtered)
        })
    }


    useEffect(() => {
        fetch('https://lit-savannah-30118.herokuapp.com/messages')
        .then(r => r.json())
        .then(data => setMessages(data))
    }, []);

    useEffect(() => {
        fetch('https://lit-savannah-30118.herokuapp.com/users')
        .then(r => r.json())
        .then(data => setUsers(data))
    }, []);  


    return (
        <div>
            <div className="hero flex max-w-7xl mx-auto items-center">
                <img src={require('../chat_icon.png')} alt="chat icon" width="100" height="100" />
                <h2>Say something</h2>
            </div>   
            <div className="flex max-w-7xl mx-auto">
                <ChatBox messages={messages} users={users} handlePosting={handlePosting} deleteMessage={deleteMessage} />
                <ChatMenu />
            </div> 
      </div>
    )
}

export default Home