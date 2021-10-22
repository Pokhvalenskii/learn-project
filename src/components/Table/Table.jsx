import { Table as AntdTable, Pagination} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { PAGE_NUMBER } from '../../redux/page/actions';


function Table (props) {
  const {
    page,
    per_page,
    total,
    // total_pages,
    // morePosts,
    data
  } = props.pages
  // const posts = useSelector((state) => state.posts.data)
  const dispatch = useDispatch();

  let newData = [];
  if (data) {
    // console.log('ACCET')
    newData = data.reduce((accumulator, post) => {
    post.key = `${post.id}`
    return [...accumulator, post]
    }, []);
  }

  const newColumns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'user email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'first_name',
      dataIndex: 'first_name',
      key: 'first_name'
    },
    {
      title: 'last_name',
      dataIndex: 'last_name',
      key: 'last_name'
    }
  ];

  return (<>
    <AntdTable dataSource={newData} columns={newColumns} pagination={{
      defaultCurrent: page,
      defaultPageSize: per_page,
      total: total,
      onChange: (page) => {
        // console.log('page', page)
        dispatch({
          type: PAGE_NUMBER,
          payload: page
        })  
      }
    }}/>
  </>)
}

export default Table;