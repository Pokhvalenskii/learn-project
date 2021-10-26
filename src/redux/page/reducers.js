import { PAGE_NUMBER, INIT_DATA } from './actions'

const dafaultState = {
  page: 1
}

const defaultData = {}

export const page = (state = dafaultState, action) => {
  switch(action.type) {
    case PAGE_NUMBER:
      console.log('PAGE_NUMBER', action.payload)
      return { ...state, page: action.payload}
    default: 
      return state;
  }
}

export const data = (state = defaultData, action) => {
  switch(action.type) {
    case INIT_DATA:
      console.log('INIT_DATA', action.payload)
      return { 
        ...state,
        data: action.payload.data,
        page: action.payload.page,
        per_page: action.payload.per_page,
        total: action.payload.total,
        total_pages: action.payload.total_pages        
      }
    default: 
      return state;
  }
}