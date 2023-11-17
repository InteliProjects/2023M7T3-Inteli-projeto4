import React, { useState } from "react";
import "./chat.css";
import search from "../../assets/bi_send-fill.svg";
import microphone from "../../assets/Vector.svg";
import Navbar from '../components/navbar/navbar';
import UserSidebar from '../components/userSideBar/userSideBar';


const Chat = () => {
  const [messages, setMessages] = useState([
    { text: "Olá! Como posso ajudar você?", isUser: false }, // Mensagem do bot
    { text: "Olá! Tenho uma pergunta.", isUser: true }, // Mensagem do usuário
  ]);
  const [inputText, setInputText] = useState("");

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputText.trim() !== "") {
      setMessages([...messages, { text: inputText, isUser: true }]);
      setInputText("");
    }
  };

  return (
    <div className="main">
      <Navbar></Navbar>
    <div className="chat-container">
      <div className="messages">
        <div className="messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.isUser ? "user" : "bot"}`}
            >
              {message.text}
            </div>
          ))}
        </div>
      </div>
      <div className="input-container">
        <div className="input">
          <input
            className="input-margin"
            placeholder="Faça uma pergunta"
            value={inputText}
            onChange={handleInputChange}
          />
          <div className="buttons">
            <button className="audioButton">
              <img
                src={microphone}
                style={{
                  backgroundColor: "#36175A",
                  width: "30px",
                  height: "30px",
                }}
              ></img>
            </button>
            <button className="inputButton">
              <img
                src={search}
                style={{
                  backgroundColor: "#36175A",
                  width: "30px",
                  height: "30px",
                }}
              ></img>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Chat;
