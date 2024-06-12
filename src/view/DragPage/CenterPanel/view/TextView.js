import React from "react";
import DraggableView from "@/view/DragPage/CenterPanel/DraggableView";

export const TextView = (props) => {
    let {itemView,text, index} = props;
    return (
        <DraggableView itemView={itemView} index={index} >
            <div className={"editable"}>{text}</div>
        </DraggableView>
    )
}