/**
 * Created by djz on 2023/3/27.
 */
import { createSlice } from '@reduxjs/toolkit'

//用户的登录信息
const initialState = {
    'accessToken':'',
    'admin': false,
    'refreshToken':'',
    'tokenType': ''
}

const loginInfoSlice = createSlice({
    // 这个名称是必须的，方便在其他地方取仓库的值，与 store/index.js 文件中保持一致
    name: 'login',
    initialState,
    reducers: {
        // 储存用户信息
        setLoginInfo(state, action) {
            // 这里是修改state
            // 在 react 中， 我们相当于是先赋值一个state 然后返回一个新的state
            // 直接使用 state = action.payload 在其他组件中去拿的时候，会是初始值
            // 方法1：
            // const { accessToken, admin, refreshToken,tokenType} = action.payload
            // state.accessToken = accessToken
            // state.admin = admin
            // state.refreshToken = refreshToken
            // state.tokenType = tokenType
            // 方法2：
            return {
                ...state,
                ...action.payload
            }
        },
        // 清空用户信息，退出的登录
        clearLoginInfo(state, action) {
             return {
                    'accessToken':'',
                    'admin': false,
                    'refreshToken':'',
                    'tokenType': ''
                }
        },
    },
})

export const { setLoginInfo, clearLoginInfo } = loginInfoSlice.actions

export default loginInfoSlice.reducer