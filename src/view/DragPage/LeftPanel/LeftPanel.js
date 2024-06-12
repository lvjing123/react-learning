import React from "react";
import "@/view/DragPage/LeftPanel/leftPanel.scss"
import { LeftPanelItem  } from "@/view/DragPage/LeftPanel/LeftPanelItem";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DragItemViewType } from "@/view/DragPage/DragItemViewType";

export default function LeftPanel() {
    return (
        <DndProvider backend={HTML5Backend}>
            <div className={"left-panel"}>
                <div className={"site-card-wrapper"}>
                    <LeftPanelItem type={DragItemViewType.Banner} text={"轮播图"}
                                   img={"https://gw.alipayobjects.com/zos/antfincdn/%24C9tmj978R/Carousel.svg"}/>
                    <LeftPanelItem type={DragItemViewType.List} text={"列表"}
                                   img={"https://gw.alipayobjects.com/zos/alicdn/5FrZKStG_/List.svg"}/>
                    <LeftPanelItem type={DragItemViewType.Button} text={"按钮"}
                                   img={"https://gw.alipayobjects.com/zos/alicdn/fNUKzY1sk/Button.svg"}/>
                    <LeftPanelItem type={DragItemViewType.Image} text={"图片"}
                                   img={"https://gw.alipayobjects.com/zos/antfincdn/D1dXz9PZqa/image.svg"}/>
                    <LeftPanelItem type={DragItemViewType.Input} text={"输入框"}
                                   img={"https://gw.alipayobjects.com/zos/alicdn/xS9YEJhfe/Input.svg"}/>
                    <LeftPanelItem type={DragItemViewType.Layout} text={"布局"}
                                   img={"https://gw.alipayobjects.com/zos/alicdn/xS9YEJhfe/Input.svg"}/>
                </div>
            </div>
        </DndProvider>
    );

}