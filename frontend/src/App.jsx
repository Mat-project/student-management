import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './components/Nav';
import Home from './components/Home';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Students from './components/Students';
import Manage from './components/Manage';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  
  return (
    <BrowserRouter>
      <div id="app-container">
        <Nav />
        <div className={`content-wrapper ${loading ? 'loading-overlay' : ''}`}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/students' element={<Students setLoading={setLoading} />} />
            <Route path='/manage' element={<Manage setLoading={setLoading} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
