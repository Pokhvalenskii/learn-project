import { ADD_MORE_POSTS } from "./actions";

const defaultState = {
  data: {}
};

export const posts = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_MORE_POSTS:
      // return [...state, action.payload];
      return {...state, data: action.payload}
    default: return state;
  }
}