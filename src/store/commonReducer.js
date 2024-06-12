/**
 * Created by djz on 2023/3/27.
 */
import { createSlice } from '@reduxjs/toolkit'

//初始化信息，命名必须是 initialState
const commonState = {
    language: '',
    userInfo: {},
}

const commonInfoSlice = createSlice({
    // 这个名称是必须的，方便在其他地方取仓库的值，与 store/index.js 文件中保持一致
    name: 'common',
    initialState: commonState,
    reducers: {
        // 储存用户信息
        setLanguage(state, action) {
            return {
                ...state,
                ...action.payload
            }
        },
        setUserInfo(state, action) {
            console.log('cuncu', action)
            return {
                ...state,
                ...action.payload
            }
        },
    },
})

export const { setLanguage, setUserInfo } = commonInfoSlice.actions

export default commonInfoSlice.reducer