import List from './studentList';
import StudentDetail from './studentDetail';
import React from 'react'
import PropTypes from 'prop-types';
// React.PropTypes has moved into a different package since React v15.5. Please use the prop-types library instead.

class ListContainer extends  React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[],
            currentStudentId: ''
        }
    }
    // context 组件通信
    getChildContext() {
        return {
            addStudent: this.addStudent,
        }
    }
    addStudent = (newStudent) => {
        // can add by api
        // here we can fork by setState
        const studentItem = {...newStudent, id: this.state.list.length + 1}
        this.setState((preState) => ({
            // 等效 orgList: preState.list.concat([studentItem])
            list: [...preState.list, studentItem]
        }))
    }

    selectStudent = (studentId) => {
        // get studentid and show current student
        console.log(studentId, 'studentId')
        this.setState({
            currentStudentId: studentId
        })
    }
    componentDidMount() {
        // from api to get list
        this.setState({
            list:[
                {
                    id: '1',
                    name: '章三',
                    age: 18,
                    score: 100,
                    gender: '男',   
                },
                {
                    id: '2',
                    name: '王思',
                    age: 18,
                    score: 100,
                    gender: '女',  
                },
                {
                    id: '3',
                    name: '礼物',
                    age: 17,
                    score: 80,
                    gender: '男',  
                }
            ]
        })
    }

    render() {
        const filterStudent = this.state.list.filter((student) => student.id === this.state.currentStudentId)
        const currentStudent = filterStudent.length > 0? filterStudent[0] : {}
        return (
           <>
                <List 
                    list={this.state.list} 
                    onAddStudent={this.addStudent}
                    onSelectStudent={this.selectStudent}
                />
                <StudentDetail currentStudent={currentStudent}  />
            </>
        )
    }
}

// 声明 context 的属性信息
ListContainer.childContextTypes = {
    addStudent: PropTypes.func
}


export default ListContainer