import axios, { AxiosError } from 'axios';

// Get environment variables with fallback for development
const CLOUDFLARE_ACCOUNT_ID = process.env.EXPO_PUBLIC_CLOUDFLARE_ACCOUNT_ID;
const CLOUDFLARE_API_TOKEN = process.env.EXPO_PUBLIC_CLOUDFLARE_API_TOKEN;

if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_API_TOKEN) {
  console.error('Missing Cloudflare API credentials. Please set EXPO_PUBLIC_CLOUDFLARE_ACCOUNT_ID and EXPO_PUBLIC_CLOUDFLARE_API_TOKEN in your .env.local file');
}

const apiInstance = axios.create({
  baseURL: `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}`,
  headers: {
    'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
  },
  timeout: 30000,
});

apiInstance.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('Network Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiInstance;