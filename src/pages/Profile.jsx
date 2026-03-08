import React, { useState } from "react";
import { Heart } from "lucide-react";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    name: "Sarah Johnson",
    age: "28",
    husband: "Michael Johnson",
    address: "123 Garden Street, Green Valley",
    mother: "Emily Smith",
    father: "Robert Smith",
    gravida: "2",
    para: "1",
    livingChild: "1",
    loss: "0",
    lmp: "2025-09-15",
    edd: "2026-06-22",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div>

      {/* Floating Header */}
      <div style={brandHeader}>
        <div style={logoCircle}>
          <Heart size={26} fill="#ff2d78" color="#ff2d78" />
        </div>
        <span style={brandName}>PregMa</span>
      </div>

      <div style={pageWrapper}>

        <div style={headerRow}>
          <h2 style={title}>Mother Profile 👩‍🍼</h2>

          <button style={editButton} onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "💾 Save Profile" : "✏️ Edit Profile"}
          </button>
        </div>

        <div style={gridContainer}>

          {/* Basic Information */}
          <div style={card}>
            <h3 style={sectionTitle}>👤 Basic Information</h3>

            {renderInput("Name", "name", form.name, isEditing, handleChange)}
            {renderInput("Age", "age", form.age, isEditing, handleChange)}
            {renderInput("Husband Name", "husband", form.husband, isEditing, handleChange)}
            {renderInput("House Address", "address", form.address, isEditing, handleChange)}
            {renderInput("Mother Name", "mother", form.mother, isEditing, handleChange)}
            {renderInput("Father Name", "father", form.father, isEditing, handleChange)}
          </div>

          {/* Pregnancy Information */}
          <div style={card}>
            <h3 style={sectionTitle}>🤰 Pregnancy Information</h3>

            {renderInput("Gravida (Total pregnancies)", "gravida", form.gravida, isEditing, handleChange)}
            {renderInput("Para (Births)", "para", form.para, isEditing, handleChange)}
            {renderInput("Living Children", "livingChild", form.livingChild, isEditing, handleChange)}
            {renderInput("Abortion / Death History", "loss", form.loss, isEditing, handleChange)}
            {renderInput("Last Menstrual Period", "lmp", form.lmp, isEditing, handleChange, "date")}
            {renderInput("Expected Delivery Date", "edd", form.edd, isEditing, handleChange, "date")}
          </div>

          {/* Summary */}
          <div
            style={{
              ...card,
              background: "#FFF0F5",
              border: "1px solid #FFC0CB",
            }}
          >
            <h3 style={{ ...sectionTitle, color: "#D81B60" }}>
              ❤️ Quick Summary
            </h3>

            <div style={summaryGrid}>
              <div>
                <label style={labelStyle}>Gravida</label>
                <p style={textStyle}>{form.gravida}</p>
              </div>

              <div>
                <label style={labelStyle}>Para</label>
                <p style={textStyle}>{form.para}</p>
              </div>

              <div>
                <label style={labelStyle}>Living Children</label>
                <p style={textStyle}>{form.livingChild}</p>
              </div>

              <div>
                <label style={labelStyle}>Age</label>
                <p style={textStyle}>{form.age} years</p>
              </div>
            </div>
          </div>

        </div>

        <div style={{ height: "100px" }}></div>
      </div>
    </div>
  );
}

function renderInput(label, name, value, isEditing, onChange, type = "text") {
  return (
    <div style={{ marginBottom: "15px" }}>
      <label style={labelStyle}>{label}</label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={!isEditing}
        style={inputStyle}
      />
    </div>
  );
}

/* ---------- Styles ---------- */

const brandHeader = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "12px 20px",
  background: "#FFF8FB",
  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
  zIndex: 1000,
};

const logoCircle = {
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  background: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
};

const brandName = {
  fontSize: "22px",
  fontWeight: "bold",
  color: "#E91E63",
};

const pageWrapper = {
  width: "100%",
  minHeight: "100vh",
  background: "#FFF8FB",
  padding: "20px",
  paddingTop: "90px",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const headerRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  marginBottom: "20px",
  width: "100%",
  maxWidth: "1200px",
};

const gridContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "20px",
  width: "100%",
  maxWidth: "1200px",
};

const card = {
  background: "#ffffff",
  padding: "25px",
  borderRadius: "16px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  border: "1px solid #FCE4EC",
  width: "100%",
};

const summaryGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "15px",
};

const labelStyle = {
  display: "block",
  color: "#555",
  marginBottom: "5px",
  fontSize: "14px",
};

const textStyle = {
  margin: 0,
  fontWeight: "bold",
  fontSize: "16px",
  color: "#333",
};

const title = {
  color: "#E91E63",
  margin: 0,
  fontSize: "20px",
  fontWeight: "600",
};

const editButton = {
  background: "#E91E63",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "20px",
  cursor: "pointer",
  fontWeight: "bold",
};

const sectionTitle = {
  color: "#7B1FA2",
  marginBottom: "15px",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #FCE4EC",
  background: "#fcfcfc",
  outline: "none",
  boxSizing: "border-box",
};
