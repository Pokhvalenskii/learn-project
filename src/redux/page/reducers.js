import { PAGE_NUMBER } from './actions'

const dafaultState = {
  page: 1
}

export const page = (state = dafaultState, action) => {
  switch(action.type) {
    case PAGE_NUMBER:
      return { ...state, page: action.payload}
    default: return state;
  }
}