/**
 * Created by djz on 2023/3/27.
 */
import React from 'react'
import { Carousel } from 'antd'
import '@/view/ProManage/ProManage.scss'
import img1 from '../../images/1.webp'
import img2 from '../../images/2.webp'
import img3 from '../../images/3.jpeg'
import StoreClass from '@/view/ProManage/StoreClass'
import StoreFunction from '@/view/ProManage/StoreFunction'

// 类组件 必须继承React.Component
class ProManage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {}
        }

    }
    render(){
        return(
            <>
                <div className='pro-conatiner'>
                    <div className='title-text'>用户详情（store 的两种取值方式）</div>
                    <StoreClass />
                    
                    <StoreFunction />
                </div>
            </>
        )
    }
}




export default ProManage