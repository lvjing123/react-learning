import { Modal, Input, Form, InputNumber } from 'antd';
import React from 'react';
import '../../common/common.scss';

class OrgDialog extends React.Component {
    constructor(props) {
        super(props);
        this.refForm = React.createRef();
        this.state = {
            confirmLoading:false,
            transferDataSource:[],
            targetKeys:[],
            selectedKeys:[],
        }
    }

    //点击确认
    handleOk = async () => {
        // await this.setState({
        //     confirmLoading: true
        // })
        // 1：form 是 model 子组件
        // 2：在constructor 中定义 this.refForm = React.createRef();
        // 3：在form 元素上 通过ref 关联 this.refForm
        // 4：通过 this.refForm.current 取得表单 并验证
        // console.log(this.refForm.current,'this.refForm.current')
        // 发起校验
        try {
            const successValues = await this.refForm.current.validateFields();
            console.log('Success:', successValues);
            if(successValues) {
                // 通过  this.refForm.current.getFieldsValue() 获取 form 表单组件值
                const dataForm = this.refForm.current.getFieldsValue()
                console.log(dataForm,'==========')
                // 正常的交互逻辑是1: 请求接口，2: 关闭弹窗
                // 现在是模拟，1: 将弹窗的数据，给到父组件 2: 关闭弹窗
                this.props.save(dataForm)
                this.props.close()
            }
        } catch (error) {
            //
        }
    }
    // 点击取消 可能需要调用父组件中的close 函数
    handleCancel = () => {
        this.props.close()
    }

    render() {
        // 需要使用从父组件传来的值，要在render 中使用，可以不用在state 中处理了
        const { open, title } = this.props;
        return (
            <Modal
                title={title}
                open={open}
                onOk={this.handleOk}
                confirmLoading={this.state.confirmLoading}
                onCancel={this.handleCancel}
                width={600}
            >
                <Form
                    ref={this.refForm}
                >
                    <Form.Item
                        label="name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your OrgName!',
                            },
                        ]}
                    >
                        <Input placeholder="组织名称" />
                    </Form.Item>
                    <Form.Item
                        label="members"
                        name="members"
                    >
                        <InputNumber placeholder="组织成员" />
                    </Form.Item>
                    <Form.Item
                        label="time"
                        name="createdAt"
                    >
                        <Input placeholder="时间" />
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

export default OrgDialog;
