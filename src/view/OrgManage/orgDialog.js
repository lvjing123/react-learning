import { Modal, Transfer, Tag, Input, Form } from 'antd';
import React from 'react';
import '../../common/common.scss';
import { getOrgTransferDataRequest, createOrg } from "../../api/orgManage";
import { queryProfile } from "../../api/personal";

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
        const successValues = await this.refForm.current.validateFields();
        // console.log('Success:', successValues);
        if(successValues) {
            // 请求接口
            // 通过  this.refForm.current.getFieldsValue() 获取 form 表单组件值
            const dataForm = this.refForm.current.getFieldsValue()
            // console.log(dataForm,'==========')
            let members = []
            dataForm.members.forEach(item => {
                let obj = {
                    roleIds: [0, 1],
                    userId: item
                }
                members.push(obj)
            })
            const params = {
                name:dataForm.name,
                members:members
            }
            const data = await createOrg(params)
            if (data) {
                // 关闭弹窗, 调用父组件的close 方法
                this.props.close()
            }
        }

    }
    // 点击取消 可能需要调用父组件中的close 函数
    handleCancel = () => {
        this.props.close()
    }
    // 渲染transfer的label
    renderItem = (item) => {
        const customLabel = item.admin ? (
            <span className="custom-item">
                <span>{item.name}</span>
                <Tag className={'render-item-tag'} color="processing">管理员</Tag>
            </span>
        ) : (
            <span className="custom-item">
                <span>{item.name}</span>
            </span>
        );
        return {
            label: customLabel,
            value: item.email, // for title and filter matching
        };
    }

    onChange = (nextTargetKeys, direction, moveKeys) => {
        // 改变的是 targetKeys
        this.setState({
            targetKeys: nextTargetKeys
        })
    }
    onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        // 改变的是 selectedKeys
        this.setState({
            selectedKeys:[...sourceSelectedKeys,...targetSelectedKeys]
        })
    }

    //新增组织的弹窗，数据源
    getTransferData = async () => {
        // 获取总体数据，给transfer 左侧的
        const response = await getOrgTransferDataRequest()
        // 获取当前登录人的信息
        const responseInfo = await queryProfile()
        // transferDataSource 需要一个 key 值，同时要加role_ids 的选项
        let r = []
        if(response && Array.isArray(response.data)) {
            r = response.data.map((_, i) => ({
                key: _.userId,
                user_id: _.userId,
                name: _.name,
                email: _.email,
                admin: _.admin,
                role_ids:[]
            }))
        }
        // console.log(r,'r')
        await this.setState({
            transferDataSource: r,
            targetKeys:[responseInfo.userId],
        })
    }
    componentDidMount() {
        this.getTransferData()
    }
    render() {
        // 需要使用从父组件传来的值，要在render 中使用，可以不用在state 中处理了
        const { open, title } = this.props;
        // targetKeys:显示在右侧框数据的 key 集合
        // selectedKey:设置哪些项应该被选中
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
                        name="members"
                    >
                        <Transfer
                            className={'transfer-container'}
                            dataSource={this.state.transferDataSource}
                            targetKeys={this.state.targetKeys}
                            selectedKeys={this.state.selectedKeys}
                            onChange={this.onChange}
                            onSelectChange={this.onSelectChange}
                            render={(item) => this.renderItem(item)} // 代表渲染的label
                        />
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

export default OrgDialog;
