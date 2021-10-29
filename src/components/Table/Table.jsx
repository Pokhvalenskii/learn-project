import { Table as AntdTable } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { pageNumber } from '../../redux/page/actions';
import { useEffect } from "react";
import { fetchingPages } from '../../redux/page/actions';
import { Preloader } from '../Preloader/Preloader'

function Table () {
  
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

  useEffect(() => {
    dispatch(fetchingPages(item.page));
  }, [item.page]);

  return (
    <>
      <Preloader />
      <AntdTable dataSource={newData} columns={newColumns} pagination={{
          defaultCurrent: pageData.page,
          defaultPageSize: pageData.per_page,
          total: pageData.total,
          onChange: (page) => {
            dispatch(pageNumber(page))  
          }
        }}
        />      
    </>
  )
}

export { Table };