import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '@slices/usersSlice';
import countriesReducer from '@slices/countriesSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    countries: countriesReducer,
  },
});
