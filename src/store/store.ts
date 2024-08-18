import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';
import countryReducer from './countrySlice';
import logger from './logger.ts';

export const store = configureStore({
  reducer: {
    countries: countryReducer,
    form: formReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
