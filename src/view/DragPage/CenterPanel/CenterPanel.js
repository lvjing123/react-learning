import React, {FC} from "react";
import "@/view/DragPage/CenterPanel/center.scss"
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import Container from "@/view/DragPage/CenterPanel/Container";

export default function CenterPanel() {
    return (
        <div className={"draw-panel"}>
            <DndProvider backend={HTML5Backend}>
                <Container />
            </DndProvider>
        </div>
    );
}