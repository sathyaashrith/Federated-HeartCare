from flask import Blueprint, request, jsonify
import numpy as np
from drift.adaptive_learning import initialize_baseline, detect_user_drift

training_bp = Blueprint("training", __name__)

@training_bp.route("/baseline", methods=["POST"])
def set_baseline():
    """
    User sends baseline lifestyle data window
    """
    data = request.get_json()
    values = np.array(data["values"])
    initialize_baseline(values)
    return jsonify({"message": "✅ Baseline initialized successfully"})

@training_bp.route("/drift-check", methods=["POST"])
def drift_check():
    """
    User sends new lifestyle window
    """
    data = request.get_json()
    values = np.array(data["values"])
    drift_detected, drift_score = detect_user_drift(values)

    return jsonify({
        "drift_detected": drift_detected,
        "drift_score": drift_score
    })
