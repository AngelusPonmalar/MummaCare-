import React, { useState } from "react";
import axios from "axios";
import { Send, Bot, Heart } from "lucide-react";
import "./AIAssistant.css";

export default function AIAssistant() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello Mumma 🤍 I'm your AI Pregnancy Companion! How can I help you today?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    "What should I eat for iron?",
    "Tell me about nutrition",
    "Exercise during pregnancy",
    "Managing morning sickness"
  ];

  const sendMessage = async (question) => {
    const userMessage = question || input;
    if (!userMessage.trim()) return;

    const newMessages = [...messages, { sender: "user", text: userMessage }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/chat",
        { message: userMessage },
        { timeout: 8000 }
      );

      setMessages([...newMessages, { sender: "bot", text: res.data.reply }]);
    } catch (error) {
      let replyMessage = "";

      if (error.code === "ECONNREFUSED" || error.message.includes("Network Error")) {
        replyMessage =
          "⚠️ AI service is not connected yet.\n\nPlease start the backend server in Terminal 2:\n\n1️⃣ Open a new terminal\n2️⃣ Navigate to backend folder\n3️⃣ Run: node server.js\n\nOnce backend is running, AI assistant will respond normally.";
      } else if (error.message.includes("timeout")) {
        replyMessage =
          "⚠️ Network connection issue detected.\n\nPlease check your internet connection and try again.";
      } else {
        replyMessage = "⚠️ AI assistant is currently unavailable. Please try again later.";
      }

      setMessages([...newMessages, { sender: "bot", text: replyMessage }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="ai-container">

      {/* Branding Header */}
      <div className="brand-header">
        <div className="logo-circle"><Heart size={32} fill="#ff2d78" color="#ff2d78" /></div>
        <span className="brand-name">MummaCare+</span>
      </div>

      <div className="ai-header">
        <div className="ai-icon"><Bot size={26} /></div>
        <div>
          <h2 className="ai-title">AI Pregnancy Companion</h2>
        </div>
      </div>

      <div className="quick-grid">
        {quickQuestions.map((q, i) => (
          <button key={i} className="quick-btn" onClick={() => sendMessage(q)}>{q}</button>
        ))}
      </div>

      <div className="chat-box">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-row ${msg.sender}-row`}>
            {msg.sender === "bot" && <div className="bot-icon"><Bot size={16} /></div>}
            <div className={`chat-bubble ${msg.sender}-bubble`}>{msg.text}</div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="chat-row bot-row">
            <div className="bot-icon"><Bot size={16} /></div>
            <div className="chat-bubble bot-bubble typing-dots">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
      </div>

      {/* Floating Input */}
      <div className="floating-input-area">
        <input
          type="text"
          placeholder="Ask me anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={() => sendMessage()}><Send size={18} /></button>
      </div>

      <div style={{ height: "100px" }}></div>
    </div>
  );
}
