import React from 'react'

export default function StudentDetail(props) {
    return (
        <div>
            <div> 学生个人信息 </div>
            { props.currentStudent ? (
               <> 
                <div>{props.currentStudent.name}</div>
                <div>{props.currentStudent.age}</div>
                <div>{props.currentStudent.score}</div>
                <div>{props.currentStudent.gender}</div>
               </>
            ) : ''
            }
        </div>
    )
}