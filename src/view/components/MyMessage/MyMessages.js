/**
 * Created by djz on 2023/3/27.
 */
import React, { useEffect } from 'react'
import { message } from 'antd'

export default function MyMessages(messagesInfo){
    const [ messageApi,contextHolder] = message.useMessage()
    //useEffect 适用于函数式组件
    useEffect(() => {
        console.log(messagesInfo,'messagesInfo')
        // 当有type 时触发，useEffect 是一进入页面就执行的
        if(messagesInfo.type){
            messageApi.open({
              type: messagesInfo.type,
              content: messagesInfo.msg,
            })
        }
    }, [messagesInfo])
    return (
        <>
            {contextHolder}
        </>
    )
}