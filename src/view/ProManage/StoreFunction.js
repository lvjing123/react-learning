/**
 * Created by djz on 2023/3/27.
 */
import React from 'react'
import { useSelector } from 'react-redux'

export default function StoreFunctionComponent(){
    const commonStore = useSelector(state => state.common)
    const { userInfo } = commonStore
    return(
        <div>
            <span>方式1</span>
            {Object.keys(userInfo).map((key, index) => (
                <div className={'user-info'} key={index}>
                    <span>{key}: </span>
                    <span className='value'>{userInfo[key]}</span>
                </div>
            ))}
        </div>
    )
}