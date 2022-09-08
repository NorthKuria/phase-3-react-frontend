import { useEffect, useState, React } from 'react';

import ChatBox from '../components/ChatBox';
import ChatMenu from '../components/ChatMenu';

function Home () {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        fetch('http://localhost:9292/messages')
        .then(r => r.json())
        .then(data => setMessages(data))
      }, []);

    return (
        <div>
            <div className="hero flex max-w-7xl mx-auto items-center">
                <img src={require('../chat_icon.png')} alt="chat icon" width="100" height="100" />
                <h2>Say something</h2>
            </div>   
            <div className="flex max-w-7xl mx-auto">
                <ChatBox messages={messages} />
                <ChatMenu />
            </div> 
      </div>
    )
}

export default Home