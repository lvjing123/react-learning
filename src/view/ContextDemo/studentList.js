import React from 'react'
import { Space, Table, Button, Input } from 'antd';
import StudentAdd from './studentAdd'

class StudentList extends  React.Component {
    constructor(props) {
        super(props);
        this.state = {
            createStudentDialog: {
                title: 'add student',
                open: false,
            }
        }
    }

    getStudentDetail = (studentId) => {
        // 调用父组建的id
        this.props.onSelectStudent(studentId)
    }

    createStudent = () => {
        this.setState((preState) => ({
            createStudentDialog: {...preState.createStudentDialog, open: true}
        }) )
    }

    handleCloseStudentDialog = () =>{
        this.setState((preState) => ({
            createStudentDialog: {...preState.createStudentDialog, open: false}
        }) )
    }

    render() {
        const columns = [
            {
              title: 'name',
              dataIndex: 'name',
              key: 'name',
              render: (text) => <a>{text}</a>,
            },
            {
              title: 'age',
              dataIndex: 'age',
              key: 'age',
              render:(_, record) => <span>{ record.age }</span>
            },
            {
              title: 'score',
              dataIndex: 'score',
              key: 'score',
              render:(_, record) => <span>{ record.score }</span>
            },
            {
                title: 'gender',
                dataIndex: 'gender',
                key: 'gender',
                render:(_, record) => <span>{ record.gender }</span>
              },
            {
              title: '操作',
              key: 'action',
              render: (_, record) => (
                <Space size="middle">
                  <Button onClick={() => this.getStudentDetail(record.id)}> detail </Button>
                </Space>
              ),
            },
        ]
        return (
            <>
                {/* <StudentAdd onAddStudent={this.props.onAddStudent} /> */}
                {/* context 传值，不需要上面的写法了 */}
                <Button onClick={this.createStudent}>create</Button>
                <StudentAdd  
                    open={this.state.createStudentDialog.open}
                    title={this.state.createStudentDialog.title}
                    close={this.handleCloseStudentDialog}
                />
                <Table columns={columns} dataSource={this.props.list} rowKey={(record) => record.id} />
            </>
        )
    }
}


export default StudentList