import React from 'react';
import './App.css';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import { Route, Routes, BrowserRouter } from "react-router-dom"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
