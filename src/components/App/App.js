import './App.css'
import { useEffect } from "react";
import api from "../../utils/api";
import { useSelector, useDispatch } from 'react-redux';
import { PAGE_NUMBER } from '../../redux/page/actions';
import { ADD_MORE_POSTS } from '../../redux/Posts/actions';
import AntdTable from '../Table/Table';

function App() {
  // debugger;

  const item = useSelector((state) => state.page)
  const posts = useSelector((state) => state.posts)
  const dispatch = useDispatch()

  useEffect(() => {
    initPosts(item.page)
  }, [item.page])

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

  const morePosts = () => {
    dispatch({
      type: PAGE_NUMBER,
      payload: item.page + 1
    })
  }

  return (
    <div className="App">
      <AntdTable />
      <button onClick={morePosts}>MORE</button>
      {/* {posts.map((post, index) => 
      <div key={index} className='container'>
        <div className='item'>{post.id} |</div>
        <div>{post.title}</div>        
      </div>
      )} */}
    </div>
  );
}

export default App;
