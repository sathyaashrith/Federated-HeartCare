from drift.detector import DriftDetector

# global drift detector instance
drift_detector = DriftDetector(threshold=0.6)

def initialize_baseline(baseline_data):
    """
    baseline_data: numpy array
    """
    drift_detector.fit_baseline(baseline_data)

def detect_user_drift(new_data):
    """
    new_data: numpy array
    """
    return drift_detector.check_drift(new_data)
