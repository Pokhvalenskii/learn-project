import { combineReducers } from 'redux'
import { page } from './page/reducers'
import { posts } from './Posts/reducers'
import { loggedIn } from './loggedIn/reducers'

export const rootReducer = combineReducers({
  page: page,
  posts: posts,
  loggedIn: loggedIn
})