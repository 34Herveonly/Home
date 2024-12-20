import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/', // Replace with your backend's base URL
  headers: {
    'Content-Type': 'application/json', // Default content type
  },
});

// Add request interceptors (optional, for handling things like tokens)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Retrieve the token if stored
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Attach token to request
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Handle request errors
  }
);

// Add response interceptors (optional, for handling responses or errors globally)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Error occurred:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
