from flask import Blueprint, jsonify
import subprocess
import sys
import threading
import time

from services.retrain_status import set_status, get_status

retrain_bp = Blueprint("retrain", __name__)

def run_retraining_process():
    try:
        set_status("running", "🔄 Federated retraining is running...")

        # Start federated server
        server = subprocess.Popen([sys.executable, "federated/server.py"])
        time.sleep(2)

        # Start clients
        clients = subprocess.Popen([sys.executable, "run_federated.py"])

        # Wait until clients finish
        clients.wait()

        # Stop server after training
        server.terminate()

        set_status("completed", "✅ Federated retraining completed successfully!")

    except Exception as e:
        set_status("failed", f"❌ Retraining failed: {str(e)}")


@retrain_bp.route("/retrain", methods=["POST"])
def retrain():
    try:
        # Start retraining in background thread
        thread = threading.Thread(target=run_retraining_process)
        thread.start()

        return jsonify({"message": "🚀 Federated retraining started successfully!"})

    except Exception as e:
        set_status("failed", f"❌ Retraining failed: {str(e)}")
        return jsonify({"error": str(e)}), 500


@retrain_bp.route("/retrain-status", methods=["GET"])
def retrain_status():
    return jsonify(get_status())
