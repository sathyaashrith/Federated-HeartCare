import flwr as fl
import joblib
import numpy as np
from sklearn.linear_model import LogisticRegression

# Load feature list (same as centralized training)
FEATURES_PATH = "models/features.pkl"

class SaveModelStrategy(fl.server.strategy.FedAvg):
    def aggregate_fit(self, server_round, results, failures):
        aggregated_parameters, aggregated_metrics = super().aggregate_fit(server_round, results, failures)

        if aggregated_parameters is not None:
            print(f"💾 Saving global model after round {server_round}...")

            # Convert Flower parameters to numpy arrays
            params = fl.common.parameters_to_ndarrays(aggregated_parameters)

            # Create Logistic Regression model and set weights
            model = LogisticRegression()
            model.classes_ = np.array([0, 1])
            model.coef_ = params[0]
            model.intercept_ = params[1]

            # Save model
            joblib.dump(model, "models/federated_model.pkl")
            print("✅ Saved federated global model -> models/federated_model.pkl")

        return aggregated_parameters, aggregated_metrics


def start_server():
    print("🚀 Federated Server Started on http://127.0.0.1:8080")

    strategy = SaveModelStrategy()

    fl.server.start_server(
        server_address="127.0.0.1:8080",
        config=fl.server.ServerConfig(num_rounds=5),
        strategy=strategy
    )

if __name__ == "__main__":
    start_server()
