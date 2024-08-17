import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { countries } from '../data/countries';

interface CountryState {
  list: string[];
}

const initialState: CountryState = {
  list: countries,
};

const countrySlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    setCountries: (state, action: PayloadAction<string[]>) => {
      state.list = action.payload;
    },
  },
});

export const { setCountries } = countrySlice.actions;
export default countrySlice.reducer;
