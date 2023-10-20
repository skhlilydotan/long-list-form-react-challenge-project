import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import initialUsersData from '@/data/initialUsersData.json';

const LOADING_STATES = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCEEDED: 'SUCCEEDED',
  ERROR: 'ERROR',
};

export const loadState = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (!serializedState) {
      return null;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return null;
  }
};
const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      // Simulating an async operation
      return await new Promise((resolve) =>
        setTimeout(() => resolve(loadState('usersData') || initialUsersData), 500),
      );
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const saveUsers = createAsyncThunk(
  'users/saveUsers',
  async ({ users }, { rejectWithValue, getState }) => {
    try {
      localStorage.setItem('usersData', JSON.stringify(users));
      return users;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);


export const usersSlice = createSlice({
  name: 'users',
  initialState: { data: [], status: LOADING_STATES.IDLE, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = LOADING_STATES.LOADING;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = LOADING_STATES.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = LOADING_STATES.ERROR;
        state.error = action.payload;
      })
      .addCase(saveUsers.pending, (state) => {
        state.status = LOADING_STATES.LOADING;
      })
      .addCase(saveUsers.fulfilled, (state, action) => {
        state.status = LOADING_STATES.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(saveUsers.rejected, (state, action) => {
        state.status = LOADING_STATES.ERROR;
        state.error = action.payload;
      });
  },
});
const getUsers = state => state.users.data;
const getState = state => state.users.status;
export { getState, getUsers, fetchUsers, saveUsers, LOADING_STATES };
export default usersSlice.reducer;
