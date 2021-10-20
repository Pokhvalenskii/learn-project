import { useEffect, useState } from "react";
import { Switch, Route } from 'react-router-dom';
import api from "../../utils/api";
import AntdTable from '../Table/Table';
import { useSelector, useDispatch } from 'react-redux';
import { PAGE_NUMBER } from '../../redux/page/actions';
import { ADD_MORE_POSTS } from '../../redux/Posts/actions';
import { LOGGED_IN } from '../../redux/loggedIn/actions'
import { Button, Typography, Link } from '@mui/material';
import { Box } from '@mui/system';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import auth from "../../utils/auth";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";


function App() {
  // debugger;
  const item = useSelector((state) => state.page);
  const storage = useSelector((state) => state)
  const dispatch = useDispatch();

  useEffect(() => {
    initPosts(item.page)
  }, [item.page]);

  function initPosts(page) {
    return api.getPost(page)
      .then(res => {
        res.forEach(element => {
          dispatch({
            type: ADD_MORE_POSTS,
            payload: element
          })
        });        
      })
  }

  function morePosts() {
    dispatch({
      type: PAGE_NUMBER,
      payload: item.page + 1
    })
  }

  function handleSignUp(data) {
    return auth.signup(data)
  }
  
  function handleSignIn(data) {
    return auth.signin(data)
      .then((res) => {
        dispatch({
          type: LOGGED_IN,
          payload: true
        });
        localStorage.setItem('jwt', res.token);
      })
  }

  return (
    <Switch>      
      <Route path='/signup'>
        <SignUp handleSignUp={handleSignUp}/>
      </Route>
      <Route path='/signin'>
        <SignIn handleSignIn={handleSignIn}/>
      </Route>
      <ProtectedRoute path='/' loggedIn={storage.loggedIn.loggedIn}>
        <Box
          component='section'
          sx={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
        <AntdTable />
        <Button
            onClick={morePosts}
            type='submit'
            variant='contained'
            sx={{
              mt: 4,
              height: 56,            
            }}
          >
            More...
          </Button>
          {storage.loggedIn.loggedIn && 
          <Typography 
            component='p'
            variant='h5'
            align='center'
            sx={{
              mb: 2
            }}
          >
          АВТОРИЗОВАН
          </Typography>}
        </Box>
      </ProtectedRoute>
    </Switch>    
  );
}

export default App;
