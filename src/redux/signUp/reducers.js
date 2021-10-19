import { 
  SIGNUP_SET_PASSWORD,
  SIGNUP_SET_CONFIRM_PASSWORD,
  SIGNUP_SET_EMAIL,
  SIGNUP_SET_USERNAME 
} from './actions';

const defaultState = {
  password: '',
  confirmPassword: '',
  email: '',
  name: ''
}

export const signUpReducer = (state = defaultState, action) => {
  switch(action.type) {
    case SIGNUP_SET_PASSWORD:
      return { ...state, password: action.payload }
    case SIGNUP_SET_CONFIRM_PASSWORD:
      return { ...state, confirmPassword: action.payload }
    case SIGNUP_SET_EMAIL:
      return { ...state, email: action.payload }
    case SIGNUP_SET_USERNAME:
      return { ...state, name: action.payload }
    default: return state;
  }
}
