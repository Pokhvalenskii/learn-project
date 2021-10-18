import { combineReducers } from 'redux'
import { page } from './page/reducers'
import { posts } from './Posts/reducers'

export const rootReducer = combineReducers({
  page: page,
  posts: posts
})