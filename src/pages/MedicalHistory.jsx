import React, { useState, useEffect } from "react";
import { Heart, AlertTriangle } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function MedicalHistory() {
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    menstrualCycle: "Regular",
    bleedingDuration: "5",
    ageMenarche: "13",
    marriageAge: "24",

    familyHistory: {
      diabetes: false,
      hypertension: false,
      thyroid: false
    },

    pregnancyCount: "First",
    prevDelivery: "Normal",
    prevComplications: "",

    diet: "Vegetarian",
    smoking: false,
    alcohol: false,

    occupation: "Teacher",
    education: "Graduate",
    livingConditions: "Good",
    familySupport: "Strong"
  });

  const [risks, setRisks] = useState([]);

  useEffect(() => {
    const newRisks = [];

    if (form.smoking) newRisks.push("Smoking: Risks fetal oxygen supply.");
    if (form.alcohol) newRisks.push("Alcohol: Unsafe for pregnancy.");
    if (parseInt(form.marriageAge) < 18)
      newRisks.push("Early pregnancy: Monitor closely.");
    if (form.familyHistory.diabetes)
      newRisks.push("Family Diabetes: Screen for GDM.");
    if (form.familyHistory.hypertension)
      newRisks.push("Family Hypertension: Monitor blood pressure.");
    if (form.familyHistory.thyroid)
      newRisks.push("Family Thyroid Disease: Thyroid tests recommended.");

    setRisks(newRisks);
  }, [form]);

  const handleChange = (key, value) =>
    setForm({ ...form, [key]: value });

  const handleFamilyChange = (key, value) =>
    setForm({
      ...form,
      familyHistory: { ...form.familyHistory, [key]: value }
    });

  /* -------- PDF DOWNLOAD -------- */

  const downloadPDF = async () => {
    const element = document.getElementById("medicalPDF");

    const canvas = await html2canvas(element);

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("Medical_History_Report.pdf");
  };

  return (
    <div>

      {/* Floating Header */}
      <div style={brandHeader}>
        <div style={logoCircle}>
          <Heart size={26} fill="#ff2d78" color="#ff2d78" />
        </div>
        <span style={brandName}>PregMa</span>
      </div>

      <div id="medicalPDF" style={styles.pageContainer}>

        <div style={styles.headerRow}>
          <h2 style={styles.title}>Medical History & Wellness 📋</h2>

          <div style={{ display: "flex", gap: "10px" }}>

            <button
              style={styles.actionBtn}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "💾 Save All" : "✏️ Edit Details"}
            </button>

            <button
              style={styles.actionBtn}
              onClick={downloadPDF}
            >
              ⬇ Download PDF
            </button>

          </div>
        </div>

        <div style={styles.gridContainer}>

          {/* Column 1 */}
          <div style={styles.card}>
            <h3>Menstrual History</h3>

            <label>Cycle Pattern</label>
            <input
              disabled={!isEditing}
              style={styles.input}
              value={form.menstrualCycle}
              onChange={(e) =>
                handleChange("menstrualCycle", e.target.value)
              }
            />

            <label>Bleeding Duration (Days)</label>
            <input
              disabled={!isEditing}
              style={styles.input}
              value={form.bleedingDuration}
              onChange={(e) =>
                handleChange("bleedingDuration", e.target.value)
              }
            />

            <label>Age at Menarche</label>
            <input
              disabled={!isEditing}
              style={styles.input}
              value={form.ageMenarche}
              onChange={(e) =>
                handleChange("ageMenarche", e.target.value)
              }
            />
          </div>

          {/* Column 2 */}
          <div style={styles.card}>
            <h3>Marriage & Obstetrical</h3>

            <label>Age at Marriage</label>
            <input
              disabled={!isEditing}
              style={styles.input}
              value={form.marriageAge}
              onChange={(e) =>
                handleChange("marriageAge", e.target.value)
              }
            />

            <label>Pregnancy Count</label>
            <input
              disabled={!isEditing}
              style={styles.input}
              value={form.pregnancyCount}
              onChange={(e) =>
                handleChange("pregnancyCount", e.target.value)
              }
            />

            <label>Previous Delivery Type</label>
            <input
              disabled={!isEditing}
              style={styles.input}
              value={form.prevDelivery}
              onChange={(e) =>
                handleChange("prevDelivery", e.target.value)
              }
            />

            <label>Previous Pregnancy Complications</label>
            <input
              disabled={!isEditing}
              style={styles.input}
              value={form.prevComplications}
              onChange={(e) =>
                handleChange("prevComplications", e.target.value)
              }
            />
          </div>

          {/* Column 3 (SPACING FIXED) */}
          <div style={styles.card}>
            <h3>Family History & Habits</h3>

            <div style={styles.checkboxGroup}>

              <label style={styles.checkboxItem}>
                <input
                  type="checkbox"
                  disabled={!isEditing}
                  checked={form.familyHistory.diabetes}
                  onChange={(e) =>
                    handleFamilyChange("diabetes", e.target.checked)
                  }
                />
                Diabetes
              </label>

              <label style={styles.checkboxItem}>
                <input
                  type="checkbox"
                  disabled={!isEditing}
                  checked={form.familyHistory.hypertension}
                  onChange={(e) =>
                    handleFamilyChange("hypertension", e.target.checked)
                  }
                />
                Hypertension
              </label>

              <label style={styles.checkboxItem}>
                <input
                  type="checkbox"
                  disabled={!isEditing}
                  checked={form.familyHistory.thyroid}
                  onChange={(e) =>
                    handleFamilyChange("thyroid", e.target.checked)
                  }
                />
                Thyroid Disorder
              </label>

              <label>Diet</label>
              <input
                disabled={!isEditing}
                style={styles.input}
                value={form.diet}
                onChange={(e) =>
                  handleChange("diet", e.target.value)
                }
              />

              <label style={styles.checkboxItem}>
                <input
                  type="checkbox"
                  disabled={!isEditing}
                  checked={form.smoking}
                  onChange={(e) =>
                    handleChange("smoking", e.target.checked)
                  }
                />
                Smoking
              </label>

            </div>
          </div>

          {/* Column 4 */}
          <div style={styles.riskCard}>
            <h3 style={{ color: "#d32f2f" }}>
              <AlertTriangle size={18} /> Risk Factors
            </h3>

            {risks.length > 0 ? (
              risks.map((r, i) => (
                <p key={i} style={styles.riskText}>• {r}</p>
              ))
            ) : (
              <p style={styles.safeText}>
                ✓ No major risks identified.
              </p>
            )}

            <p style={styles.disclaimer}>
              *Disclaimer: Not a medical diagnosis. Consult a doctor.
            </p>
          </div>

        </div>

        <div style={{ height: "80px" }}></div>

      </div>
    </div>
  );
}

/* ---------- Floating Header ---------- */

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
  zIndex: 1000
};

const logoCircle = {
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  background: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
};

const brandName = {
  fontSize: "22px",
  fontWeight: "bold",
  color: "#E91E63"
};

/* ---------- Page Styles ---------- */

const styles = {

  pageContainer: {
    padding: "20px",
    paddingTop: "90px",
    background: "#FFF8FB",
    minHeight: "100vh"
  },

  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },

  title: {
    color: "#E91E63",
    margin: 0,
    fontSize: "20px",
    fontWeight: "600"
  },

  actionBtn: {
    background: "#E91E63",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "20px",
    cursor: "pointer",
    fontWeight: "bold"
  },

  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))",
    gap: "20px"
  },

  card: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "16px",
    border: "1px solid #FCE4EC",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
  },

  checkboxGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },

  checkboxItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },

  riskCard: {
    background: "#fff5f5",
    padding: "20px",
    borderRadius: "16px",
    border: "2px solid #ffcdd2"
  },

  input: {
    width: "100%",
    padding: "8px",
    borderRadius: "8px",
    border: "1px solid #FCE4EC",
    marginBottom: "10px",
    boxSizing: "border-box"
  },

  riskText: {
    color: "#d32f2f",
    fontSize: "13px",
    fontWeight: "600"
  },

  safeText: {
    color: "#2e7d32",
    fontSize: "13px"
  },

  disclaimer: {
    marginTop: "20px",
    fontSize: "10px",
    color: "#888",
    fontStyle: "italic"
  }
};
