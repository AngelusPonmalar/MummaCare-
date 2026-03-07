import React, { useState, useEffect } from "react";
import "./Assessment.css";
import { Ruler, Weight, Activity, HeartPulse, Droplets, Heart } from "lucide-react";

function Assessment() {
  const [editMode, setEditMode] = useState(false);
  const [data, setData] = useState({ height: 165, weight: 62, bp: "120/80", hb: 12.5 });
  const [bmi, setBmi] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("assessmentData");
    if (saved) setData(JSON.parse(saved));
  }, []);

  // Updated BMI calculation with safety check
  useEffect(() => {
    const h = parseFloat(data.height);
    const w = parseFloat(data.weight);
    
    if (h > 0 && w > 0) {
      const heightInMeters = h / 100;
      const calculatedBmi = (w / (heightInMeters * heightInMeters)).toFixed(1);
      setBmi(calculatedBmi);
    } else {
      setBmi(0);
    }
  }, [data.height, data.weight]);

  const handleChange = (field, value) => setData({ ...data, [field]: value });

  const saveData = () => {
    localStorage.setItem("assessmentData", JSON.stringify(data));
    let weightHistory = JSON.parse(localStorage.getItem("weightHistory")) || [];
    weightHistory.push({ date: new Date().toLocaleDateString(), weight: Number(data.weight) });
    localStorage.setItem("weightHistory", JSON.stringify(weightHistory));
    setEditMode(false);
  };

  const bmiStatus = () => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal";
    if (bmi < 30) return "Overweight";
    return "Obese";
  };

  return (
    <div className="assessment-container">
      {/* Updated Branding Header */}
      <div className="brand-header">
        <div className="logo-circle">
          <Heart size={32} fill="#ff2d78" color="#ff2d78" />
        </div>
        <span className="brand-name">MummaCare+</span>
      </div>

      <div className="assessment-header">
        <div className="title-section">
          <h2>Medical Assessment</h2>
          <p>Track your vital measurements</p>
        </div>
        {!editMode ? (
          <button className="update-btn" onClick={() => setEditMode(true)}>Update Assessment</button>
        ) : (
          <button className="save-btn" onClick={saveData}>Save</button>
        )}
      </div>

      {/* Height Card */}
      <div className="card pink-border">
        <div className="card-header"><Ruler size={18}/> <span>Height (cm)</span></div>
        <input type="number" value={data.height} disabled={!editMode} onChange={(e)=>handleChange("height", e.target.value)} className="input-box" />
        <h2 className="value pink">{data.height} cm</h2>
      </div>

      {/* Weight Card */}
      <div className="card purple-border">
        <div className="card-header"><Weight size={18}/> <span>Weight (kg)</span></div>
        <input type="number" value={data.weight} disabled={!editMode} onChange={(e)=>handleChange("weight", e.target.value)} className="input-box" />
        <h2 className="value purple">{data.weight} kg</h2>
      </div>

      {/* BMI Card - Automatic Calculation */}
      <div className="card pink-border">
        <div className="card-header"><Activity size={18}/> <span>BMI (Auto Calculated)</span></div>
        <h2 className="value pink">{bmi > 0 ? bmi : "--"}</h2>
        {bmi > 0 && <span className={`badge ${bmi < 25 ? "green" : "orange"}`}>{bmiStatus()}</span>}
      </div>

      {/* Other Vitals */}
      <div className="card pink-border">
        <div className="card-header"><HeartPulse size={18}/> <span>Blood Pressure (mmHg)</span></div>
        <input type="text" value={data.bp} disabled={!editMode} onChange={(e)=>handleChange("bp", e.target.value)} className="input-box" />
        <h2 className="value red">{data.bp}</h2>
      </div>

      <div className="card purple-border">
        <div className="card-header"><Droplets size={18}/> <span>Hemoglobin Level (g/dL)</span></div>
        <input type="number" value={data.hb} disabled={!editMode} onChange={(e)=>handleChange("hb", e.target.value)} className="input-box" />
        <h2 className="value purple">{data.hb} g/dL</h2>
      </div>

      <div className="note-box">
        <strong>Note</strong>
        <p>Your weight chart on the Home screen will automatically update when you save new measurements.</p>
      </div>
      
      <div style={{ height: "80px" }}></div>
    </div>
  );
}

export default Assessment;