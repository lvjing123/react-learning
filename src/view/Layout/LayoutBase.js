/**
 * Created by djz on 2023/3/23.
 */
import React from 'react'
import './LayoutBase.scss'
import { Outlet } from "react-router-dom"
import { Breadcrumb, Layout, Button } from 'antd'
import LeftMenu from '@/view/Layout/LeftMenu.js'
import { useDispatch } from 'react-redux'
import { clearLoginInfo } from '@/store/loginReducer'
import { useNavigate } from 'react-router-dom'

const {Header, Content, Footer, Sider} = Layout


export default function LayoutBase() {
     // 将消息出入到store 中
    const dispatch = useDispatch()
     // 路由跳转
    let navigate = useNavigate()
    const logout = () => {
        console.log('退出登录')
        // 退出登录,清空token
        localStorage.removeItem('access_token')
        // 将登录的信息存储到login store 中
        dispatch(
            clearLoginInfo()
          )
        // 成功后跳转到登录页
        navigate('/')
    }
    const goHome = () => {
        navigate('/home') 
    }
    // 路由跳转
    const breadCrumbItems = []
    return (
        <>
            <Layout className={'base-container'}>
                <Header className="header">
                    <div className={'header-div'}>
                        <div onClick={goHome}>首页</div>
                        <Button onClick={logout}>退出登录</Button>
                    </div>
                </Header>
                <Layout className='content'>
                    <Sider className={'left-sider-container'}>
                        <LeftMenu></LeftMenu>
                    </Sider>
                    <Content className={'content-container'}>
                        <Outlet/>
                    </Content>
                </Layout>
            </Layout>
        </>
    )
}
