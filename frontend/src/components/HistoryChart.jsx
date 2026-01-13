import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function HistoryChart({ data }) {
  return (
    <div style={styles.card} className="glass-card fade-in">

      <h3 style={styles.title}>📈 Risk History (Last 7 Days)</h3>

      <div style={{ width: "100%", height: 260 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
            <XAxis dataKey="day" stroke="white" opacity={0.7} />
            <YAxis stroke="white" opacity={0.7} />
            <Tooltip />
            <Line type="monotone" dataKey="risk" strokeWidth={3} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
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
  },
  title: {
    fontSize: "18px",
    fontWeight: "800",
    color: "white",
    marginBottom: "12px",
  },
};
