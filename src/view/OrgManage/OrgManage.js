/**
 * Created by djz on 2023/3/27.
 */
import React from 'react'
import { Space, Table, Button, message, Input } from 'antd';
import { queryOrgList, deleteOrg } from "@/api/orgManage.js";
import { dataFormat } from "@/utils/util.js";
import OrgDialog from "@/view/OrgManage/orgDialog.js";
import '@/view/OrgManage/OrgManage.scss'


// 类组件 必须继承React.Component
class OrgManage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            orgList:[],
            dialog:{
               open:false,
               title:''
            },
            searchInput: ''
        }
    }

    searchInputChange = (event) => {
        this.setState({
            searchInput: event.target.value,
        })
        this.getOrgList({
            name: event.target.value
        })
    }
    // 获取表单数据
    getOrgList = async (params = {}) => {
        const paramsR = {
            ...params,
            size: 30,
            offset: 0
        }
        const res = await queryOrgList(paramsR)
        this.setState({
            orgList: res.data,
        })

    }
    // 新建组织
    createOrg = () => {
        this.setState({
             dialog:{
               open:true,
               title:'新建组织'
            }
        })

    }
    handleCloseDialog = () =>{
        this.setState({
            dialog:{
               open:false,
            }
        })
        this.getOrgList()
    }
     //编辑组织详情
    editOrg = () => {

    }
    // 删除组织
    deleteOrg = async(orgId) => {
        try {
            const res = await deleteOrg(orgId)
            // console.log(res,'res shanchu')
            if(res){
                message.success('删除成功')
                this.getOrgList()
            }
        } catch (e) {}
    }

    componentDidMount() {
        // 请求参数
        this.getOrgList()
    }

    render(){
        const columns = [
          {
            title: '组织名称',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
          },
          {
            title: '组织成员',
            dataIndex: 'age',
            key: 'members',
            render:(_, record) => <span>{ record.members.length }</span>
          },
          {
            title: '创建事件',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render:(_, record) => <span>{ dataFormat(record.createdAt) }</span>
          },
          {
            title: '操作',
            key: 'action',
            render: (_, record) => (
              <Space size="middle">
                <Button> 编辑 </Button>
                <Button onClick={ () => this.deleteOrg(record.id) }> 删除 </Button>
              </Space>
            ),
          },
        ]
        return(
            <>
               <div className={'org-container'}>
                   <div className={'base-flex-between'}>
                    <Input placeholder='请输入搜索内容' value={this.state.searchInput} onChange={this.searchInputChange}></Input>
                    <Button onClick={this.createOrg}>新建组织</Button>
                   </div>
                   <Table columns={columns} dataSource={this.state.orgList} rowKey={(record) => record.id} />
                    <OrgDialog
                        open={this.state.dialog.open}
                        title={this.state.dialog.title}
                        close={this.handleCloseDialog}
                    ></OrgDialog>
               </div>
            </>
        )
    }
}

export default OrgManage