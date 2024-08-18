import { Middleware } from '@reduxjs/toolkit';
import { RootState } from './store';

export const logger: Middleware<object, RootState> = storeAPI => next => action => {
  console.log('dispatch - ', action);
  const result = next(action);
  console.log('next state - ', storeAPI.getState());
  return result;
};

export default logger;
