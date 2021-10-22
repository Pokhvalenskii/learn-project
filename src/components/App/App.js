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

  const [pages, setPages] = useState({})
  const item = useSelector((state) => state.page);
  const storage = useSelector((state) => state)
  const dispatch = useDispatch();

  useEffect(() => {
    initPages(item.page)
  }, [item.page]);

  function initPages(page) {
    return api.getPages(page)
      .then(res => {
        // console.log('INIT PAGES', res)
        setPages({
          page: res.page,
          per_page: res.per_page,
          total: res.total,
          total_pages: res.total_pages,
          data: res.data
        })     
      })
  }  

  function handleSignUp(data) {
    return api.signup(data)
  }
  
  function handleSignIn(data) {
    return api.signin(data)
      .then((res) => {
        // console.log('resapp', res)
        if(res.status === 200){
          dispatch({
            type: LOGGED_IN,
            payload: true
          });
          localStorage.setItem('jwt', res.token);
        }
        return res.status;
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
        <AntdTable pages={pages}/>
          {storage.loggedIn.loggedIn && 
          <Typography 
            component='p'
            variant='h5'
            align='center'
            sx={{
              mb: 2
            }}
          >
          </Typography>}
        </Box>
      </ProtectedRoute> 
    </Switch>    
  );
}

export default App;
