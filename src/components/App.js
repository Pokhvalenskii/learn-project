import { useEffect, useState } from "react";
import api from "../utils/api";
import { useSelector, useDispatch } from 'react-redux';
import { PAGE_NUMBER } from '../redux/page/actions'


function App() {

  const item = useSelector((state) => state.page)
  const dispatch = useDispatch()
  // const [page, setPage] = useState(item.page);
  // const [posts, setPosts] = useState({});

  console.log('ITEM: ', item)

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
