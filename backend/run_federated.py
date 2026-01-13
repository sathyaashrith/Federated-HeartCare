import threading
import time
import pandas as pd
import flwr as fl
from sklearn.model_selection import train_test_split

from federated.client import HeartClient

DATA_PATH = "data/raw/heart.csv"

def load_data():
    print("📥 Loading dataset...")
    df = pd.read_csv(DATA_PATH)
    print("✅ Dataset loaded. Shape:", df.shape)

    # Convert target
    df["target"] = df["num"].apply(lambda x: 0 if x == 0 else 1)
    df = df.drop(columns=["id", "num"])

    # Fill missing numeric
    numeric_cols = df.select_dtypes(include=["int64", "float64"]).columns
    for col in numeric_cols:
        df[col] = df[col].fillna(df[col].median())

    # Fill missing categorical
    cat_cols = df.select_dtypes(include=["object"]).columns
    for col in cat_cols:
        df[col] = df[col].fillna(df[col].mode()[0])

    # One-hot encode
    df = pd.get_dummies(df, drop_first=True)

    X = df.drop(columns=["target"])
    y = df["target"]

    print("✅ Preprocessing done.")
    print("X shape:", X.shape, "y shape:", y.shape)
    return X, y

def start_client(X_part, y_part, client_id):
    try:
        print(f"📱 Client {client_id} preparing data...")

        X_train, X_test, y_train, y_test = train_test_split(
            X_part, y_part, test_size=0.2, random_state=42
        )

        client = HeartClient(X_train, y_train, X_test, y_test)

        print(f"📱 Client {client_id} connecting to server...")

        # Works with latest Flower versions
        fl.client.start_client(
            server_address="127.0.0.1:8080",
            client=client.to_client(),
        )

        print(f"✅ Client {client_id} finished.")

    except Exception as e:
        print(f"❌ Client {client_id} crashed:", str(e))

if __name__ == "__main__":
    try:
        print("🚀 Starting Federated Clients Runner...")

        X, y = load_data()

        client_splits = 3
        chunk_size = len(X) // client_splits

        threads = []
        for i in range(client_splits):
            start_idx = i * chunk_size
            end_idx = (i + 1) * chunk_size if i != client_splits - 1 else len(X)

            X_part = X.iloc[start_idx:end_idx]
            y_part = y.iloc[start_idx:end_idx]

            t = threading.Thread(target=start_client, args=(X_part, y_part, i + 1))
            t.start()
            threads.append(t)

            time.sleep(0.2)

        for t in threads:
            t.join()

        print("🎉 All clients completed.")

    except Exception as e:
        print("❌ run_federated.py failed:", str(e))
