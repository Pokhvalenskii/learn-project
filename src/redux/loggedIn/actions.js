export const LOGGED_IN = 'LOGGED_IN';

export const loggedIn = (status) => ({
  type: LOGGED_IN,
  payload: status
})