import React, { useState } from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

/* ---------- Pregnancy Calculator ---------- */

function getPregnancyInfo(lmpDate) {
  const today = new Date();
  const lmp = new Date(lmpDate);

  const diffDays = Math.floor((today - lmp) / (1000 * 60 * 60 * 24));
  const weeks = Math.max(0, Math.floor(diffDays / 7));

  let trimester = "First";
  if (weeks > 12 && weeks <= 27) trimester = "Second";
  if (weeks > 27) trimester = "Third";

  const edd = new Date(lmp);
  edd.setDate(edd.getDate() + 280);

  return { weeks, trimester, edd };
}

/* ---------- Baby Growth Data ---------- */

const babyGrowth = {
  8: { size: "Raspberry", weight: "2g", tip: "Baby’s fingers are forming." },
  12: { size: "Lime", weight: "14g", tip: "Baby can start moving tiny arms and legs." },
  16: { size: "Avocado", weight: "100g", tip: "Baby’s skeleton is developing." },
  20: { size: "Banana", weight: "300g", tip: "Baby can hear sounds now." },
  24: { size: "Corn 🌽", weight: "600g", tip: "Baby’s lungs are developing." },
  28: { size: "Eggplant", weight: "1kg", tip: "Baby can blink eyes." },
  32: { size: "Coconut", weight: "1.7kg", tip: "Bones are fully developed." },
  36: { size: "Papaya", weight: "2.6kg", tip: "Baby is preparing for birth." },
  40: { size: "Watermelon", weight: "3.2kg", tip: "Baby is ready to be born." }
};

function getBabyInfo(week) {
  let closest = 8;
  Object.keys(babyGrowth).forEach((w) => {
    if (week >= w) closest = w;
  });
  return babyGrowth[closest];
}

/* ---------- Styles ---------- */

const container = {
  width: "100%",
  minHeight: "100vh",
  padding: "20px",
  paddingTop: "90px",
  background: "#FFF8FB",
  fontFamily: "sans-serif",
  color: "#333",
  boxSizing: "border-box"
};

/* Floating Navbar */

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

const titleStyle = {
  color: "#E91E63",
  marginBottom: "25px",
  fontSize: "28px"
};

const mainWrapper = {
  display: "flex",
  flexWrap: "wrap",
  gap: "30px"
};

const leftColumn = {
  flex: "1 1 420px"
};

const rightColumn = {
  flex: "1 1 420px"
};

const cardGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(2,1fr)",
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

const chartBox = {
  background: "#FAFAFA",
  padding: "20px",
  borderRadius: "16px",
  marginBottom: "25px"
};

const progressBar = {
  width: "100%",
  height: "10px",
  background: "#FCE4EC",
  borderRadius: "20px",
  overflow: "hidden",
  marginTop: "8px"
};

const progressFill = (percent) => ({
  width: percent + "%",
  height: "100%",
  background: "#E91E63"
});

/* ---------- Component ---------- */

export default function Home() {

  const [LMP, setLMP] = useState("2025-09-15");

  const { weeks, trimester, edd } = getPregnancyInfo(LMP);

  const baby = getBabyInfo(weeks);

  const progress = Math.min((weeks / 40) * 100, 100);

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
    <div>

      {/* Floating Navbar */}
      <div style={brandHeader}>
        <div style={logoCircle}>
          <Heart size={26} fill="#ff2d78" color="#ff2d78" />
        </div>
        <span style={brandName}>PregMa</span>
      </div>

      <div style={container}>

        <h2 style={titleStyle}>Hello Mumma 🤍</h2>

        <div style={mainWrapper}>

          <div style={leftColumn}>

            <div style={cardGrid}>

              <div style={card}>
                <Baby style={iconStyle} />
                <div>
                  <h5 style={{ margin: 0, fontSize: "12px" }}>Pregnancy Week</h5>
                  <p style={{ margin: 0, fontWeight: "bold" }}>{weeks} Weeks</p>

                  <div style={progressBar}>
                    <div style={progressFill(progress)}></div>
                  </div>

                  <small>{weeks} / 40 weeks</small>
                </div>
              </div>

              <div style={card}>
                <Clock style={iconStyle} />
                <div>
                  <h5 style={{ margin: 0, fontSize: "12px" }}>Trimester</h5>
                  <p style={{ margin: 0, fontWeight: "bold" }}>{trimester}</p>
                </div>
              </div>

              <div style={card}>
                <Calendar style={iconStyle} />
                <div>
                  <h5 style={{ margin: 0, fontSize: "12px" }}>Last Menstrual Period</h5>

                  <input
                    type="date"
                    value={LMP}
                    onChange={(e) => setLMP(e.target.value)}
                    style={{
                      border: "none",
                      background: "transparent",
                      fontWeight: "bold"
                    }}
                  />
                </div>
              </div>

              <div style={card}>
                <Calendar style={iconStyle} />
                <div>
                  <h5 style={{ margin: 0, fontSize: "12px" }}>Expected Delivery Date</h5>
                  <p style={{ margin: 0, fontWeight: "bold" }}>
                    {edd.toDateString()}
                  </p>
                </div>
              </div>

            </div>

            <div style={tipCard}>
              <h4 style={{ marginTop: 0 }}>Baby Development</h4>
              <p><strong>Baby Size:</strong> {baby?.size}</p>
              <p><strong>Weight:</strong> {baby?.weight}</p>
              <p>{baby?.tip}</p>
            </div>

            <div style={tipCard}>
              <h4 style={{ marginTop: 0 }}>Today's Health Tip</h4>
              <p>
                Drink plenty of water and include iron-rich foods
                like spinach and lentils.
              </p>
            </div>

          </div>

          <div style={rightColumn}>

            <h3>Pregnancy Weight Gain</h3>

            <div style={chartBox}>
              <Line data={weightData} options={{ responsive: true }} />
            </div>

            <h3>Fetal Growth Chart</h3>

            <div style={chartBox}>
              <Line data={fetalData} options={{ responsive: true }} />
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
