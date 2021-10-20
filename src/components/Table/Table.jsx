import { Table as AntdTable, Pagination} from 'antd';
import { useSelector } from 'react-redux';

function Table (props) {
  const {
    // page,
    // per_page,
    // total,
    // total_pages,
    morePosts
  } = props
  const posts = useSelector((state) => state.posts)
  
  const columns = [
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
  
  let dataSource = posts.reduce((accumulator, post) => {
    post.key = `${post.id}`
    return [...accumulator, post]
  }, []);

  return (<>
    <AntdTable dataSource={dataSource} columns={columns} pagination={{
      defaultPageSize: 3,
      onChange: morePosts,
    }}/>
  </>)
}

export default Table;