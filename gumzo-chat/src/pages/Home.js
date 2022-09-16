import { useEffect, useState, React } from 'react';

import ChatBox from '../components/ChatBox';
import ChatMenu from '../components/ChatMenu';

function Home () {
    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState([])
    const [connection, setConnection] = useState(false)

    if (!connection){
        window.ws = new WebSocket('ws://localhost:5000/');
        setConnection(true)

        window.ws.onmessage = function(message) {
            var data = JSON.parse(message.data);
            console.log(data)
            setMessages(current => [...current, {id: data.handle, body: data.text}]);
        };
    }
    
    const handlePosting = (body) => {
        setMessages([...messages, {id:1, body:body}])
        window.ws.send(JSON.stringify({ handle: 1, text: body}));
    }


    function deleteMessage(id){
        fetch(`http://localhost:5000/messages/${id}`,{
        method: "DELETE",
        })
        .then(r => r.json())
        .then(() => {
        const filtered = messages.filter((message) => message.id !== id)
            setMessages(filtered)
        })
    }


    useEffect(() => {
        fetch('http://localhost:5000/messages')
        .then(r => r.json())
        .then(data => setMessages(data))
    }, []);

    useEffect(() => {
        fetch('http://localhost:5000/users')
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