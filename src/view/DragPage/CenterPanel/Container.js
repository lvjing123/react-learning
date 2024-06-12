import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { DragType, DropAcceptList} from "@/view/DragPage/DragItemViewType";
import { useDrop } from "react-dnd";
import {useSelector} from "react-redux";
// import DraggableViewProvider from "@/view/DragPage/CenterPanel/DraggableViewProvider";
import { DraggableViewProvider } from "./DraggableViewProvider";
import { random } from "@/view/DragPage/unti";
import { addView } from "@/store/dragReducer"
import store from '@/store/index'

const style = {
    width: "100%",
    height: "100%"
}

export default function Container() {
    const state = useSelector((state) => state.drag);
    const dispatch = useDispatch()
    let [, drop] = useDrop(() => ({
        accept: DropAcceptList,
        drop: (item, monitor) => {
            if (store.getState().drag.currentDrag.dragType === DragType.Add) {
                const didDrop = monitor.didDrop()
                if (didDrop) return
                let randomId = random()
                let map = new Map()//属性集合
                map.set("text", {
                    id: random(),
                    name: "内容",
                    value: "我是内容",
                    type: 'Input'
                })
                dispatch(addView(
                    {
                        id: randomId,
                        type: store.getState().drag.currentDrag.dragViewType,
                        text: randomId,
                    }))
                
            }
        }
    }))
   
    
    const renderItem = useCallback(
        (itemView, index) => {
            return DraggableViewProvider.of(itemView, index)
        }, [],)

    return (
        <div ref={drop} style={style}>{state.itemList.map((itemView, i) => (
            <div key={i}>
               {renderItem(itemView, i)}
            </div>
        ))}</div>
    )
}