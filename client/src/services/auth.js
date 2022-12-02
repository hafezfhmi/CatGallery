import axios from "axios";

const baseUrl = "http://localhost:3001/auth";

const login = (email, password) => {
  return axios
    .post(`${baseUrl}/login`, { email, password }, { withCredentials: true })
    .then((response) => response.data);
};

const logout = () => {
  return axios.post(`${baseUrl}/logout`, {}, { withCredentials: true });
};

const signup = (
  username,
  firstName,
  lastName,
  email,
  password,
  confirmPassword
) => {
  return axios
    .post(`${baseUrl}/signup`, {
      username,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    })
    .then((response) => response.data);
};

const relog = () => {
  return axios
    .get(`${baseUrl}/relog`, { withCredentials: true })
    .then((response) => response.data);
};

const authServices = { login, logout, signup, relog };

export default authServices;
