import { combineReducers } from 'redux'
import { page } from './page/reducers'

export const rootReducer = combineReducers({
  page: page
})