import {API_URL_ANDROID, API_URL_IOS, API_URL as PROD_URL, STAGE} from '@env';
// import {API_URL} from '@env';
import axios from 'axios';
import {Platform} from 'react-native';
import {StorageAdapter} from '../adapters/async-storage';

export const API_URL =
  STAGE === 'prod'
    ? PROD_URL
    : Platform.OS === 'ios'
    ? API_URL_IOS
    : API_URL_ANDROID;

const tesloApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// TODO: Interceptors
tesloApi.interceptors.request.use(
  // Este config es la configuraacion previa que ya tenemos arriba con la baseurl y el headers
  async config => {
    // Aca verificamos si hay token que lo guarder como bearer sino que vaya directamente como esta la config arriba
    const token = await StorageAdapter.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
);

// Lo exportamos aca porque asi nos aseguramos de que fue exportado luego de haber sido configurado nuestros interceptores
export {tesloApi};
