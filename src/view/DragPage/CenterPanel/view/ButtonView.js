import React from "react";
import { Button} from "antd"
import DraggableView from "@/view/DragPage/CenterPanel/DraggableView";


export const ButtonView = (props) => {
    let {itemView, index, } = props;
    return (<DraggableView itemView={itemView} index={index} >
            <Button>{itemView.text}</Button>
        </DraggableView>
    )
}