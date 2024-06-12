/**
 * Created by djz on 2023/3/27.
 */
import React from 'react'
import { connect } from 'react-redux';

let commonStore = {}
function mapStateToProps(state) {
    commonStore = state.common
    return { common: state.common }
}

// 类组件 必须继承React.Component
class StoreByClassComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userInfo: commonStore.userInfo
        }

    }
    
    render(){
        return(
            <>
                <div className='pro-conatiner'>
                    <div>方式1</div>
                    {Object.keys(this.state.userInfo).map((key, index) => (
                        <div className={'user-info'} key={index}>
                            <span>{key}: </span>
                            <span className='value'>{this.state.userInfo[key]}</span>
                        </div>
                    ))}
                </div>
            </>
        )
    }
}

export default connect(mapStateToProps)(StoreByClassComponent)