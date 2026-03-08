import React, { useState } from "react";
import axios from "axios";
import { Send, Bot, Heart } from "lucide-react";

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
    <div style={{ paddingTop: "70px", paddingBottom: "120px", background: "#FFF8FB", minHeight: "100vh" }}>
      {/* Floating Header */}
      <div style={styles.floatingHeader}>
        <div style={styles.logoCircle}><Heart size={28} fill="#ff2d78" color="#ff2d78" /></div>
        <span style={styles.brandName}>PregMa</span>
      </div>

      {/* AI Header */}
      <div style={{ margin: "20px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Bot size={26} />
          <h2 style={{ color: "#E91E63", fontWeight: "bold", margin: 0 }}>AI Pregnancy Companion</h2>
        </div>
      </div>

      {/* Quick questions */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "15px" }}>
        {quickQuestions.map((q, i) => (
          <button
            key={i}
            style={{
              padding: "8px 12px",
              borderRadius: "20px",
              border: "none",
              background: "#FF69B4",
              color: "#fff",
              cursor: "pointer",
              fontSize: "13px"
            }}
            onClick={() => sendMessage(q)}
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Box */}
      <div style={{ maxHeight: "calc(100vh - 250px)", overflowY: "auto" }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: "flex", marginBottom: "10px", alignItems: "flex-end", flexDirection: msg.sender === "user" ? "row-reverse" : "row" }}>
            {msg.sender === "bot" && <Bot size={16} style={{ marginRight: "6px" }} />}
            <div style={{
              background: msg.sender === "bot" ? "#FFF0F5" : "#E91E63",
              color: msg.sender === "bot" ? "#000" : "#fff",
              padding: "10px 14px",
              borderRadius: "16px",
              maxWidth: "70%",
              wordBreak: "break-word",
              fontSize: "14px"
            }}>
              {msg.text}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div style={{ display: "flex", marginBottom: "10px", alignItems: "center" }}>
            <Bot size={16} style={{ marginRight: "6px" }} />
            <div style={{ background: "#FFF0F5", padding: "10px 14px", borderRadius: "16px", display: "flex", gap: "4px" }}>
              <span style={styles.dot}></span>
              <span style={styles.dot}></span>
              <span style={styles.dot}></span>
            </div>
          </div>
        )}
      </div>

      {/* Floating Input */}
      <div style={styles.floatingInputArea}>
        <input
          type="text"
          placeholder="Ask me anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          style={styles.inputBox}
        />
        <button style={styles.sendBtn} onClick={() => sendMessage()}><Send size={18} /></button>
      </div>
    </div>
  );
}

const styles = {
  floatingHeader: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "60px",
    background: "#fff0f5",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "0 20px",
    zIndex: 999,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  },
  logoCircle: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
  },
  brandName: { fontSize: "20px", fontWeight: "bold", color: "#E91E63" },
  floatingInputArea: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    display: "flex",
    padding: "10px 15px",
    background: "#fff8f8",
    boxShadow: "0 -2px 8px rgba(0,0,0,0.1)",
    gap: "10px",
    alignItems: "center",
    zIndex: 998
  },
  inputBox: { flex: 1, padding: "10px 14px", borderRadius: "20px", border: "1px solid #FCE4EC", outline: "none" },
  sendBtn: { background: "#E91E63", color: "#fff", border: "none", padding: "10px 15px", borderRadius: "50%", cursor: "pointer" },
  dot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#E91E63",
    display: "inline-block",
    animation: "blink 1.4s infinite both"
  }
};
