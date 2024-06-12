import React from 'react'
import { Button, Col, Row, Card, Flex } from 'antd'
import WithRouter from '@/view/components/RouterPush/index'
import '@/view/Home/Home.scss'
import { setUserInfo } from '@/store/commonReducer'

// 类组件 必须继承React.Component
class HomeManage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userInfo:{
                name: 'ccc',
                email: '11@qq.com',
                telephone: '123456789',
                target: 'web engineer',
                experience: '5 Years'
            },
        }
    }
    goAdmin = () => {
        // 采用箭头函数，如果使用const 定义，需要在construtor 中用bind 重新制定this,
        this.props.router.navigate('/sys/org')
    }

    // 存储信息到store, 然后再其他页面拿到
    storeInfo = () => {
        this.props.store.dispatch(setUserInfo({userInfo: this.state.userInfo}))
    }

    render(){
        return(
            <>
               <div className={'home-container'}>
                   <div className={'home-back-btn'}>
                    <Button onClick={this.goAdmin}>回首页</Button>
                    <Button onClick={this.storeInfo}>存储个人信息</Button>

                   </div>
                    <Flex justify={'center'} align={'center'} className={'home-content'}>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Card title="个人介绍" bordered={false} className={'card-container'}>
                                    {Object.keys(this.state.userInfo).map((key, index) => (
                                        <div className={'user-info'} key={index}>
                                            <span>{key}: </span>
                                            <span className='value'>{this.state.userInfo[key]}</span>
                                        </div>
                                    ))}
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card title="工作经验" bordered={false} className={'card-container'}>
                                    <p>休闲鞋- 前端开发</p>
                                    <p>运动裤 - 前端开发</p>
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card title="技能" bordered={false} className={'card-container'}>
                                    <div>
                                        <li className='skill-item'>JavaScript/TypeScript</li>
                                        <li className='skill-item'>HTML/CSS</li>
                                        <li className='skill-item'>React/Vue</li>
                                        <li className='skill-item'>Webpack/Vite</li>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </Flex>
               </div>
            </>
        )
    }
}

export default WithRouter(HomeManage)