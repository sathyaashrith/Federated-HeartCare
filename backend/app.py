from flask import Flask, request, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)  # ✅ allow frontend (5173) to call backend (5000)

# -------------------- TEST ROUTE --------------------
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Federated HeartCare Backend Running ✅"})

# -------------------- PREDICT ROUTE --------------------
@app.route("/api/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        # ✅ Example: generate risk score based on age + chol (dummy logic)
        age = float(data.get("age", 0))
        chol = float(data.get("chol", 0))

        score = min(0.95, max(0.05, (age / 100) + (chol / 1000)))
        risk_percent = int(score * 100)

        risk_level = "Low"
        if risk_percent >= 70:
            risk_level = "High"
        elif risk_percent >= 40:
            risk_level = "Medium"

        return jsonify({
            "risk_score": risk_percent,
            "risk_level": risk_level,
            "model_used": "Federated Model"
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# -------------------- BASELINE ROUTE --------------------
@app.route("/api/baseline", methods=["POST"])
def baseline():
    try:
        return jsonify({
            "message": "Baseline stored successfully ✅"
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# -------------------- DRIFT CHECK ROUTE --------------------
@app.route("/api/drift-check", methods=["POST", "OPTIONS"])
def drift_check():
    try:
        # ✅ Dummy drift detection result
        drift_detected = random.choice([True, False])

        return jsonify({
            "drift_detected": drift_detected,
            "drift_score": round(random.uniform(0.05, 0.95), 2),
            "message": "Drift detected ⚠️" if drift_detected else "No drift detected ✅"
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
