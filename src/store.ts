import { configureStore } from '@reduxjs/toolkit';
import priceListReducer from
  './features/priceList/priceListSlice';

export const store = configureStore({
  reducer: {
    priceListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
