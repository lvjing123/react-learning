/**
 * Created by djz on 2023/3/27.
 */
import { createSlice } from '@reduxjs/toolkit'
import { DragItemViewType, DragType } from '@/view/DragPage/DragItemViewType';

//初始化信息，命名必须是 initialState
const commonState = {
    currentDrag: {
        dragType: DragType.Add,
        dragViewType: DragItemViewType.Text,
    },
    currentSelect: {
        id: "string",
        type: DragItemViewType.Button,
        text: "string",
    },
    itemList: [{
        id: "string",
        type: DragItemViewType.Button,
        text: "string",
    }]
}

const dragInfoSlice = createSlice({
    // 这个名称是必须的，方便在其他地方取仓库的值，与 store/index.js 文件中保持一致
    name: 'drag',
    initialState: commonState,
    reducers: {
        addView(state, action) {
            //新增控件
            state.itemList.push(action.payload)
        },
        dragItemView(state, action) {
            //被拖拽控件的拖拽目的(新增、排序)、拖拽控件类型
            return {
                ...state,
                ...{currentDrag: action.payload}
            }
        },
        insertIntoIndex(state, action) {
            state.itemList.splice(action.payload.index, 0, action.payload.itemView)
        },
        moveToIndex(state, action) {
             //删除当前拖拽控件
             state.itemList.splice(action.payload.dragIndex, 1)
             //插入至悬停位置
             state.itemList.splice(action.payload.hoverIndex, 0, action.payload.itemView)
        },
        selectItemView(state, action) {
            state.currentSelect = action.payload
        },
        setItemViewText: (state, action) => {
            //改变文字
            state.currentSelect.text = action.payload.text;
            for (let i = 0; i < state.itemList.length; i++) {
                if (state.itemList[i].id === action.payload.id) {
                    state.itemList[i].text = action.payload.text
                    break;
                }
            }
        },
    },
})

export const { addView, dragItemView, selectItemView, insertIntoIndex, moveToIndex, setItemViewText } = dragInfoSlice.actions

export default dragInfoSlice.reducer