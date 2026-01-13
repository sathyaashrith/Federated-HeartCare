import flwr as fl
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score

class HeartClient(fl.client.NumPyClient):
    def __init__(self, X_train, y_train, X_test, y_test):
        self.model = LogisticRegression(max_iter=2000)
        self.scaler = StandardScaler()

        self.X_train = self.scaler.fit_transform(X_train)
        self.X_test = self.scaler.transform(X_test)

        self.y_train = y_train
        self.y_test = y_test

        # Initialize model
        self.model.fit(self.X_train, self.y_train)

    def get_parameters(self, config=None):
        return [self.model.coef_, self.model.intercept_]

    def set_parameters(self, parameters):
        self.model.coef_ = parameters[0]
        self.model.intercept_ = parameters[1]

    def fit(self, parameters, config=None):
        self.set_parameters(parameters)
        self.model.fit(self.X_train, self.y_train)
        return self.get_parameters(), len(self.X_train), {}

    def evaluate(self, parameters, config=None):
        self.set_parameters(parameters)
        preds = self.model.predict(self.X_test)
        acc = accuracy_score(self.y_test, preds)
        loss = 1 - acc
        return float(loss), len(self.X_test), {"accuracy": float(acc)}
