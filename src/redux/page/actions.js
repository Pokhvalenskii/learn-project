import api from '../../utils/api';

export const IS_LOADING = 'IS_LOADING'
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

const isLoading = status => ({
  type: IS_LOADING,
  payload: status
})

export const fetchingPages = page => dispatch => {
  dispatch(isLoading(true));
  api.getPages(page)
    .then(res => {
      dispatch(isLoading(false))
      dispatch(initData(res))
    }).catch(() => (dispatch(isLoading(false))))
}
