import { toFormUser } from '../utils';

export const INITIAL_STATE = {
  newUser: null,
  modifiedUsers: {},
};
const EMPTY_USER = {
  name: {
    value: '',
    error: null,
  },
  country: {
    value: '',
    error: null,
  },
  email: {
    value: '',
    error: null,
  },
  phone: {
    value: '',
    error: null,
  },
};

export function userFormReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD': {
      const { userId, field, value } = action.payload;
      const isNewUserField = state.newUser && state.newUser.id === userId;

      if (isNewUserField) {
        return {
          ...state,
          newUser: {
            ...state.newUser,
            [field]: { value },
          },
        };
      }

      return {
        ...state,
        modifiedUsers: {
          ...state.modifiedUsers,
          [userId]: {
            ...state.modifiedUsers[userId],
            [field]: { value },
          },
        },
      };
    }
    case 'SET_EMPTY_USER': {
      const newUserId = crypto.randomUUID();

      return {
        ...state,
        newUser: {
          id: { value: newUserId },
          ...EMPTY_USER,
        },
      };
    }
    case 'REMOVE_EMPTY_USER': {
      return {
        ...state,
        newUser: null,
      };
    }
    case 'SET_MODIFIED_USER': {
      const { user } = action.payload;
      const formUser = toFormUser(user);

      return {
        ...state,
        modifiedUsers: {
          ...state.modifiedUsers,
          [user.id]: {
            ...formUser,
          },
        },
      };
    }
    case 'RESET_FORM': {
      return INITIAL_STATE;
    }
    default:
      return state;
  }
}
