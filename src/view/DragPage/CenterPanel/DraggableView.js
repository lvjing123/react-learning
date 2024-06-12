import { useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { DragItemViewType, DragType, DropAcceptList } from '@/view/DragPage/DragItemViewType';
import {useSelector} from "react-redux";
import { random } from "@/view/DragPage/unti";
import { useDispatch } from 'react-redux'
import { dragItemView, selectItemView, insertIntoIndex, moveToIndex } from '@/store/dragReducer.js'
import store from '@/store/index'

export default function DraggableView({itemView, index, children}){
    const ref = useRef(null)
    const state = useSelector((state) => state.drag);
    const dispatch = useDispatch()
    const style = {//显示虚线框
        border: state.currentSelect.id === itemView.id ? '1px dashed gray' : '0px dashed gray',
        padding: '0.5rem 0.5rem 0.5rem 0.5rem',
        marginBottom: '.5rem',
        backgroundColor: 'white',
        cursor: 'move',
    }
    const [mDragIndex, setMDragIndex] = useState(-1)
    const [{
        handlerId,
        isOver,
        isOverCurrent//当前悬停
    }, drop] = useDrop({
        accept: DropAcceptList,
        drop: (item, monitor) => {
            //如果是新增
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
                dispatch(insertIntoIndex(
                    {
                        index: index,
                        itemView: {
                            id: randomId,
                            type: store.getState().drag.currentDrag.dragViewType,
                            text: randomId,
                        }
                    }))
                //如果是调整
            } else if (store.getState().drag.currentDrag.dragType === DragType.Adjust) {
                if (mDragIndex !== -1) {
                    dispatch(moveToIndex({
                        dragIndex: mDragIndex,
                        hoverIndex: index,
                        itemView: store.getState().drag.itemList[mDragIndex]
                    }))
                }
            }
        },
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
                isOver: monitor.isOver(),
                isOverCurrent: monitor.isOver({shallow: true})//当前悬停在此item上
            }
        },
        hover(item, monitor) {//拖拽悬停
            if (!ref.current) return
            setMDragIndex(item.index)//设置当前插入位置
        },
    })

    const [{isDragging}, drag] = useDrag({
        type: DragItemViewType.Card,
        item: () => {
            return {itemView, index}
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    let handleDrag = () => {
        dispatch(dragItemView({dragType: DragType.Adjust, dragViewType: itemView.type}))
    }

    let handleClick = () => {
        dispatch(selectItemView(itemView))
    }
    const opacity = isDragging ? 0 : 1
    drag(drop(ref))
    let color
    if (isOverCurrent) {//悬停变色
        color = '#009a00'
        console.log("index:" + index)
        console.log("mDragIndex:" + mDragIndex)
    } else {
        color = '#ffffff'
    }
    let top
    if (mDragIndex < index) {//上边显示指示器 or 下边显示指示器
        top = true
    } else {
        top = false
    }
    return (
        <div>
            {/*指示器*/}
            <div style={{width: "100%", height: 2, backgroundColor: !top ? color : '#ffffff'}}/>
            <div ref={ref} onDrag={handleDrag} onClick={handleClick}
                 style={{...style, opacity}}
                 data-handler-id={handlerId}>
                {children}
            </div>
            {/*指示器*/}
            <div style={{width: "100%", height: 2, backgroundColor: top ? color : '#ffffff'}}/>
        </div>
    )
}