import React, { useState } from "react";
import {
  getSmoothStepPath,
  getEdgeCenter,
  getMarkerEnd,
  useStore,
  useReactFlow,
  MarkerType,
} from "react-flow-renderer";
import { Button, Input, Modal } from 'antd';
import PopoverCard from "./PopoverCard";

const foreignObjectSize = 50;
const foreignObjectwidth = 200;

// 查找连线关联的节点
function getRelationNodeByEdge(id, edges) {
  if (!Array.isArray(edges)) {
    return null;
  }

  for (let i = 0; i < edges.length; i++) {
    const item = edges[i];
    if (item.id === id) {
      return {
        edge: id,
        source: item.source,
        target: item.target,
        label: item.label,
      };
    }
  }
}

export default function LinkEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {
    markerEnd: { type: 'arrow', color: '#f00' }
  },
  target
}) {
  // 传入 PopoverCard 的参数，包含 source、target
  const edges = useStore((store) => store.edges); 
  const currentEdge = edges.find((edge) => edge.id === id);
  const [model, setModel] = useState(null);
  const [modalOpen, setModalOpen] = useState(false)
  const [edgeLinkLabel, setEdgeLinkLabel] = React.useState(currentEdge?.label);
  const { setEdges } = useReactFlow(); // 使用useReactFlow钩子获取setEdges函数

  const handleClick = () => {
    setModalOpen(true)
    setModel(getRelationNodeByEdge(id, edges));
  };

  const handleClose = () => {
    setModel(getRelationNodeByEdge({}));
    setModalOpen(false)
  };

  
  /**
   * 点击确定按钮时触发的处理函数
   */
  const handleOkClick = () => {
    setEdges(
      edges.map((edge) => {
        if (edge.id === currentEdge?.id) {
          edge.label = edgeLinkLabel;
        }

        return edge;
      })
    );

    setModalOpen(false)
  };

  const markerEnd = getMarkerEnd(MarkerType.Arrow, target);
  const edgePath = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const [edgeCenterX, edgeCenterY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <foreignObject
        width={foreignObjectwidth}
        height={foreignObjectSize}
        x={edgeCenterX - foreignObjectSize}
        y={edgeCenterY - foreignObjectSize / 2}
        className="edgebutton-foreignobject"
      >
        <Button type="primary" onClick={handleClick}>{currentEdge?.label || '暂无Label'}</Button>
        <Modal title="编辑链接" open={modalOpen} onOk={handleOkClick} onCancel={handleClose}>
            <PopoverCard {...model} />
            <Input
                value={edgeLinkLabel}
                onChange={(e) => {
                  setEdgeLinkLabel(e.target.value);
                }}
                size="small"
                name="edgeLinkLabel"
            />
        </Modal>
      </foreignObject>
    </>
  );
}