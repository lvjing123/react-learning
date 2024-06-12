// import { BrowserRouter, Routes, Route } from "react-router-dom";
// // 导入页面组件
// import Login from "./view/Login/Login";
// import LayoutBase from "./view/Layout/LayoutBase";
// import OrgManage from "./view/OrgManage/OrgManage";
// import ProManage from "./view/ProManage/ProManage";
//
//
// function App() {
//   return (
//       <>
//            <BrowserRouter>
//                <Routes>
//                    <Route path='/' element={ <Login /> }></Route>
//                    <Route path='/sys' element={<LayoutBase />}>
//                        <Route path='org' element={<OrgManage />} ></Route>
//                        <Route path='pro' element={<ProManage />} ></Route>
//                    </Route>
//                </Routes>
//             </BrowserRouter>
//       </>
//
//   );
// }
//
// export default App;

// 等同于以下的写法
import { useRoutes } from "react-router-dom";
// 类似于路由拦截功能
import routerEls from "./router/routerBefore.js";

function App() {
  const element = useRoutes(routerEls)
  return element
}
export default App
