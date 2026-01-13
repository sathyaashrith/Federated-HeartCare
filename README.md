# 🫀 Federated-HeartCare  
### Heart Health Prediction App (Federated Learning + Drift Detection)

Federated-HeartCare is a **privacy-focused heart disease risk prediction system** built using **Flask (Backend)** and **React + Vite (Frontend)**.  
It predicts the heart disease risk score (**0–100%**) and classifies it as **Low / Medium / High**.  
It also supports **Baseline Setting** and **Drift Checking** to detect lifestyle/pattern changes.

---

## 🚀 Key Features
✅ Heart disease risk prediction (Low / Medium / High)  
✅ Risk score output (0–100%)  
✅ Privacy-friendly design (Federated Learning concept)  
✅ Drift Detection (detects changes in user patterns)  
✅ React UI with charts + risk gauge  
✅ Flask API backend  

---

## 🏗️ SDLC Overview (Like Building a House)
This project is built in 6 SDLC phases:

1. **Planning** → Define goal (predict risk without exposing raw data)  
2. **Analysis** → Study sensitive health data & privacy needs  
3. **Design** → Federated architecture + local learning idea  
4. **Implementation** → Backend + Frontend + APIs  
5. **Testing** → Accuracy + privacy + drift tests  
6. **Deployment** → Local deployment (future: Docker + cloud)

---

## 🔥 System Architecture (Simple)
### ❌ Traditional (Not Private)
User Data → Server → Model → Prediction

### ✅ Our Approach (Privacy-Friendly)
Model → Local Device Training → Share Updates Only → Improved Model

---

## ⚙️ Tech Stack
### Frontend
- React + Vite
- Axios (API calls)
- Recharts (Charts)

### Backend
- Python + Flask
- Flask-CORS
- Pandas, NumPy, Scikit-learn (ML training)

---

## 📊 Dataset
- **UCI Heart Disease Dataset**
- File: `backend/data/raw/heart.csv`

---

## 🧠 ML Workflow
### Training
- Data preprocessing (handle missing values + encoding)
- Model training using scikit-learn
- Output saved in:
  - `backend/models/model.pkl`
  - `backend/models/scaler.pkl`
  - `backend/models/features.pkl`

### Prediction
Frontend sends patient data → Backend returns:
- `risk_score` (0–100)
- `risk_level` (Low/Medium/High)

---

<img width="1917" height="945" alt="Screenshot 2026-01-13 180128" src="https://github.com/user-attachments/assets/4e245b33-bbe3-41a0-b4c6-08659dbe719a" />
<img width="1913" height="948" alt="Screenshot 2026-01-13 180109" src="https://github.com/user-attachments/assets/7e5d03bd-c196-450e-b450-779aebba67e2" />

