import { configureStore } from '@reduxjs/toolkit'
import { cardsApi } from './cards/cards'

export const store = configureStore({
  reducer: {[cardsApi.reducerPath]: cardsApi.reducer},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      cardsApi.middleware,
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch