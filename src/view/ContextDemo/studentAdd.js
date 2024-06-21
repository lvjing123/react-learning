import React from 'react'
import PropTypes from 'prop-types';
import { Modal, Input, Form, InputNumber } from 'antd';

class StudentAdd extends  React.Component {
    constructor(props) {
        super(props);
        this.refForm = React.createRef();
        this.state = {
            confirmLoading:false,
        }
    }
    // onAddStudent = () => {
    //     const newStudent = {
    //         name: '新增的',
    //         age: 0,
    //         score: 0,
    //         gender: '男',
    //         id: 5,
    //     }
    // }

       //点击确认
       handleOk = async () => {
        try {
            const successValues = await this.refForm.current.validateFields();
            console.log('Success:', successValues);
            if(successValues) {
                // 通过  this.refForm.current.getFieldsValue() 获取 form 表单组件值
                const dataForm = this.refForm.current.getFieldsValue()
                console.log(dataForm,'==========')
                // 正常的交互逻辑是1: 请求接口，2: 关闭弹窗
                // 现在是模拟，1: 将弹窗的数据，给到父组件 2: 关闭弹窗
                // this.props.onAddStudent(newStudent) // 不用context 传值
                this.context.addStudent(dataForm)
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
      const { open, title } = this.props;
      console.log(this.props.title)
      return (
            <>
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
                        <Input placeholder="名称" />
                    </Form.Item>
                    <Form.Item
                        label="age"
                        name="age"
                    >
                        <InputNumber placeholder="年龄" />
                    </Form.Item>
                    <Form.Item
                        label="score"
                        name="score"
                    >
                        <InputNumber placeholder="分数" />
                    </Form.Item>
                    <Form.Item
                        label="gender"
                        name="gender"
                    >
                        <Input placeholder="性别" />
                    </Form.Item>
                </Form>
            </Modal>
            </>
        )
    }
}


// 声明要使用的context 对象属性
StudentAdd.contextTypes = {
    addStudent: PropTypes.func
}

export default StudentAdd