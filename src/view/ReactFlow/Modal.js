import React, { useRef } from "react";
import RelationNodeForm from "./RelationNodeForm";
import { useSelector, useDispatch } from "react-redux";
import { closeRuleChainModel } from '../../store/flowReducer';
import { Modal } from 'antd';

export  function FlowModal() {
  const formRef = useRef();
  const dispatch = useDispatch();
  const flowStoreState = useSelector(state => state.flow)
  const { modalConfig } = flowStoreState;

  const handleOk = () => {
    // 组件内部需要暴露一个 submit 方法
    formRef.current.submit()
  };
  const handleCancel = () => {
    dispatch(closeRuleChainModel())
  }

  const Component = RelationNodeForm;

  return (
    <Modal
      title="编辑节点"
      open={modalConfig.visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {Component && <Component events={formRef} modalConfig={modalConfig} />}
    </Modal>
  );
}

export default FlowModal;