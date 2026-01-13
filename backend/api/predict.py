from flask import Blueprint, request, jsonify
from services.prediction_service import predict_risk

predict_bp = Blueprint("predict", __name__)

@predict_bp.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        result = predict_risk(data)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
