import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const URL = 'https://lookup.binlist.net/';

export const checkerApi = createApi({
  reducerPath: 'checkerApi',
  tagTypes: ['Checker'],
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  endpoints: (build) => ({
    getCardScheme: build.query({
      query: (id) => ({
        url: `${id}`,
      }),
      providesTags: (id) => [{ type: 'Checker', id }],
    }),
  }),
});

export const { useLazyGetCardSchemeQuery } = checkerApi;
