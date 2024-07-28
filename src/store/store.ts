import { combineReducers, configureStore } from "@reduxjs/toolkit";
import selectedReducer from "./reducers/selected";

const rootReducer = combineReducers({
    selected: selectedReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore['dispatch'];
