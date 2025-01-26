'use client';
import axios from 'axios';
import https from 'https';
import ClientCookies from 'js-cookie';

import { redirectAction } from '@/shared/server-actions';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

api.interceptors.request.use(
  async (config) => {
    const lang = window.location.pathname.split('/')[1];

    config.headers['Accept-Language'] = lang;
    if (!config.headers.Authorization) {
      const token = ClientCookies.get('access-token');

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

let failedQueue = [];
let isRefreshing = false;

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest.retry &&
      originalRequest.url !== 'auth/refresh-token'
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = token;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }
      originalRequest.retry = true;
      isRefreshing = true;
      try {
        const response = await api.get('auth/refresh-token');

        const accessToken = response.data.data.access_token;

        ClientCookies.set('access-token', accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        processQueue(null, `Bearer ${accessToken}`);

        return await api(originalRequest);
      } catch (err) {
        processQueue(err, null);

        const lang = window.location.pathname.split('/')[1];
        ClientCookies.remove('access-token');
        redirectAction(`/${lang}/login`);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
