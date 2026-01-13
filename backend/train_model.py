import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

DATA_PATH = "data/raw/heart.csv"

def train_and_save():
    df = pd.read_csv(DATA_PATH)

    # ---------------- TARGET ----------------
    # num: 0 = no disease, 1-4 = disease
    df["target"] = df["num"].apply(lambda x: 0 if x == 0 else 1)

    # Drop id and original num
    df = df.drop(columns=["id", "num"])

    # ---------------- HANDLE MISSING VALUES ----------------
    # Fill numeric missing with median
    numeric_cols = df.select_dtypes(include=["int64", "float64"]).columns
    for col in numeric_cols:
        df[col] = df[col].fillna(df[col].median())

    # Fill categorical missing with mode
    cat_cols = df.select_dtypes(include=["object"]).columns
    for col in cat_cols:
        df[col] = df[col].fillna(df[col].mode()[0])

    # ---------------- ONE HOT ENCODING ----------------
    df = pd.get_dummies(df, drop_first=True)

    X = df.drop(columns=["target"])
    y = df["target"]

    # Train/test split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    # Scaling
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # Model
    model = LogisticRegression(max_iter=2000)
    model.fit(X_train_scaled, y_train)

    # Evaluate
    y_pred = model.predict(X_test_scaled)
    acc = accuracy_score(y_test, y_pred)

    print("✅ Model trained successfully!")
    print(f"🎯 Accuracy: {acc*100:.2f}%")

    # Save model + scaler + feature list
    joblib.dump(model, "models/model.pkl")
    joblib.dump(scaler, "models/scaler.pkl")
    joblib.dump(list(X.columns), "models/features.pkl")

    print("💾 Saved files in backend/models/")
    print("   model.pkl")
    print("   scaler.pkl")
    print("   features.pkl")

if __name__ == "__main__":
    train_and_save()
