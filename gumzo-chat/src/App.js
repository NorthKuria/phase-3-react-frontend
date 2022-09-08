import {} from 'react-router-dom'

import ChatBox from './components/ChatBox';
import ChatMenu from './components/ChatMenu';

import './App.css';


function App() {
  return (
    <div>
      <nav className="sticky top-0 z-10 bg-white backdrop-filter backdrop-blur-lg bg-opacity-30 border-b border-gray-200 firefox:bg-opacity-90">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <span className="text-2xl text-gray-900 font-semibold">Logo</span>
            <div className="flex space-x-4 text-gray-900">
              <a href="#">Dashboard</a>
              <a href="#">About</a>
              <a href="#">Projects</a>
              <a href="#">Contact</a>
            </div>
          </div>
        </div>
      </nav>  
      <div className="hero flex max-w-7xl mx-auto items-center">
        <img src={require('./chat_icon.png')} alt="chat icon" width="100" height="100" />
        <h2>Say something</h2>
      </div>   
      <div className="flex max-w-7xl">
        <ChatBox />
        <ChatMenu />
      </div> 
    </div>
  );
}

export default App;
