import React from "react";
import { Input } from "antd"
import DraggableView from "@/view/DragPage/CenterPanel/DraggableView";

export const InputView = (props) => {
    let {itemView, index, } = props;
    return (<DraggableView itemView={itemView} index={index} >
            <Input value={itemView.text}/>
        </DraggableView>
    )
}