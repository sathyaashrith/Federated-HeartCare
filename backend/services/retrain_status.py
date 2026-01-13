# backend/services/retrain_status.py

STATUS = {
    "state": "idle",       # idle | running | completed | failed
    "message": "No retraining started yet"
}

def set_status(state: str, message: str):
    STATUS["state"] = state
    STATUS["message"] = message

def get_status():
    return STATUS
