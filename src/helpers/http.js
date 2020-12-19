import axios from "axios";

const codes = [413, 401, 400, 403];

const validateStatus = (status) =>
  (status >= 200 && status < 300) || codes.includes(status);

export const api = axios.create({
  baseURL: "http://localhost:4000", // services url
  validateStatus,
  withCredentials: true,
});
