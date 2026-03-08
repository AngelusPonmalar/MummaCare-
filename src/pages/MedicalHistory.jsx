import React, { useState, useEffect } from "react";
import { Heart, AlertTriangle } from "lucide-react";

export default function MedicalHistory() {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    menstrualCycle: "Regular",
    bleedingDuration: "5",
    ageMenarche: "13",
    marriageAge: "24",
    familyHistory: { diabetes: false, hypertension: false, genetic: false, thyroid: false, other: "" },
    pregnancyCount: "First",
    prevDelivery: "Normal",
    prevComplications: "",
    diet: "Vegetarian",
    smoking: false,
    alcohol: false,
    occupation: "Teacher",
    education: "Graduate",
    livingConditions: "Good",
    familySupport: "Strong",
  });

  const [risks, setRisks] = useState([]);

  // Risk Logic
  useEffect(() => {
    const newRisks = [];
    if (form.smoking) newRisks.push({ text: "Smoking: Risks fetal oxygen supply.", source: "Smoking: Yes" });
    if (form.alcohol) newRisks.push({ text: "Alcohol: Unsafe for pregnancy.", source: "Alcohol: Yes" });
    if (parseInt(form.marriageAge) < 18) newRisks.push({ text: "Early pregnancy: Monitor closely.", source: `Marriage Age: ${form.marriageAge}` });
    if (form.familyHistory.diabetes) newRisks.push({ text: "Family Diabetes: Screen for GDM.", source: "Family History Diabetes" });
    setRisks(newRisks);
  }, [form]);

  const handleChange = (key, value) => setForm({ ...form, [key]: value });
  const handleFamilyChange = (key, value) => setForm({ ...form, familyHistory: { ...form.familyHistory, [key]: value } });

  return (
    <div className="medical-page">

      {/* Inline CSS */}
      <style>{`
        .medical-page{
          padding:20px;
          min-height:100vh;
          background:#FFF8FB;
          font-family: "Segoe UI", sans-serif;
        }
        .brand-header{
          position: fixed;
          top:0;
          left:0;
          width:100%;
          display:flex;
          align-items:center;
          gap:12px;
          padding:12px 20px;
          background:#ffe6ef;
          border-radius:0 0 16px 16px;
          box-shadow:0 2px 6px rgba(0,0,0,0.08);
          z-index:1000;
        }
        .logo-circle{
          width:50px;
          height:50px;
          border-radius:50%;
          background:#fff;
          display:flex;
          align-items:center;
          justify-content:center;
          box-shadow:0 4px 10px rgba(255,45,120,0.15);
        }
        .brand-name{
          font-weight:900;
          font-size:28px;
          color:#d61c5e;
        }
        .page-header{
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:20px;
          padding-top:80px; /* for fixed header */
        }
        .page-header h2{
          color:#E91E63;
          font-size:24px;
          font-weight:600;
        }
        .edit-btn{
          background:#ff2d78;
          color:white;
          border:none;
          padding:8px 16px;
          border-radius:20px;
          cursor:pointer;
          font-weight:600;
        }
        .grid-container{
          display:grid;
          grid-template-columns:repeat(4,1fr);
          gap:20px;
        }
        .column{
          display:flex;
          flex-direction:column;
          gap:20px;
        }
        .card{
          background:white;
          padding:20px;
          border-radius:16px;
          border:1px solid #FCE4EC;
          box-shadow:0 2px 8px rgba(0,0,0,0.05);
        }
        .risk-column{
          display:flex;
          flex-direction:column;
        }
        .risk-card{
          background:#fff5f5;
          padding:20px;
          border-radius:16px;
          border:2px solid #ffcdd2;
        }
        input[type=text], input[type=number]{
          width:100%;
          padding:8px;
          margin-bottom:10px;
          border-radius:8px;
          border:1px solid #FCE4EC;
          box-sizing:border-box;
        }
        .risk-source{
          font-size:12px;
          color:#555;
        }
        .safe-text{
          color:#2e7d32;
          font-size:13px;
        }
        .disclaimer{
          font-size:10px;
          color:#888;
          font-style:italic;
          margin-top:10px;
        }
        @media(max-width:1200px){
          .grid-container{grid-template-columns:repeat(2,1fr);}
        }
        @media(max-width:768px){
          .grid-container{grid-template-columns:1fr;}
        }
      `}</style>

      {/* Branding Header */}
      <div className="brand-header">
        <div className="logo-circle">
          <Heart size={32} fill="#ff2d78" color="#ff2d78" />
        </div>
        <span className="brand-name">MummaCare+</span>
      </div>

      <div className="page-header">
        <h2>Medical History & Wellness 📋</h2>
        <button className="edit-btn" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "💾 Save All" : "✏️ Edit Details"}
        </button>
      </div>

      <div className="grid-container">
        {/* Column 1: Menstrual */}
        <div className="column">
          <div className="card">
            <h3>Menstrual & Menarchial</h3>
            <label>Cycle Pattern</label>
            <input disabled={!isEditing} value={form.menstrualCycle} onChange={e => handleChange("menstrualCycle", e.target.value)} />
            <label>Bleeding (Days)</label>
            <input disabled={!isEditing} value={form.bleedingDuration} onChange={e => handleChange("bleedingDuration", e.target.value)} />
            <label>Age at Menarche</label>
            <input disabled={!isEditing} value={form.ageMenarche} onChange={e => handleChange("ageMenarche", e.target.value)} />
          </div>

          <div className="card">
            <h3>Socio-Economic</h3>
            <label>Occupation</label>
            <input disabled={!isEditing} value={form.occupation} onChange={e => handleChange("occupation", e.target.value)} />
            <label>Living Conditions</label>
            <input disabled={!isEditing} value={form.livingConditions} onChange={e => handleChange("livingConditions", e.target.value)} />
            <label>Education</label>
            <input disabled={!isEditing} value={form.education} onChange={e => handleChange("education", e.target.value)} />
            <label>Family Support</label>
            <input disabled={!isEditing} value={form.familySupport} onChange={e => handleChange("familySupport", e.target.value)} />
          </div>
        </div>

        {/* Column 2: Marriage & Obstetrical */}
        <div className="column">
          <div className="card">
            <h3>Marriage & Obstetrical</h3>
            <label>Age at Marriage</label>
            <input disabled={!isEditing} value={form.marriageAge} onChange={e => handleChange("marriageAge", e.target.value)} />
            <label>Pregnancy Count</label>
            <input disabled={!isEditing} value={form.pregnancyCount} onChange={e => handleChange("pregnancyCount", e.target.value)} />
            <label>Prev. Delivery</label>
            <input disabled={!isEditing} value={form.prevDelivery} onChange={e => handleChange("prevDelivery", e.target.value)} />
            <label>Prev. Complications</label>
            <input disabled={!isEditing} value={form.prevComplications} onChange={e => handleChange("prevComplications", e.target.value)} />
          </div>
        </div>

        {/* Column 3: Family History & Habits */}
        <div className="column">
          <div className="card">
            <h3>Family History & Habits</h3>
            {["diabetes", "hypertension", "genetic", "thyroid"].map(key => (
              <label key={key}>
                <input type="checkbox" disabled={!isEditing} checked={form.familyHistory[key]} onChange={e => handleFamilyChange(key, e.target.checked)} /> {key}
              </label>
            ))}
            <label>Other</label>
            <input disabled={!isEditing} value={form.familyHistory.other} onChange={e => handleFamilyChange("other", e.target.value)} />
            <label>Diet</label>
            <input disabled={!isEditing} value={form.diet} onChange={e => handleChange("diet", e.target.value)} />
            <label><input type="checkbox" disabled={!isEditing} checked={form.smoking} onChange={e => handleChange("smoking", e.target.checked)} /> Smoking</label>
            <label><input type="checkbox" disabled={!isEditing} checked={form.alcohol} onChange={e => handleChange("alcohol", e.target.checked)} /> Alcohol</label>
          </div>
        </div>

        {/* Column 4: Risk Factors */}
        <div className="risk-column">
          <div className="risk-card">
            <h3><AlertTriangle size={18}/> Risk Factors</h3>
            {risks.length > 0 ? risks.map((r, i) => (
              <p key={i}>• {r.text} <br /><span className="risk-source">({r.source})</span></p>
            )) : <p className="safe-text">✓ No major risks identified.</p>}
            <p className="disclaimer">*Disclaimer: Not a medical diagnosis. Consult a doctor.</p>
          </div>
        </div>
      </div>

      <div style={{height:"80px"}}></div>
    </div>
  );
}
