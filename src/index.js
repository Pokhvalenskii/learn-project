import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css'
import App from './components/App/App';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider, browserHistory } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Router } from 'react-router'
import { rootReducer } from './redux/reducers';
import { syncHistoryWithStore } from 'react-router-redux'
// import createLogger from 'redux-logger';

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>    
  </React.StrictMode>,
  document.getElementById('root')
);

//react redux, react router