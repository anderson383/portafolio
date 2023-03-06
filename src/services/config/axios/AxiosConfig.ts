import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const axiosIntance = axios.create({
  // baseURL: publicRuntimeConfig.API_BASE_HOST,
  headers: {
    Accept: 'application/json',
    'Accept-Language': 'es-CO',
    'Content-Language': 'es',
    'Content-Type': 'application/json'
  },
  timeout: 30000
});

axiosIntance.interceptors.request.use(config => {
  config.headers = config.headers;

  return config;
});

export default axiosIntance;
