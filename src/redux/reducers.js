import { combineReducers } from 'redux'
import { data, page } from './page/reducers'
import { loggedIn } from './loggedIn/reducers'
import { routerReducer } from 'react-router-redux'

export const rootReducer = combineReducers({
  page: page,
  loggedIn: loggedIn,
  routing: routerReducer,
  data: data
})