import axios from "axios";

export const getRetrainStatus = async () => {
  const res = await axios.get("http://127.0.0.1:5000/api/retrain-status");
  return res.data;
};
