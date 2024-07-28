import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import selectedReducer from './reducers/selected';

const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    selected: selectedReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
