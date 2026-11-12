import axios from "axios";
import { useAuthStore } from "../store/auth";

const api = axios.create({
  
//  baseURL:'/',
baseURL:'http://127.0.0.1:8000',
  withCredentials: true,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Accept": "application/json"
  },
});

// attach XSRF token from cookie to every request (decoded)
api.interceptors.request.use(config => {
  const token = getCookie("XSRF-TOKEN");
  if (token) {
    config.headers["X-XSRF-TOKEN"] = decodeURIComponent(token);
  }
  return config;
});

function getCookie(name) {
  const value = `; ${document.cookie || ""}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

api.interceptors.response.use(
  response => response,
  error => {
    if(error.response?.status === 401){
      const {logout} = useAuthStore.getState()
      logout(false)
    }
    return Promise.reject(error)
  }
  
)

export default api;
