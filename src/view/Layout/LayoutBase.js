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
import { createContext, useContext, useState } from 'react';

const {Header, Content, Footer, Sider} = Layout
// 定义颜色
const ThemeContext = createContext(null);

export default function LayoutBase() {
    const [theme, setTheme] = useState('light')
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
        <ThemeContext.Provider value={theme}>
            <Layout className={'base-container'}>
                <Header className="header">
                    <div className={'header-div'}>
                        <div onClick={goHome}>首页</div>
                        <Button onClick={logout}>退出登录</Button>
                        <label>
                            <input
                            type="checkbox"
                            checked={theme === 'dark'}
                            onChange={(e) => {
                                setTheme(e.target.checked ? 'dark' : 'light')
                            }}
                            />
                            修改主题
                        </label>
                    </div>
                </Header>
                <Layout className={`content ${theme}`}>
                    <Sider className={'left-sider-container'}>
                        <LeftMenu></LeftMenu>
                    </Sider>
                    <Content className={'content-container'}>
                        <Outlet/>
                    </Content>
                </Layout>
            </Layout>
        </ThemeContext.Provider>
    )
}

// 存在两个独立的 context。ThemeContext 提供了当前的主题，它是一个字符串，而 CurrentUserContext 保存了代表当前用户的对象。
// 这两个 context 之间没有任何关系。
/*
 return (
    <ThemeContext.Provider value={theme}>
      <CurrentUserContext.Provider
        value={{
          currentUser,
          setCurrentUser
        }}
      >
        <WelcomePanel />
        <label>
          <input
            type="checkbox"
            checked={theme === 'dark'}
            onChange={(e) => {
              setTheme(e.target.checked ? 'dark' : 'light')
            }}
          />
          Use dark mode
        </label>
      </CurrentUserContext.Provider>
    </ThemeContext.Provider>
  )
*/ 
