/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { getFromLocalStorage } from '@/utils/localstorage';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'http://localhost:5000/api/v1',
    baseUrl: 'https://custom-chat-app-server.vercel.app/api/v1',
    prepareHeaders: (headers) => {
      headers.set('authorization', getFromLocalStorage('access-token')!);
      return headers;
    },
  }),
  tagTypes: ['chat'],
  endpoints: () => ({}),
});

export default api;
