import React, { useState, useEffect, useRef } from "react";
import { Heart, AlertTriangle, Download } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function MedicalHistory() {
  const [isEditing, setIsEditing] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const reportRef = useRef();

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

  // Screen width listener
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Risk Logic
  useEffect(() => {
    const newRisks = [];
    if (form.smoking) newRisks.push("Smoking: Risks fetal oxygen supply.");
    if (form.alcohol) newRisks.push("Alcohol: Unsafe for pregnancy.");
    if (parseInt(form.marriageAge) < 18) newRisks.push("Early pregnancy: Monitor closely.");
    if (form.familyHistory.diabetes) newRisks.push("Family Diabetes: Screen for GDM.");
    setRisks(newRisks);
  }, [form]);

  const handleChange = (key, value) => setForm({ ...form, [key]: value });
  const handleFamilyChange = (key, value) => setForm({ ...form, familyHistory: { ...form.familyHistory, [key]: value } });

  const columns = screenWidth <= 600 ? 1 : screenWidth <= 900 ? 2 : 4;

  // Download PDF
  const downloadPDF = () => {
    const input = reportRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Medical_History.pdf");
    });
  };

  return (
    <div style={styles.pageContainer} ref={reportRef}>
      {/* Floating Header */}
      <div style={styles.floatingHeader}>
        <div style={styles.logoCircle}>
          <Heart size={26} fill="#ff2d78" color="#ff2d78" />
        </div>
        <span style={styles.brandName}>MummaCare+</span>
      </div>

      <div style={{ height: "70px" }} /> {/* spacing for floating header */}

      <div style={styles.headerRow}>
        <h2 style={styles.title}>Medical History & Wellness 📋</h2>
        <div>
          <button style={styles.actionBtn} onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "💾 Save All" : "✏️ Edit Details"}
          </button>
          <button style={{ ...styles.actionBtn, marginLeft: "10px", background: "#FF69B4" }} onClick={downloadPDF}>
            <Download size={16} /> Download PDF
          </button>
        </div>
      </div>

      <div style={{ ...styles.gridContainer, gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        <div style={styles.column}>
          <div style={styles.card}>
            <h3 style={styles.sectionTitle}>Menstrual & Menarchial</h3>
            <label>Cycle Pattern</label>
            <input disabled={!isEditing} style={styles.input} value={form.menstrualCycle} onChange={(e) => handleChange("menstrualCycle", e.target.value)} />
            <label>Bleeding (Days)</label>
            <input disabled={!isEditing} style={styles.input} value={form.bleedingDuration} onChange={(e) => handleChange("bleedingDuration", e.target.value)} />
            <label>Age at Menarche</label>
            <input disabled={!isEditing} style={styles.input} value={form.ageMenarche} onChange={(e) => handleChange("ageMenarche", e.target.value)} />
          </div>
          <div style={styles.card}>
            <h3 style={styles.sectionTitle}>Socio-Economic</h3>
            <label>Occupation</label>
            <input disabled={!isEditing} style={styles.input} value={form.occupation} onChange={(e) => handleChange("occupation", e.target.value)} />
            <label>Living Conditions</label>
            <input disabled={!isEditing} style={styles.input} value={form.livingConditions} onChange={(e) => handleChange("livingConditions", e.target.value)} />
          </div>
        </div>

        <div style={styles.column}>
          <div style={styles.card}>
            <h3 style={styles.sectionTitle}>Marriage & Obstetrical</h3>
            <label>Age at Marriage</label>
            <input disabled={!isEditing} style={styles.input} value={form.marriageAge} onChange={(e) => handleChange("marriageAge", e.target.value)} />
            <label>Pregnancy Count</label>
            <input disabled={!isEditing} style={styles.input} value={form.pregnancyCount} onChange={(e) => handleChange("pregnancyCount", e.target.value)} />
            <label>Prev. Delivery</label>
            <input disabled={!isEditing} style={styles.input} value={form.prevDelivery} onChange={(e) => handleChange("prevDelivery", e.target.value)} />
          </div>
        </div>

        <div style={styles.column}>
          <div style={styles.card}>
            <h3 style={styles.sectionTitle}>Family History & Habits</h3>
            {["diabetes", "hypertension"].map(i => (
              <label key={i}><input disabled={!isEditing} type="checkbox" checked={form.familyHistory[i]} onChange={(e) => handleFamilyChange(i, e.target.checked)} /> {i}</label>
            ))}
            <label style={{ display: 'block', marginTop: '10px' }}>Diet</label>
            <input disabled={!isEditing} style={styles.input} value={form.diet} onChange={(e) => handleChange("diet", e.target.value)} />
            <label><input disabled={!isEditing} type="checkbox" checked={form.smoking} onChange={(e) => handleChange("smoking", e.target.checked)} /> Smoking</label>
          </div>
        </div>

        <div style={styles.riskCard}>
          <h3 style={{ color: '#d32f2f' }}><AlertTriangle size={18} /> Risk Factors</h3>
          {risks.length > 0 ? risks.map((r, i) => <p key={i} style={styles.riskText}>• {r}</p>) : <p style={styles.safeText}>✓ No major risks identified.</p>}
          <p style={styles.disclaimer}>*Disclaimer: Not a medical diagnosis. Consult a doctor.</p>
        </div>
      </div>

      <div style={{ height: "80px", width: "100%" }}></div>
    </div>
  );
}

const styles = {
  pageContainer: { padding: "20px", background: "#FFF8FB", minHeight: "100vh" },
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
  logoCircle: { width: "40px", height: "40px", borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" },
  brandName: { fontSize: "20px", fontWeight: "bold", color: "#E91E63" },
  headerRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap" },
  title: { fontSize: "22px", fontWeight: "bold", color: "#E91E63" },
  actionBtn: { background: "#E91E63", color: "white", border: "none", padding: "10px 20px", borderRadius: "20px", cursor: "pointer", fontWeight: "bold", marginTop: "10px" },
  gridContainer: { display: "grid", gap: "20px", alignItems: "start" },
  column: { display: "flex", flexDirection: "column", gap: "20px" },
  card: { background: "#ffffff", padding: "20px", borderRadius: "16px", border: "1px solid #FCE4EC", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" },
  sectionTitle: { color: "#E91E63", marginBottom: "10px" },
  riskCard: { background: "#fff5f5", padding: "20px", borderRadius: "16px", border: "2px solid #ffcdd2" },
  input: { width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #FCE4EC", marginBottom: "10px", boxSizing: "border-box" },
  riskText: { color: "#d32f2f", fontSize: "13px", fontWeight: "600" },
  safeText: { color: "#2e7d32", fontSize: "13px" },
  disclaimer: { marginTop: "20px", fontSize: "10px", color: "#888", fontStyle: "italic" },
};
