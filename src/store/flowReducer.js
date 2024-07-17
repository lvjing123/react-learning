/**
 * Created by djz on 2023/3/27.
 */
import { createSlice } from '@reduxjs/toolkit'

//用户的登录信息
const initialState = {
    nodes: [],
    // 弹窗信息
    modalConfig: {
        visible: false,
        node: null
    }
}

const flowStoreSlice = createSlice({
    // 这个名称是必须的，方便在其他地方取仓库的值，与 store/index.js 文件中保持一致
    name: 'flow',
    initialState,
    reducers: {
         openRuleChainModel(state, action) {
            return {
                ...state,
                modalConfig: {
                    visible: true,
                    node: action.payload.data
                  }
            }
        },
        closeRuleChainModel(state, action) {
            return {
                ...state,
                modalConfig: {
                    visible: false,
                    node: null
                  }
            }
        },
        setRuleChainNode(state, action) {
            return {
                ...state,
                nodes: action.payload.data
            }
        },
    },
})

export const { openRuleChainModel, closeRuleChainModel, setRuleChainNode } = flowStoreSlice.actions

export default flowStoreSlice.reducer