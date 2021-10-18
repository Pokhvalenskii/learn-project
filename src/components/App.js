import { useEffect, useState } from "react";
import api from "../utils/api";
import { useSelector, useDispatch } from 'react-redux';
import { PAGE_NUMBER } from '../redux/page/actions';
import { ADD_MORE_POSTS } from '../redux/Posts/actions'

function App() {

  const item = useSelector((state) => state.page)
  const posts = useSelector((state) => state.posts)
  const dispatch = useDispatch()

  useEffect(() => {
    initPosts(item.page);    
  }, [])

  useEffect(() => {
    initPosts(item.page)
  }, [item.page])

  function initPosts(page) {
    return api.getPost(page)
      .then(res => {
        console.log('GETPOST: ', res)
        res.forEach(element => {
          dispatch({
            type: ADD_MORE_POSTS,
            payload: element
          })
        });        
      })
  }

  const morePosts = () => {
    console.log('CLICK');
    dispatch({
      type: PAGE_NUMBER,
      payload: item.page + 1
    })
  }

  return (
    <div className="App">
      <button onClick={morePosts}>MORE</button>
    </div>
  );
}

export default App;
