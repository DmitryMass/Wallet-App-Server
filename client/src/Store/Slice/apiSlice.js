import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const URL = 'http://localhost:3000/api';
// const URL = 'https://testing-rep.herokuapp.com/api';
const URL = '/api';

export const cardsApi = createApi({
  reducerPath: 'cardsApi',
  tagTypes: ['Cards'],
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  endpoints: (build) => ({
    getAllCards: build.query({
      query: () => ({
        url: '/cards',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Cards', id })),
              { type: 'Cards', id: 'LIST' },
            ]
          : [{ type: 'Cards', id: 'LIST' }],
    }),
    addNewCard: build.mutation({
      query: (body) => ({
        url: '/cards',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Cards', id: 'LIST' }],
    }),
    updateCard: build.mutation({
      query: ({ id, ...body }) => ({
        url: `/cards/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'Cards', id: 'LIST' }],
    }),
    deleteCard: build.mutation({
      query: (id) => ({
        url: `/cards/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Cards', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetAllCardsQuery,
  useAddNewCardMutation,
  useDeleteCardMutation,
  useUpdateCardMutation,
} = cardsApi;
