import { createSlice } from '@reduxjs/toolkit';
import countries from '@/data/countries.json';


export const countriesSlice = createSlice({
  name: 'countries',
  initialState: countries,
  reducers: {
    setCountries: (state, action) => action.payload,
  },
});
export const getCountries = state => state.countries;
export const { setCountries } = countriesSlice.actions;
export default countriesSlice.reducer;
