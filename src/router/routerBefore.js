/**
 * Created by djz on 2023/3/28.
 */
//  主要是实现路由拦截
import { useNavigate, Navigate } from 'react-router-dom'
import React, { useEffect } from 'react'
import routerEls from "./index";

// 拦截
const RouterBeforeEach = (props) => {
    const accessToken = localStorage.getItem('access_token')
    const navigate = useNavigate()
    // 这里作路由拦截的时候，需要采用useEffect 不然会报错
    useEffect(() => {
        if (!accessToken) {
         navigate('/')
        }
      }, []);
    return (
        <>
            {props.children}
        </>
    )
}

// 渲染路由
const renderRoutes = (routes) => {
    return routes.map((item) => {
        const route = {meta: item.meta, path: item.path}
        if (item.element) {
            route.element = <RouterBeforeEach route={item}>{item.element}</RouterBeforeEach>
        }
        if (item.children) {
            route.children = renderRoutes(item.children)
        }
        if (item.redirect) {
          route.element = <Navigate to={item.redirect} />
        }
        return route
    })
}

const routesAfter = renderRoutes(routerEls)
export default routesAfter