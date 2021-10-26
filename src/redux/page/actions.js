import { useSelector, useDispatch } from 'react-redux';
import api from '../../utils/api';

export const PAGE_NUMBER = 'PAGE_NUMBER';
export const INIT_DATA = 'INIT_DATA';

const initData = data => ({
  type: INIT_DATA,
  payload: data
})

export const initialPages = (page) => {
  return dispatch => {
    return api.getPages(page)
      .then(res => {
        dispatch(initData(res))
      })
  }
}