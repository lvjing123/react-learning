import React, { useState } from "react";
import { Handle, useNodes, useReactFlow } from "react-flow-renderer";
import { Menu, Button} from 'antd';
import { useDispatch } from "react-redux";
import { openRuleChainModel, setRuleChainNode } from '../../store/flowReducer';

const NodeType = {
    input: "input",
    filter: "filter",
    action: 'action'
};
// 编辑菜单
const EditMenu = (props) => {
  const { ...node } = props;
  const { setNodes } = useReactFlow();
  const dispatch = useDispatch();
  const nodes = useNodes();
  const edit = () => {
    dispatch(openRuleChainModel({
        data: node
      }))
  };
  const remove = () => {
    setNodes(nodes.filter((item) => item.id !== node.id));   
    dispatch(
        setRuleChainNode({
            data: nodes.filter((item) => item.id !== node.id)
          })
    )
  };
  const onClick = (e) => {
    switch (e.key) {
        case '1':
          edit();
          break;
        case '2':
          remove();
          break;
        default:
          break;
    }
  };
  const items = [
    {
        label: '编辑',
        key: '1',
    },
    {
        label: '删除',
        key: '2',
    },
  ]
  return (
    <Menu onClick={onClick} items={items} >
    </Menu>
  );
};


const RelationNode = (props) => {
  const { ...currentNode } = props;

  // // Menu用的方法
  // const [anchorEl, setAnchorEl] = useState(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event) => {
  //   console.log(event, 'eeee')
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const classMap = new Map([
    ["action", "relation-node"],
    ["input", "relation-node input-node"],
    ["filter", "relation-node filter-node"],
  ]);

  return (
    <div className={classMap.get(currentNode.type)}>
      <div className="relation-node-title">
        {currentNode.type !== NodeType.input && currentNode.data.label}
        {currentNode.type !== NodeType.input && <br />}
        {currentNode.data.name}
      </div>
      <div className="relation-node-action">
        {/* {currentNode.type !== NodeType.input && (
          <Button size="small" onClick={handleClick}>
            icon
          </Button>
        )}
        <EditMenu
          open={open}
          handleClose={handleClose}
          {...props}
        /> */}
        {currentNode.type !== NodeType.input && (
         <EditMenu {...props} />
        )}
        
      </div>
      {/* 提供一个入口和一个出口 */}
      {currentNode.type !== NodeType.input && (
        <Handle type="target" position="left" isConnectable={currentNode.isConnectable} />
      )}
      <Handle type="source" position="right" isConnectable={currentNode.isConnectable} />
    </div>
  );
};

export default React.memo(RelationNode);