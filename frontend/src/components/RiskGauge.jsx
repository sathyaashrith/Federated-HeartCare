import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

export default function RiskGauge({ value = 0 }) {
  const safeValue = Math.min(100, Math.max(0, Number(value) || 0));

  const data = [
    {
      name: "Risk",
      value: safeValue,
      fill: "url(#gradientFill)",
    },
  ];

  return (
    <div style={styles.card} className="glass-card fade-in">

      <h3 style={styles.title}>🧭 Risk Gauge</h3>

      <div style={{ width: "100%", height: 260, position: "relative" }}>
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="60%"
            innerRadius="70%"
            outerRadius="100%"
            barSize={18}
            data={data}
            startAngle={180}
            endAngle={0}
          >
            <defs>
              <linearGradient id="gradientFill" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#00ffcc" />
                <stop offset="50%" stopColor="#0077ff" />
                <stop offset="100%" stopColor="#ff00ff" />
              </linearGradient>
            </defs>

            <RadialBar
              minAngle={15}
              background
              clockWise
              dataKey="value"
              cornerRadius={12}
            />
          </RadialBarChart>
        </ResponsiveContainer>

        {/* Center Value */}
        <div style={styles.centerText}>
          <p style={styles.value}>{safeValue}%</p>
          <p style={styles.label}>
            {safeValue < 35 ? "Low Risk" : safeValue < 70 ? "Medium Risk" : "High Risk"}
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    width: "100%",
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "22px",
    padding: "18px",
    backdropFilter: "blur(18px)",
    boxShadow: "0px 20px 50px rgba(0,0,0,0.35)",
    color: "white",
  },
  title: {
    fontSize: "18px",
    fontWeight: "800",
    marginBottom: "12px",
  },
  centerText: {
    position: "absolute",
    top: "55%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
  },
  value: {
    fontSize: "30px",
    fontWeight: "900",
  },
  label: {
    marginTop: "6px",
    fontSize: "13px",
    opacity: 0.8,
  },
};
