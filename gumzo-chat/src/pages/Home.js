import { useEffect, useState, React } from 'react';

import ChatBox from '../components/ChatBox';
import ChatMenu from '../components/ChatMenu';

function Home () {
    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState([])

    var ws

    if (!ws){
        var ws = new WebSocket('ws://localhost:5000/');
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

    useEffect(() => {
        ws.onmessage = function(message) {
            var data = JSON.parse(message.data);
            console.log(data)
            setMessages(oldmessages => [...oldmessages, data])
        };
         
    });

    const handlePosting = (data) => {
        setMessages([...messages, data])
        ws.send(JSON.stringify({ handle: data.id, text: data.user }));
    }

    return (
        <div>
            <div className="hero flex max-w-7xl mx-auto items-center">
                <img src={require('../chat_icon.png')} alt="chat icon" width="100" height="100" />
                <h2>Say something</h2>
            </div>   
            <div className="flex max-w-7xl mx-auto">
                <ChatBox messages={messages} users={users} handlePosting={handlePosting} />
                <ChatMenu />
            </div> 
      </div>
    )
}

export default Home