import { Table as AntdTable} from 'antd';
import { useSelector } from 'react-redux';

function Table () {

  const posts = useSelector((state) => state.posts)
  
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'user id',
      dataIndex: 'userId',
      key: 'userId'
    },
    {
      title: 'Text',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'body',
      dataIndex: 'body',
      key: 'body'
    }
  ];

  let dataSource = posts.reduce((accumulator, post) => {
    post.key = `${post.id}`
    return [...accumulator, post]
  }, []);

  return <AntdTable dataSource={dataSource} columns={columns} pagination={false} />
}

export default Table;