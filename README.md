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

## 📂 Folder Structure (Final)
Federated-HeartCare/
│
├── backend/
│ ├── app.py
│ ├── train_model.py
│ ├── requirements.txt
│ ├── .env.example
│ │
│ ├── api/
│ │ ├── init.py
│ │ ├── predict.py
│ │ ├── training.py
│ │ └── health.py
│ │
│ ├── services/
│ │ ├── prediction_service.py
│ │ ├── evaluation_service.py
│ │ └── model_swapper.py
│ │
│ ├── federated/
│ │ ├── server.py
│ │ ├── client.py
│ │ └── aggregation.py
│ │
│ ├── drift/
│ │ ├── detector.py
│ │ └── adaptive_learning.py
│ │
│ ├── utils/
│ │ ├── logger.py
│ │ └── validators.py
│ │
│ ├── data/
│ │ ├── raw/
│ │ │ ├── heart.csv
│ │ │ └── synthetic_data_generator.py
│ │ └── processed/
│ │
│ ├── models/
│ │ ├── model.pkl
│ │ ├── scaler.pkl
│ │ └── features.pkl
│ │
│ └── tests/
│ ├── test_api.py
│ └── test_privacy.py
│
├── frontend/
│ ├── package.json
│ ├── vite.config.js
│ ├── index.html
│ │
│ └── src/
│ ├── main.jsx
│ ├── App.jsx
│ ├── index.css
│ │
│ ├── pages/
│ │ ├── Dashboard.jsx
│ │ ├── Predict.jsx
│ │ └── Landing.jsx
│ │
│ ├── components/
│ │ ├── Sidebar.jsx
│ │ ├── RiskGauge.jsx
│ │ ├── RiskTrendChart.jsx
│ │ └── RiskHistoryChart.jsx
│ │
│ └── api/
│ ├── axiosConfig.js
│ └── predictionAPI.js
│
├── docs/
│ ├── ARCHITECTURE.md
│ └── SETUP_GUIDE.md
│
├── .gitignore
├── docker-compose.yml
└── README.md


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

## 🌐 API Endpoints
Backend runs on:  
📍 `http://127.0.0.1:5000`

### ✅ Health Check
GET `/`
```json
{ "message": "Federated HeartCare Backend Running ✅" }
