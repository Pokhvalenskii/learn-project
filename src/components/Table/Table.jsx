import { Table as AntdTable } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { PAGE_NUMBER } from '../../redux/page/actions';
import { useEffect, useState } from "react";
import api from "../../utils/api";

function Table () {  
  const dispatch = useDispatch();
  const [pages, setPages] = useState({})
  const {
    page,
    per_page,
    total,
    data
  } = pages
  const item = useSelector((state) => state.page);

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

export { Table };