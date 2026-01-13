import joblib
import numpy as np
import os

# Load scaler + features (same for both models)
scaler = joblib.load("models/scaler.pkl")
features = joblib.load("models/features.pkl")

# Prefer federated model if available
FED_MODEL_PATH = "models/federated_model.pkl"
CENTRAL_MODEL_PATH = "models/model.pkl"

if os.path.exists(FED_MODEL_PATH):
    model = joblib.load(FED_MODEL_PATH)
    MODEL_TYPE = "Federated Model ✅"
else:
    model = joblib.load(CENTRAL_MODEL_PATH)
    MODEL_TYPE = "Centralized Model ⚠️"

def predict_risk(data):
    """
    Predict heart disease risk using federated global model
    """

    input_row = []
    for col in features:
        value = data.get(col, 0)
        input_row.append(float(value))

    input_array = np.array([input_row])
    input_scaled = scaler.transform(input_array)

    prob = model.predict_proba(input_scaled)[0][1]
    risk_score = int(prob * 100)

    if risk_score < 35:
        label = "Low"
    elif risk_score < 70:
        label = "Medium"
    else:
        label = "High"

    return {
        "model_used": MODEL_TYPE,
        "risk_score": risk_score,
        "risk_label": label
    }
