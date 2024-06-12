/**
 * Created by djz on 2023/3/28.
 */
// 导入页面组件
import Home from "@/view/Home/index";
import Login from "@/view/Login/Login";
import LayoutBase from "@/view/Layout/LayoutBase";
import OrgManage from "@/view/OrgManage/OrgManage";
import ProManage from "@/view/ProManage/ProManage";
import DragPage from "@/view/DragPage/DragPage"


const routerEls = [
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/home",
      element: <Home />
    },
    {
      path: "/sys",
      element: <LayoutBase />,
      children: [
        { path: 'org', element: <OrgManage /> },
        { path: "pro", element: <ProManage /> },
        { path: "drag", element: <DragPage /> }
      ]
    }
    ]
export default routerEls
