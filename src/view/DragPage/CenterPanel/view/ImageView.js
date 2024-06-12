import React from "react";
import { Image} from "antd"
import DraggableView from "@/view/DragPage/CenterPanel/DraggableView";

export const ImageView = (props) => {
    let {itemView, imgUrl,index, } = props;
    return (<DraggableView itemView={itemView} index={index} >
            <Image src={imgUrl} preview={false}/>
        </DraggableView>
    )
}