import React from "react";
import { Line } from "react-chartjs-2";
import { Calendar, Heart, Clock, Baby } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

/* ---------- Styles ---------- */

const container = {
  width: "100%",
  minHeight: "100vh",
  padding: "20px",
  background: "#FFF8FB",
  fontFamily: "sans-serif",
  color: "#333",
  boxSizing: "border-box"
};

/* Branding Header Styles */

const brandHeader = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "20px"
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

const titleStyle = {
  color: "#E91E63",
  marginBottom: "25px",
  fontSize: "28px"
};

const mainWrapper = {
  display: "flex",
  flexWrap: "wrap",
  gap: "30px",
  width: "100%"
};

const leftColumn = {
  flex: "1 1 450px",
  display: "flex",
  flexDirection: "column"
};

const rightColumn = {
  flex: "1 1 450px",
  display: "flex",
  flexDirection: "column"
};

const cardGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "15px",
  marginBottom: "25px"
};

const card = {
  background: "#FCE4EC",
  padding: "15px",
  borderRadius: "16px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  display: "flex",
  alignItems: "center",
  gap: "10px"
};

const iconStyle = { color: "#E91E63" };

const tipCard = {
  background: "#FFF3E0",
  padding: "20px",
  borderRadius: "16px",
  marginBottom: "15px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
};

const sectionTitle = {
  marginBottom: "12px",
  color: "#444",
  fontSize: "20px"
};

const chartBox = {
  background: "#FAFAFA",
  padding: "20px",
  borderRadius: "16px",
  marginBottom: "25px",
  width: "100%",
  boxSizing: "border-box"
};

/* ---------- Component ---------- */

export default function Home() {

  const weightData = {
    labels: ["Week 4", "Week 8", "Week 12", "Week 16", "Week 20"],
    datasets: [
      {
        label: "Weight Gain (kg)",
        data: [50, 52, 55, 58, 60],
        borderColor: "#F48FB1",
        tension: 0.4
      }
    ]
  };

  const fetalData = {
    labels: ["Week 8", "Week 12", "Week 16", "Week 20", "Week 24"],
    datasets: [
      {
        label: "Fetal Weight (g)",
        data: [2, 14, 100, 300, 600],
        borderColor: "#BA68C8",
        tension: 0.4
      }
    ]
  };

  return (
    <div style={container}>

      {/* Branding Header */}

      <div style={brandHeader}>
        <div style={logoCircle}>
          <Heart size={26} fill="#ff2d78" color="#ff2d78" />
        </div>
        <span style={brandName}>PregMa</span>
      </div>

      <h2 style={titleStyle}>Hello Mumma 🤍</h2>

      <div style={mainWrapper}>

        {/* LEFT SIDE */}

        <div style={leftColumn}>

          <div style={cardGrid}>

            <div style={card}>
              <Baby style={iconStyle} />
              <div>
                <h5 style={{ margin: 0, fontSize: "12px" }}>
                  Pregnancy Week
                </h5>
                <p style={{ margin: 0, fontWeight: "bold" }}>
                  24 Weeks
                </p>
              </div>
            </div>

            <div style={card}>
              <Clock style={iconStyle} />
              <div>
                <h5 style={{ margin: 0, fontSize: "12px" }}>
                  Trimester
                </h5>
                <p style={{ margin: 0, fontWeight: "bold" }}>
                  Second
                </p>
              </div>
            </div>

            <div style={card}>
              <Calendar style={iconStyle} />
              <div>
                <h5 style={{ margin: 0, fontSize: "12px" }}>
                  Last Menstrual Period
                </h5>
                <p style={{ margin: 0, fontWeight: "bold" }}>
                  Sep 15, 2025
                </p>
              </div>
            </div>

            <div style={card}>
              <Calendar style={iconStyle} />
              <div>
                <h5 style={{ margin: 0, fontSize: "12px" }}>
                  Expected Delivery Date
                </h5>
                <p style={{ margin: 0, fontWeight: "bold" }}>
                  Jun 22, 2026
                </p>
              </div>
            </div>

          </div>

          <div style={tipCard}>
            <h4 style={{ marginTop: 0 }}>Today's Health Tip</h4>
            <p>
              Drink plenty of water and include iron-rich foods
              like spinach and lentils.
            </p>
          </div>

        </div>

        {/* RIGHT SIDE */}

        <div style={rightColumn}>

          <h3 style={sectionTitle}>Pregnancy Weight Gain</h3>

          <div style={chartBox}>
            <Line data={weightData} options={{ responsive: true }} />
          </div>

          <h3 style={sectionTitle}>Fetal Growth Chart</h3>

          <div style={chartBox}>
            <Line data={fetalData} options={{ responsive: true }} />
          </div>

        </div>

      </div>

      <div style={{ height: "80px", width: "100%" }}></div>

    </div>
  );
}
