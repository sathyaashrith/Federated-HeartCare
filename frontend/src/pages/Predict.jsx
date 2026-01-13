import React, { useMemo, useState } from "react";
import axios from "axios";

import RiskGauge from "../components/RiskGauge";
import RiskTrendChart from "../components/RiskTrendChart";
import RiskHistoryChart from "../components/RiskHistoryChart";

const API_BASE = "http://127.0.0.1:5000";

export default function Predict() {
  // ------------------- FORM STATE -------------------
  const [formData, setFormData] = useState({
    age: 45,
    sex: "Male",
    dataset: "Cleveland",
    cp: "typical angina",
    trestbps: 120,
    chol: 200,
    fbs: "0 (≤ 120 mg/dl)",
    restecg: "normal",
    thalach: 150,
    exang: "0 (No)",
    oldpeak: 1,
    slope: "flat",
    ca: 0,
    thal: "normal",
  });

  // ------------------- UI STATE -------------------
  const [loading, setLoading] = useState(false);
  const [baselineLoading, setBaselineLoading] = useState(false);
  const [driftLoading, setDriftLoading] = useState(false);

  const [result, setResult] = useState(null);
  const [baselineMsg, setBaselineMsg] = useState("");
  const [driftMsg, setDriftMsg] = useState("");

  // Charts data (frontend demo, updates when prediction changes)
  const [trendData, setTrendData] = useState([
    { name: "T-6", risk: 22 },
    { name: "T-5", risk: 28 },
    { name: "T-4", risk: 30 },
    { name: "T-3", risk: 25 },
    { name: "T-2", risk: 35 },
    { name: "T-1", risk: 40 },
    { name: "Now", risk: 23 },
  ]);

  const [historyData, setHistoryData] = useState([
    { day: "Mon", risk: 15 },
    { day: "Tue", risk: 22 },
    { day: "Wed", risk: 35 },
    { day: "Thu", risk: 28 },
    { day: "Fri", risk: 45 },
    { day: "Sat", risk: 32 },
    { day: "Sun", risk: 23 },
  ]);

  // ------------------- HELPERS -------------------
  const riskPercent = useMemo(() => {
    if (!result) return 23;
    const p = Number(result?.risk_score ?? result?.risk_percent ?? 23);
    return Math.max(0, Math.min(100, Math.round(p)));
  }, [result]);

  const riskLabel = useMemo(() => {
    if (riskPercent < 35) return "Low Risk";
    if (riskPercent < 70) return "Medium Risk";
    return "High Risk";
  }, [riskPercent]);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // Convert frontend values to backend-friendly numeric payload
  const buildPayload = () => {
    return {
      age: Number(formData.age),
      sex: formData.sex === "Male" ? 1 : 0,

      // You can map dataset if backend expects it (optional)
      dataset: formData.dataset,

      // cp mapping (example)
      cp:
        formData.cp === "typical angina"
          ? 0
          : formData.cp === "atypical angina"
          ? 1
          : formData.cp === "non-anginal pain"
          ? 2
          : 3,

      trestbps: Number(formData.trestbps),
      chol: Number(formData.chol),

      fbs: formData.fbs.startsWith("1") ? 1 : 0,

      restecg:
        formData.restecg === "normal"
          ? 0
          : formData.restecg === "ST-T abnormality"
          ? 1
          : 2,

      thalach: Number(formData.thalach),
      exang: formData.exang.startsWith("1") ? 1 : 0,
      oldpeak: Number(formData.oldpeak),

      slope:
        formData.slope === "upsloping"
          ? 0
          : formData.slope === "flat"
          ? 1
          : 2,

      ca: Number(formData.ca),

      thal:
        formData.thal === "normal"
          ? 1
          : formData.thal === "fixed defect"
          ? 2
          : 3,
    };
  };

  // ------------------- API CALLS -------------------
  const handlePredict = async () => {
    try {
      setLoading(true);
      setBaselineMsg("");
      setDriftMsg("");

      const payload = buildPayload();

      const res = await axios.post(`${API_BASE}/api/predict`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      // backend should return risk score
      // example expected: { risk_score: 65, model_used: "Federated Model", risk_level: "Medium" }
      const data = res.data;

      setResult({
        model_used: data.model_used || "Federated Model",
        risk_score: data.risk_score ?? data.risk_percent ?? 23,
        risk_level: data.risk_level || riskLabel,
      });

      // update charts
      const newRisk = Math.max(0, Math.min(100, Number(data.risk_score ?? 23)));

      setTrendData((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { name: "Now", risk: Math.round(newRisk) };
        return updated;
      });

      setHistoryData((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { day: "Sun", risk: Math.round(newRisk) };
        return updated;
      });
    } catch (err) {
      console.log("Predict Error:", err);
      alert("❌ Prediction failed. Check backend running on port 5000.");
    } finally {
      setLoading(false);
    }
  };

  const handleBaseline = async () => {
    try {
      setBaselineLoading(true);
      setBaselineMsg("");
      setDriftMsg("");

      const payload = buildPayload();

      const res = await axios.post(`${API_BASE}/api/baseline`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      setBaselineMsg(res.data?.message || "✅ Baseline set successfully!");
    } catch (err) {
      console.log("Baseline Error:", err);
      alert("❌ Baseline failed. Backend may not support /api/baseline");
    } finally {
      setBaselineLoading(false);
    }
  };

  const handleDrift = async () => {
    try {
      setDriftLoading(true);
      setDriftMsg("");
      setBaselineMsg("");

      const payload = buildPayload();

      const res = await axios.post(`${API_BASE}/api/drift-check`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      setDriftMsg(res.data?.message || "✅ Drift check completed!");
    } catch (err) {
      console.log("Drift Error:", err);
      alert("❌ Drift check failed. Backend may not support /api/drift-check");
    } finally {
      setDriftLoading(false);
    }
  };

  // ------------------- STYLES -------------------
  const pageStyle = {
    minHeight: "100vh",
    width: "100%",
    padding: "24px",
    color: "#fff",
    background:
      "radial-gradient(circle at top left, rgba(0,245,212,0.18), transparent 45%), radial-gradient(circle at bottom right, rgba(130,0,255,0.16), transparent 50%), linear-gradient(180deg, #070b14 0%, #050814 100%)",
  };

  const containerStyle = {
    display: "grid",
    gridTemplateColumns: "1.6fr 1fr",
    gap: "20px",
    alignItems: "start",
  };

  const cardStyle = {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "20px",
    padding: "20px",
    boxShadow: "0px 12px 40px rgba(0,0,0,0.35)",
    backdropFilter: "blur(12px)",
  };

  const labelStyle = {
    fontSize: "14px",
    opacity: 0.9,
    marginBottom: "6px",
    display: "block",
    fontWeight: 600,
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(0,0,0,0.25)",
    color: "#fff",
    outline: "none",
  };

  const grid2 = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "14px",
  };

  const buttonRowStyle = {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginTop: "14px",
  };

  const btnPrimary = {
    padding: "12px 20px",
    borderRadius: "14px",
    border: "none",
    fontWeight: "800",
    fontSize: "16px",
    cursor: "pointer",
    background: "linear-gradient(90deg, #00f5d4, #00bbf9)",
    color: "#041019",
    boxShadow: "0px 10px 30px rgba(0,245,212,0.25)",
    transition: "0.3s ease",
  };

  const btnGlass = {
    padding: "12px 20px",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.18)",
    fontWeight: "800",
    fontSize: "16px",
    cursor: "pointer",
    background: "rgba(255,255,255,0.08)",
    color: "#fff",
    backdropFilter: "blur(10px)",
    boxShadow: "0px 10px 25px rgba(0,0,0,0.25)",
    transition: "0.3s ease",
  };

  return (
    <div style={pageStyle}>
      <h1 style={{ fontSize: "34px", fontWeight: 900, marginBottom: "6px" }}>
        🩺 Heart Risk Prediction
      </h1>
      <p style={{ opacity: 0.8, marginBottom: "18px" }}>
        Federated Learning + Drift Detection + Adaptive Retraining
      </p>

      <div style={containerStyle}>
        {/* LEFT: FORM + RESULT */}
        <div style={cardStyle}>
          <h2 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "14px" }}>
            Patient Details
          </h2>

          <div style={grid2}>
            <div>
              <label style={labelStyle}>Age</label>
              <input
                style={inputStyle}
                type="number"
                value={formData.age}
                onChange={(e) => handleChange("age", e.target.value)}
              />
            </div>

            <div>
              <label style={labelStyle}>Sex</label>
              <select
                style={inputStyle}
                value={formData.sex}
                onChange={(e) => handleChange("sex", e.target.value)}
              >
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Dataset</label>
              <select
                style={inputStyle}
                value={formData.dataset}
                onChange={(e) => handleChange("dataset", e.target.value)}
              >
                <option>Cleveland</option>
                <option>Hungary</option>
                <option>Switzerland</option>
                <option>Long Beach</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Chest Pain Type (cp)</label>
              <select
                style={inputStyle}
                value={formData.cp}
                onChange={(e) => handleChange("cp", e.target.value)}
              >
                <option>typical angina</option>
                <option>atypical angina</option>
                <option>non-anginal pain</option>
                <option>asymptomatic</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Resting BP (trestbps)</label>
              <input
                style={inputStyle}
                type="number"
                value={formData.trestbps}
                onChange={(e) => handleChange("trestbps", e.target.value)}
              />
            </div>

            <div>
              <label style={labelStyle}>Cholesterol (chol)</label>
              <input
                style={inputStyle}
                type="number"
                value={formData.chol}
                onChange={(e) => handleChange("chol", e.target.value)}
              />
            </div>

            <div>
              <label style={labelStyle}>Fasting Blood Sugar (fbs)</label>
              <select
                style={inputStyle}
                value={formData.fbs}
                onChange={(e) => handleChange("fbs", e.target.value)}
              >
                <option>0 (≤ 120 mg/dl)</option>
                <option>1 (&gt; 120 mg/dl)</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Rest ECG (restecg)</label>
              <select
                style={inputStyle}
                value={formData.restecg}
                onChange={(e) => handleChange("restecg", e.target.value)}
              >
                <option>normal</option>
                <option>ST-T abnormality</option>
                <option>left ventricular hypertrophy</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Max HR Achieved (thalach)</label>
              <input
                style={inputStyle}
                type="number"
                value={formData.thalach}
                onChange={(e) => handleChange("thalach", e.target.value)}
              />
            </div>

            <div>
              <label style={labelStyle}>Exercise Induced Angina (exang)</label>
              <select
                style={inputStyle}
                value={formData.exang}
                onChange={(e) => handleChange("exang", e.target.value)}
              >
                <option>0 (No)</option>
                <option>1 (Yes)</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Oldpeak</label>
              <input
                style={inputStyle}
                type="number"
                step="0.1"
                value={formData.oldpeak}
                onChange={(e) => handleChange("oldpeak", e.target.value)}
              />
            </div>

            <div>
              <label style={labelStyle}>Slope</label>
              <select
                style={inputStyle}
                value={formData.slope}
                onChange={(e) => handleChange("slope", e.target.value)}
              >
                <option>upsloping</option>
                <option>flat</option>
                <option>downsloping</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>CA (major vessels)</label>
              <input
                style={inputStyle}
                type="number"
                value={formData.ca}
                onChange={(e) => handleChange("ca", e.target.value)}
              />
            </div>

            <div>
              <label style={labelStyle}>Thal</label>
              <select
                style={inputStyle}
                value={formData.thal}
                onChange={(e) => handleChange("thal", e.target.value)}
              >
                <option>normal</option>
                <option>fixed defect</option>
                <option>reversible defect</option>
              </select>
            </div>
          </div>

          {/* BUTTONS */}
          <div style={buttonRowStyle}>
            <button
              onClick={handlePredict}
              disabled={loading}
              style={{
                ...btnPrimary,
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Predicting..." : "Predict Risk"}
            </button>

            <button
              onClick={handleBaseline}
              disabled={baselineLoading}
              style={{
                ...btnGlass,
                opacity: baselineLoading ? 0.7 : 1,
              }}
            >
              {baselineLoading ? "Setting..." : "Set Baseline"}
            </button>

            <button
              onClick={handleDrift}
              disabled={driftLoading}
              style={{
                ...btnGlass,
                opacity: driftLoading ? 0.7 : 1,
              }}
            >
              {driftLoading ? "Checking..." : "Check Drift"}
            </button>
          </div>

          {/* MESSAGES */}
          {baselineMsg && (
            <p style={{ marginTop: "12px", color: "#00f5d4", fontWeight: 700 }}>
              {baselineMsg}
            </p>
          )}

          {driftMsg && (
            <p style={{ marginTop: "12px", color: "#ffcc00", fontWeight: 700 }}>
              {driftMsg}
            </p>
          )}

          {/* RESULT */}
          {result && (
            <div style={{ marginTop: "18px" }}>
              <h2 style={{ fontSize: "22px", fontWeight: 900 }}>
                ✅ Prediction Result
              </h2>

              <p style={{ marginTop: "8px", fontSize: "16px" }}>
                <b>Model Used:</b> {result.model_used}
              </p>
              <p style={{ marginTop: "6px", fontSize: "16px" }}>
                <b>Risk Score:</b> {riskPercent}%
              </p>
              <p style={{ marginTop: "6px", fontSize: "16px" }}>
                <b>Risk Level:</b> {riskLabel}
              </p>
            </div>
          )}
        </div>

        {/* RIGHT: GAUGE + CHARTS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={cardStyle}>
            <h2 style={{ fontSize: "18px", fontWeight: 800, marginBottom: "10px" }}>
              🧭 Risk Gauge
            </h2>
            <RiskGauge value={riskPercent} label={riskLabel} />
          </div>

          <div style={cardStyle}>
            <h2 style={{ fontSize: "18px", fontWeight: 800, marginBottom: "10px" }}>
              📈 Risk Trend
            </h2>
            <div style={{ width: "100%", height: 260 }}>
              <RiskTrendChart data={trendData} />
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={{ fontSize: "18px", fontWeight: 800, marginBottom: "10px" }}>
              📊 Risk History (Last 7 Days)
            </h2>
            <div style={{ width: "100%", height: 260 }}>
              <RiskHistoryChart data={historyData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
