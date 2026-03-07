import React, { useState } from "react";
import axios from "axios";
import { Send, Bot, Heart } from "lucide-react";
import "./AIAssistant.css";

export default function AIAssistant() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello Mumma 🤍 I'm your AI Pregnancy Companion! How can I help you today?" }
  ]);
  const [isTyping, setIsTyping] = useState(false); // Loading state

  const quickQuestions = ["What should I eat for iron?", "Tell me about nutrition", "Exercise during pregnancy", "Managing morning sickness"];

  const sendMessage = async (question) => {
    const userMessage = question || input;
    if (!userMessage.trim()) return;

    const newMessages = [...messages, { sender: "user", text: userMessage }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true); // Start loading animation

    try {
      const res = await axios.post("http://localhost:5000/chat", { message: userMessage });
      setMessages([...newMessages, { sender: "bot", text: res.data.reply }]);
    } catch {
      setMessages([...newMessages, { sender: "bot", text: "AI assistant is currently unavailable." }]);
    } finally {
      setIsTyping(false); // Stop loading animation
    }
  };

  return (
    <div className="ai-container">
      {/* Branding Header */}
      <div className="brand-header">
        <div className="logo-circle"><Heart size={24} fill="#ff2d78" color="#ff2d78" /></div>
        <span className="brand-name">MummaCare+</span>
      </div>

      <div className="ai-header">
        <div className="ai-icon"><Bot size={26}/></div>
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
            {msg.sender === "bot" && <div className="bot-icon"><Bot size={16}/></div>}
            <div className={`chat-bubble ${msg.sender}-bubble`}>{msg.text}</div>
          </div>
        ))}
        {/* Loading Indicator */}
        {isTyping && (
          <div className="chat-row bot-row">
            <div className="bot-icon"><Bot size={16}/></div>
            <div className="chat-bubble bot-bubble typing-dots">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
      </div>

      {/* Floating Input Area */}
      <div className="floating-input-area">
        <input type="text" placeholder="Ask me anything..." value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={() => sendMessage()}><Send size={18}/></button>
      </div>
      
      <div style={{ height: "100px" }}></div>
    </div>
  );
}