import axios from "axios";

export const retrainFederatedModel = async () => {
  const res = await axios.post("http://127.0.0.1:5000/api/retrain");
  return res.data;
};
