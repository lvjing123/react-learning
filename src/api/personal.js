/**
 * Created by djz on 2023/3/29.
 */
import {http} from '../utils/http/axios/index'

// 获取个人信息
export const queryProfile = () => {
    return http.request(
        {
            url: '/account/profile',
            method: 'GET',
        },
        {
            acceptDesc: 'person',
        },
    )
}