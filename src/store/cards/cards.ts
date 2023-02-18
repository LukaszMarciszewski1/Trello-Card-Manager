import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Card } from '../../models/card'

type CardResponse = Card[]

export const cardsApi = createApi({
  reducerPath: 'cardsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/'}),
  tagTypes: ['Card'],
  endpoints: (builder) => ({
    getAllCards: builder.query<Card[], void>({
      query: () => `cards`,
      providesTags: ['Card'],
    }),
    getCard: builder.query<Card, string>({
      query: (id) => {
        return {
          url: `cards/${id}`,
        }
      },
      providesTags: ['Card'],
    }),
    createCard: builder.mutation<Card, Partial<Card>>({
      query: (body: {}) => ({
        url: 'cards',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Card'],
    }),
    updateCard: builder.mutation<Card, Partial<Card>>({
      query: ({ _id, ...patch }) => ({
        url: `cards/${_id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: ['Card'],
    }),
    deleteCard: builder.mutation<{ success: boolean; id: string | number }, string>({
      query: (id) => ({
        url: `cards/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Card'],
    }),
  }),
})

export const {
  useGetAllCardsQuery,
  useGetCardQuery,
  useCreateCardMutation,
  useUpdateCardMutation,
  useDeleteCardMutation,
} = cardsApi