import { Table as AntdTable } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { PAGE_NUMBER } from '../../redux/page/actions';
import { useEffect } from "react";
import { initialPages } from '../../redux/page/actions';

function Table () {  
  const dispatch = useDispatch();
  const item = useSelector((state) => state.page);
  const pageData = useSelector((state) => state.data);

  let newData = [];
    if (pageData.data) {
      newData = pageData.data.reduce((accumulator, post) => {
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

  useEffect(() => {
    dispatch(initialPages(item.page));
  }, [item.page]);


  return (
    <>
      <AntdTable dataSource={newData} columns={newColumns} pagination={{
        defaultCurrent: pageData.page,
        defaultPageSize: pageData.per_page,
        total: pageData.total,
        onChange: (page) => {
          dispatch({
            type: PAGE_NUMBER,
            payload: page
          })  
        }
      }}
      />
    </>
  )
}

export { Table };