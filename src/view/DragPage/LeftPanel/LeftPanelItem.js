import React from "react";
import "@/view/DragPage/LeftPanel/leftPanel.scss"
import { useDrag} from "react-dnd";
import { Card, Image} from "antd";
import { DragType } from "@/view/DragPage/DragItemViewType";
import { useDispatch } from 'react-redux'
import { dragItemView } from '@/store/dragReducer'

const gridStyle = {
    width: '100%',
    textAlign: 'center',
};


export const LeftPanelItem = (props) => {
    const {text, type, img} = props
    // 需要把值存储到dragStore 
    const dispatch = useDispatch()
    let handleDrag = () => {
        dispatch(dragItemView({dragViewType: type, dragType: DragType.Add}))
    }
    let [{isDragging}, dragRef] = useDrag(() => ({
        type: type,
        collect: (monitor) => ({
            isDragging: monitor.isDragging() ? 0.5 : 1
        }),
    }));
    return (
        <div ref={dragRef} onDrag={handleDrag} className={"left-panel-item-parent"}>
            <Card.Grid title={text} style={gridStyle}>
                <div style={{marginBottom: 10}}>{text}</div>
                <Image className={"card-item-img"} src={img} preview={false}/>
            </Card.Grid>
        </div>
    )
}