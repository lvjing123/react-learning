// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import 'antd/dist/reset.css'// 安装完 andt 的依赖，需要单独引入css
// import App from './App';
// import store from './store/index'
// import { Provider } from 'react-redux'
//
//
// // index.js 是入口文件
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//     <Provider store={store}>
//         <App />
//     </Provider>
// );

// 当app.js 中采用useRoute 引入路由文件时 需要用BrowserRouter 包一下
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// 引入全局变量
import './common/variable.scss'
import 'antd/dist/reset.css'// 安装完 andt 的依赖，需要单独引入css
import App from './App';
import store from './store/index'
import { Provider } from 'react-redux'


// index.js 是入口文件
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
