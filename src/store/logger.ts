import { Middleware } from '@reduxjs/toolkit';
import { RootState } from './store';

export const logger: Middleware<object, RootState> = storeAPI => next => action => {
  const result = next(action);
  return result;
};

export default logger;
