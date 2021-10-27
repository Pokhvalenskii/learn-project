import api from '../../utils/api';

export const PAGE_NUMBER = 'PAGE_NUMBER';
export const INIT_DATA = 'INIT_DATA';

export const pageNumber = page => ({
  type: PAGE_NUMBER,
  payload: page
})

const initData = data => ({
  type: INIT_DATA,
  payload: data
})

export const initialPages = page => dispatch =>
  api.getPages(page).then(res => dispatch(initData(res)))