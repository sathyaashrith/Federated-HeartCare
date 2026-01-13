import axios from "axios";

export const setBaseline = async (values) => {
  const res = await axios.post("http://127.0.0.1:5000/api/baseline", { values });
  return res.data;
};

export const checkDrift = async (values) => {
  const res = await axios.post("http://127.0.0.1:5000/api/drift-check", { values });
  return res.data;
};
