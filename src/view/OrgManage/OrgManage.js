/**
 * Created by djz on 2023/3/27.
 */
import React from 'react'
import { Space, Table, Button, message, Input } from 'antd';
import { queryOrgList, deleteOrg } from "@/api/orgManage.js";
import { dataFormat } from "@/utils/util.js";
import OrgDialog from "@/view/OrgManage/orgDialog.js";
import '@/view/OrgManage/OrgManage.scss'
// css 样式表，可能会遇到class 名称冲突，可以使用 css Modules
// https://github.com/css-modules/css-modules


// 类组件 必须继承React.Component
class OrgManage extends React.Component{
    constructor(props) {
        super(props);
        // state 里面是用来存储状态的，如果说，这个state 里面的值，不需要通过setState 来修改，那么这个值，可以放在constructor 里面
        this.state = {
            orgList:[],
            dialog:{
               open:false,
               title:''
            },
            searchInput: '',
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
        // this.setState({
        //      dialog:{
        //        open:true,
        //        title:'新建组织'
        //     }
        // })
        // 上面的写法是不太对的，修改对象的值，应该是用object.assign 或者拓展语法
        this.setState((preState) => ({
            dialog: {...preState.dialog, open: true, title:'新建组织'}
        }) )

    }
    handleCloseDialog = () =>{
        this.setState({
            dialog:{
               open:false,
            }
        })
        // this.getOrgList()
    }
    dialogSave = (value) => {
        // setState 是一个一步过程。
        // 例如，多次点击，多次调用，那就是后一次的值，覆盖了前一次的值
        // 同时也是一个合并的过程
        // 当state中的某个状态发生变化时，应该重新创建这个状态对象，而不是直接修改原来的状态,避免直接修改原对象的方法
        // 1: int string boolean 直接赋新值
        // 2: array 如下面的例子, 肯定涉及到 preState 
        // 注意，不要使用push、pop、shift、unshift、splice等方法修改数组类型的状态，因为这些方法都是在原数组的基础上修改的，而concat、slice、filter会返回一个新的数组。
        // 3. object ,Object.assign 或者 扩展语法（{...obj, value}）
        this.setState((preState, props) => ({
            // 等效 orgList: preState.orgList.concat([value])
            orgList: [...preState.orgList, value]
        }))
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
        // 只会被调用一次
        // 可获取 dom 结构
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
            title: '创建时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render:(_, record) => <span>{ record.createdAt }</span>
          },
          {
            title: '操作',
            key: 'action',
            render: (_, record) => (
              <Space size="middle">
                <Button> edit </Button>
                <Button onClick={ () => this.deleteOrg(record.id) }> delete </Button>
              </Space>
            ),
          },
        ]
        return(
            <>
               <div className={'org-container'}>
                   <div className={'base-flex-between'}>
                    <Input placeholder='please input' value={this.state.searchInput} onChange={this.searchInputChange}></Input>
                    <Button onClick={this.createOrg}>create</Button>
                   </div>
                   <Table columns={columns} dataSource={this.state.orgList} rowKey={(record) => record.id} />
                    <OrgDialog
                        open={this.state.dialog.open}
                        title={this.state.dialog.title}
                        close={this.handleCloseDialog}
                        save={this.dialogSave}
                    ></OrgDialog>
               </div>
            </>
        )
    }
}

export default OrgManage