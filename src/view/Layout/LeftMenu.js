/**
 * Created by djz on 2023/3/27.
 */
import React from 'react'
import { useNavigate } from "react-router-dom"
import { LaptopOutlined, NotificationOutlined } from '@ant-design/icons'
import { Menu } from "antd"

const  getItem = (label, key, icon, children, theme) => {
  return {
    key,
    icon,
    children,
    label,
    theme,
  }
}

export default function LayoutBase() {
    // 路由跳转
    let navigate = useNavigate()
    // 获取路由
    let url = window.location.pathname

    let urlList = url.split('/')
    // 菜单默认选中
    let defaultSelectedKeys = [urlList[urlList.length - 1]]
    //  左侧菜单
    const items = [
        getItem('组织管理','org',<LaptopOutlined />),
        getItem('项目管理','pro',<NotificationOutlined />),
        getItem('拖拽','drag',<NotificationOutlined />),
        getItem('通信demo','demo',<NotificationOutlined />),
        getItem('context & reducer','context-demo',<NotificationOutlined />),
    ]
    const onClick = (item) => {
        navigate(`/sys/${item.key}`)
    }

    return (
        <>
           <Menu
                onClick={onClick}
                mode="inline"
                defaultSelectedKeys={defaultSelectedKeys}
                style={{ height: '100%', borderRight: 0 }}
                items={items}
            />
        </>

    )
}
