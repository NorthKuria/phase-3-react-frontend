import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'

import Home from './pages/Home';
import Login from './pages/Login'
import About from './pages/About'

import './App.css';


function App() {
  return (
    <Router>
      <nav className="sticky top-0 z-10 bg-white backdrop-filter backdrop-blur-lg bg-opacity-30 border-b border-gray-200 firefox:bg-opacity-90">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <span className="text-2xl text-gray-900 font-semibold">Logo</span>
            <div className="flex space-x-4 text-gray-900">
              <Link to="/"> Home </Link>
              <Link to="/login"> Login </Link>
              <Link to="/about"> About </Link>
            </div>
          </div>
        </div>
      </nav>  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
