import React from "react";

export default function History() {
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
      <h1 style={{ fontSize: "38px", fontWeight: "800" }}>📜 History</h1>
      <p style={{ opacity: 0.8, marginTop: "10px" }}>
        Your previous predictions will appear here.
      </p>

      <div
        style={{
          marginTop: "30px",
          padding: "25px",
          borderRadius: "18px",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.15)",
          backdropFilter: "blur(15px)",
        }}
      >
        <h2 style={{ fontSize: "22px", fontWeight: "700" }}>
          📊 Recent Predictions
        </h2>
        <p style={{ opacity: 0.8, marginTop: "10px" }}>
          (We will connect backend history API later)
        </p>
      </div>
    </div>
  );
}
