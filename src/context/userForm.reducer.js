import { validateField } from '../utils/users.utils';

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

      const fieldValidation = validateField({ field, value });

      if (isNewUserField) {
        return {
          ...state,
          newUser: {
            ...state.newUser,
            [field]: { value, error: fieldValidation ? fieldValidation.error : null },
          },
        };
      }

      return {
        ...state,
        modifiedUsers: {
          ...state.modifiedUsers,
          [userId]: {
            ...state.modifiedUsers[userId],
            [field]: { value, error: fieldValidation ? fieldValidation.error : null },
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
      const { userId, field, value } = action.payload;

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
    case 'REMOVE_MODIFIED_USER': {
      const { userId } = action.payload;

      return {
        ...state,
        modifiedUsers: {
          ...state.modifiedUsers,
          [userId]: undefined,
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
