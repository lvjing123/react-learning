/**
 * Created by djz on 2023/3/24.
 */
import { http } from '../utils/http/axios/index'

export const loginReq = (params) => {
    return http.request(
    {
      url: '/account/login',
      method: 'POST',
      params:{
          username:params.username,
          password:params.password
      }
    },
    {
      isTransformResponse: false,
      isShowMessage: false,
    },
  )
}