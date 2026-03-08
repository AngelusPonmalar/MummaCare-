import React, { useState, useEffect, useRef } from "react";
import "./Assessment.css";
import { Ruler, Weight, Activity, HeartPulse, Droplets, Heart } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function Assessment() {

  const pdfRef = useRef();
  const [editMode, setEditMode] = useState(false);

  const [data, setData] = useState({
    height: 165,
    weight: 62,
    bp: "120/80",
    hb: 12.5,

    confirmationScan: "",
    datingScan: "",
    anomalyScan: "",
    congenitalScan: "",
    growthScan: "",

    tt1: false,
    tt2: false
  });

  const [bmi, setBmi] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("assessmentData");
    if (saved) setData(JSON.parse(saved));
  }, []);

  useEffect(() => {
    const h = parseFloat(data.height);
    const w = parseFloat(data.weight);
    if (h > 0 && w > 0) {
      const heightInMeters = h / 100;
      setBmi((w / (heightInMeters * heightInMeters)).toFixed(1));
    }
  }, [data.height, data.weight]);

  const handleChange = (field, value) => setData({ ...data, [field]: value });

  const saveData = () => {
    localStorage.setItem("assessmentData", JSON.stringify(data));
    setEditMode(false);
  };

  const downloadPDF = async () => {
    const element = pdfRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("Medical_Assessment.pdf");
  };

  const bmiStatus = () => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal";
    if (bmi < 30) return "Overweight";
    return "Obese";
  };

  return (
    <div>

      {/* Floating Header */}
      <div className="brand-header">
        <div className="logo-circle">
          <Heart size={26} fill="#ff2d78" color="#ff2d78" />
        </div>
        <span className="brand-name">PregMa</span>
      </div>

      <div className="assessment-container" ref={pdfRef}>

        <div className="assessment-header">
          <h2 className="title">Medical Assessment 📋</h2>
          <div>
            {!editMode ? (
              <button className="update-btn" onClick={() => setEditMode(true)}>Update Assessment</button>
            ) : (
              <button className="save-btn" onClick={saveData}>Save</button>
            )}
            <button className="update-btn" onClick={downloadPDF}>Download PDF</button>
          </div>
        </div>

        {/* Height */}
        <div className="card pink-border">
          <div className="card-header"><Ruler size={18}/> Height (cm)</div>
          <input type="number" value={data.height} disabled={!editMode} onChange={e=>handleChange("height", e.target.value)} className="input-box"/>
          <h2 className="value pink">{data.height} cm</h2>
        </div>

        {/* Weight */}
        <div className="card purple-border">
          <div className="card-header"><Weight size={18}/> Weight (kg)</div>
          <input type="number" value={data.weight} disabled={!editMode} onChange={e=>handleChange("weight", e.target.value)} className="input-box"/>
          <h2 className="value purple">{data.weight} kg</h2>
        </div>

        {/* BMI */}
        <div className="card pink-border">
          <div className="card-header"><Activity size={18}/> BMI</div>
          <h2 className="value pink">{bmi}</h2>
          {bmi > 0 && <span className={`badge ${bmi < 25 ? "green" : "orange"}`}>{bmiStatus()}</span>}
        </div>

        {/* Blood Pressure */}
        <div className="card pink-border">
          <div className="card-header"><HeartPulse size={18}/> Blood Pressure</div>
          <input value={data.bp} disabled={!editMode} onChange={e=>handleChange("bp", e.target.value)} className="input-box"/>
          <h2 className="value red">{data.bp}</h2>
        </div>

        {/* Hemoglobin */}
        <div className="card purple-border">
          <div className="card-header"><Droplets size={18}/> Hemoglobin</div>
          <input type="number" value={data.hb} disabled={!editMode} onChange={e=>handleChange("hb", e.target.value)} className="input-box"/>
          <h2 className="value purple">{data.hb} g/dL</h2>
        </div>

        {/* Ultrasound Scans */}
        <div className="card pink-border">
          <div className="card-header">Ultrasound Scans</div>
          <input placeholder="Confirmation Scan" value={data.confirmationScan} disabled={!editMode} onChange={e=>handleChange("confirmationScan", e.target.value)} className="input-box"/>
          <input placeholder="Dating Scan" value={data.datingScan} disabled={!editMode} onChange={e=>handleChange("datingScan", e.target.value)} className="input-box"/>
          <input placeholder="Anomaly Scan" value={data.anomalyScan} disabled={!editMode} onChange={e=>handleChange("anomalyScan", e.target.value)} className="input-box"/>
          <input placeholder="Congenital Anomaly Scan" value={data.congenitalScan} disabled={!editMode} onChange={e=>handleChange("congenitalScan", e.target.value)} className="input-box"/>
          <input placeholder="Growth Scan" value={data.growthScan} disabled={!editMode} onChange={e=>handleChange("growthScan", e.target.value)} className="input-box"/>
        </div>

        {/* Immunization */}
        <div className="card purple-border">
          <div className="card-header">Immunization</div>
          <label><input type="checkbox" checked={data.tt1} disabled={!editMode} onChange={e=>handleChange("tt1", e.target.checked)}/> TT1 Vaccine</label>
          <label><input type="checkbox" checked={data.tt2} disabled={!editMode} onChange={e=>handleChange("tt2", e.target.checked)}/> TT2 Vaccine</label>
        </div>

        <div style={{height:"80px"}}></div>

      </div>
    </div>
  );
}

export default Assessment;
