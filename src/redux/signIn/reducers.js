import { SIGNIN_SET_PASSWORD, SIGNIN_SET_EMAIL } from './actions';

const defaultState = {
  email: '',
  password: '',
}

export const signInReducer = (state = defaultState, action) => {
  switch(action.type) {
    case SIGNIN_SET_PASSWORD:
      return { ...state, password: action.payload }
    case SIGNIN_SET_EMAIL:
      return { ...state, email: action.payload }
    default: return state;
  }
}
