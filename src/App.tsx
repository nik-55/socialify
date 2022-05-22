import React from 'react';
import './App.css';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import { Route, Routes, BrowserRouter } from "react-router-dom"
import Authenciate from './pages/home/Authenciate';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/socialify' element={<Authenciate/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
