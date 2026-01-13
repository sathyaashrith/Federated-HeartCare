import numpy as np

class DriftDetector:
    """
    Simple drift detector using mean shift.
    If new data mean deviates too much from baseline → drift detected.
    """

    def __init__(self, threshold=0.6):
        self.threshold = threshold
        self.baseline_mean = None
        self.baseline_std = None

    def fit_baseline(self, data_array):
        """
        data_array: numpy array of recent baseline values
        """
        self.baseline_mean = np.mean(data_array, axis=0)
        self.baseline_std = np.std(data_array, axis=0) + 1e-6

    def check_drift(self, new_data_array):
        """
        Compare baseline vs new window
        """
        if self.baseline_mean is None:
            return False, 0.0

        new_mean = np.mean(new_data_array, axis=0)

        # normalized mean difference
        diff = np.abs(new_mean - self.baseline_mean) / self.baseline_std
        drift_score = float(np.mean(diff))

        drift_detected = drift_score > self.threshold
        return drift_detected, drift_score
