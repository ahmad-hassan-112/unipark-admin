import axios from 'axios';

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

const axiosInstance = axios.create({
  baseURL,
});


axiosInstance.interceptors.request.use(config => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

// Add request interceptor to set content type
axiosInstance.interceptors.request.use(config => {
  // If the request data is FormData, let the browser set the content type
  if (!(config.data instanceof FormData)) {
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status;
    const url = error.config?.url;

    if (status === 401 && ![ '/auth/me', '/auth/login' ].includes(url)) if (typeof window !== 'undefined') window.location.href = '/';

    return Promise.reject(error);
  },
);

export default axiosInstance;
