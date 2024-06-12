import React from 'react'
import '@/view/DragPage/DragPage.scss'
import { HTML5Backend } from "react-dnd-html5-backend"
import { DndProvider } from "react-dnd"
import LeftPanel from '@/view/DragPage/LeftPanel/LeftPanel'
import CenterPanel from '@/view/DragPage/CenterPanel/CenterPanel'
import RightPanel from '@/view/DragPage/RightPanel/RightPanel'

// react-dnd 作为实现可视化编辑器的基础库
// https://zhuanlan.zhihu.com/p/635844023
export default function DragPage() {
    return (
        <div className='drag-container'>
            <div className='left-group'>
                <LeftPanel />
            </div>
            <DndProvider backend={HTML5Backend}>
                <CenterPanel/>
            </DndProvider>
            <div className='right-group'>
                <RightPanel />
            </div>
        </div>
    )

}