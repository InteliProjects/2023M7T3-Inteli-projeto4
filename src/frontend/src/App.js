import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/home';
import Login from './pages/Login/Login';
import RequestAccess from './pages/request_acess/request.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chat from './pages/chat/chat';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />  // Definindo Login como a página inicial
        <Route path="/home" element={<Home />} />
        <Route path="/request-access" element={<RequestAccess />} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Chat" element={<Chat/>} />
      </Routes>
    </Router>
  );
}

export default App;
