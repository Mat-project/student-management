import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './components/Nav';
import Home from './components/Home';
import { Routes , Route , BrowserRouter } from 'react-router-dom';
import Students from './components/Students';
import Manage from './components/Manage';

function App() {

  return (
    <>
      <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/students' element={<Students />} />
        <Route path='/manage' element={<Manage />} />

      </Routes>
      
      </BrowserRouter>
    </>
  )
}

export default App
