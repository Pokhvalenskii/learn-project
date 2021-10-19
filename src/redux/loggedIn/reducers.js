import { LOGGED_IN } from './actions'

const dafaultState = {
  loggedIn: false
}

export const loggedIn = (state = dafaultState, action) => {
  switch (action.type) {
    case LOGGED_IN:
      return { ...state, loggedIn: action.payload}
    default: return state;
  }
}