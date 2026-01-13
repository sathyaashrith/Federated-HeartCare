import React from "react";
import { BarChart3, Activity, HeartPulse, TrendingUp } from "lucide-react";

export default function Dashboard() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        padding: "40px",
        color: "white",
        background: "linear-gradient(135deg, #0f172a, #1e293b, #0f172a)",
      }}
    >
      {/* Heading */}
      <h1 style={{ fontSize: "38px", fontWeight: "800", marginBottom: "10px" }}>
        📊 Dashboard
      </h1>
      <p style={{ opacity: 0.8, marginBottom: "30px" }}>
        Welcome to your HeartCare Analytics Dashboard
      </p>

      {/* Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {/* Card 1 */}
        <div style={cardStyle}>
          <HeartPulse size={40} />
          <h3 style={titleStyle}>Total Predictions</h3>
          <p style={valueStyle}>128</p>
        </div>

        {/* Card 2 */}
        <div style={cardStyle}>
          <Activity size={40} />
          <h3 style={titleStyle}>Avg Risk Score</h3>
          <p style={valueStyle}>42%</p>
        </div>

        {/* Card 3 */}
        <div style={cardStyle}>
          <TrendingUp size={40} />
          <h3 style={titleStyle}>Drift Alerts</h3>
          <p style={valueStyle}>5</p>
        </div>

        {/* Card 4 */}
        <div style={cardStyle}>
          <BarChart3 size={40} />
          <h3 style={titleStyle}>Model Updates</h3>
          <p style={valueStyle}>3</p>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div
        style={{
          marginTop: "40px",
          padding: "25px",
          borderRadius: "18px",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.15)",
          backdropFilter: "blur(15px)",
        }}
      >
        <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "15px" }}>
          📈 Risk Score Trend (Coming Soon)
        </h2>
        <p style={{ opacity: 0.8 }}>
          You can add Recharts graphs here for risk history, drift detection,
          retraining rounds etc.
        </p>
      </div>
    </div>
  );
}

const cardStyle = {
  padding: "25px",
  borderRadius: "18px",
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.15)",
  backdropFilter: "blur(15px)",
  boxShadow: "0px 10px 25px rgba(0,0,0,0.3)",
};

const titleStyle = {
  marginTop: "15px",
  fontSize: "18px",
  fontWeight: "700",
};

const valueStyle = {
  marginTop: "10px",
  fontSize: "28px",
  fontWeight: "900",
};
