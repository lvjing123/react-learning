import React, { useEffect, useState, useMemo} from "react";
import { useNodes, useReactFlow } from 'react-flow-renderer';
import { useDispatch } from 'react-redux';
import { closeRuleChainModel } from '../../store/flowReducer';
import { Form, Input } from 'antd';

function RelationNodeForm(props) {
  const { modalConfig, events } = props
  const { setNodes } = useReactFlow(); // 使用useReactFlow钩子获取setNodes函数
  const flowNodes = useNodes(); // 使用useNodes钩子获取当前节点列表
  const dispatch = useDispatch(); // 获取dispatch函数
  const [form] = Form.useForm();

  useEffect(() => {
    if(!modalConfig.node)return 
    // 根据modalConfig中的node.id查找对应的初始值
    const currentValue = flowNodes.find(
        (node) => node.id === modalConfig.node.id
    );
    if(!currentValue) return {}
    const { name, remark } = currentValue.data
    form.setFieldsValue({
      name: name,
      remark: remark,
    });
  }, [modalConfig.node]);

  async function submit(values) {
    console.log(values)
    // 获取表单数据
    const { name, remark } = values
    // 更新节点数组
    setNodes(
      flowNodes.map((node) =>
        node.id === modalConfig.node.id ? { ...node, data: { ...node.data, name, remark } } : node
      )
    );
    dispatch(closeRuleChainModel());
  }

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <Form
      ref={events}
      form={form}
      {...layout}
      name="control-hooks"
      onFinish={submit}
      style={{ maxWidth: 600 }}
    >
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
        </Form.Item>
        <Form.Item name="remark" label="Remark" rules={[{ required: true }]}>
            <Input />
        </Form.Item>  
    </Form>
  );
}


export default RelationNodeForm;
