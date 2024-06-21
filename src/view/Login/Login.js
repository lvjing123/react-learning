/**
 * Created by djz on 2023/3/23.
 */
import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setLoginInfo } from '../../store/loginReducer'
import './login.scss'
import { Button, Form, Input } from 'antd'
import { loginReq } from "../../api/loginApi"
import MyMessages from "../components/MyMessage/MyMessages";

export default function Login(){
    // 将消息出入到store 中
    const dispatch = useDispatch()
    // 定义meaasge 的初始值
    let [ messagesInfo, setMessagesInfo] = useState({type:'', msg:''})
    // 是为了用form 与表单进行捆绑 类似于 ref, form 就可以获取表单内的元素
    let [form] = Form.useForm()
    // 路由跳转
    let navigate = useNavigate()
    const onFinish = async(values) => {
        // console.log('Success:', values)
        try {
            const res = await loginReq(values)
            // console.log(res,'data')
            // 登录成功 需要保存信息到localStorage
            localStorage.setItem('access_token', res.accessToken)
            // 将登录的信息存储到login store 中
            dispatch(
                setLoginInfo(res)
              )
            // 成功后跳转
            navigate('/home')
        } catch (e) {
            console.log(e,'error')
            const msg = e.response.data.message
            // 可能要做错误处理
            setMessagesInfo({type:'error', msg: msg})
        }

    }

    const cancel = () => {
        // 点击取消 清空表单输入的内容
        form.resetFields()
    }
    return(
        <div>
            <div className='login'>
            <div className={'content'}>
               <Form
                form={form}
                name="basic"
                labelCol={{
                  span: 4,
                }}
                wrapperCol={{
                  span: 18,
                }}
                initialValues={{
                  username: '',
                  password: ''
                }}
                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item
                  label="账号"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: '请输入用户名',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="密码"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: '请输入密码',
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
               <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    登录
                  </Button>
                   <Button onClick={cancel} className={'cancel-btn'} >
                    取消
                  </Button>
                </Form.Item>
              </Form>
            </div>
        </div>
            <MyMessages messagesInfo={messagesInfo} />
        </div>
    )
}
