import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const usersAdapter = createEntityAdapter();

function generateUniqueId() {
  return uuidv4();
}


// export const createUser = createAsyncThunk(
//   'users/addUser',
// );


export const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers: (state, action) => action.payload,
    editUser: (state, action) => {
      const userToEdit = state.find(user => user.id === action.payload.id);
      if (userToEdit) {
        Object.assign(userToEdit, action.payload.changes);
      }
    },
    deleteUser: (state, action) => {
      return state.filter(user => user.id !== action.payload.id);
    },
    addUser: (state) => {
      return [{
        id: generateUniqueId(),
        name: '',
        country: '',
        email: '',
        phone: '',
      }, ...state];
    },
  },
});
export const getUsers = state => state.users;
export const { setUsers, editUser, deleteUser, addUser } = usersSlice.actions;
export default usersSlice.reducer;
