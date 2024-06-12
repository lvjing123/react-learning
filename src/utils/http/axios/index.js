/**
 * Created by djz on 2023/3/24.
 */
// axios配置  可自行根据项目进行更改，只需更改该文件即可，其他文件可以不动
import { VAxios } from './axios'
import axios from 'axios'
import { joinTimestamp, formatRequestDate, isString, isUrl, deepMerge, setObjToUrlParams } from '../../util'
import { checkStatus } from './checkStatus'

const urlPrefix = '/api'

/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform = {
  /**
   * @description: 处理请求数据
   */
  transformRequestData: (res, options) => {
    const {
      isShowMessage = true,
      isShowErrorMessage,
      isShowSuccessMessage,
      successMessageText,
      errorMessageText,
      isTransformResponse,
      isReturnNativeResponse,
    } = options
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnNativeResponse) {
      return res
    }
    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformResponse) {
      return res.data
    }
    //  这里 code，data，message为 后台统一的字段，需要修改为项目自己的接口返回格式
    const data = res && res.data
    if (!data) {
      // return '[HTTP] Request has no return value';
      throw new Error('请求错误')
    }
    // @ts-ignore
    const { code, message, error } = data
    if (res.status === 200) {
      if (isShowMessage) {
        if (successMessageText || isShowSuccessMessage) {
          // 是否显示自定义信息提示
          alert('特殊提示信息')
        }
      }
    }
    // 接口请求成功，直接返回结果
    if (data && !error) {
      return data
    }
    // 接口请求错误，统一提示错误信息 这里逻辑可以根据项目进行修改
    const errorMsg = message
    if (errorMsg) {
      // $message.error(errorMsg, { keepAliveOnHover: true })
    }
    throw new Error(errorMsg)
  },

  // 请求之前处理config
  beforeRequestHook: (config, options) => {
    const { joinPrefix, joinParamsToUrl, formatDate, joinTime = true, urlPrefix } = options

    const isUrlStr = isUrl(config.url)

    if (!isUrlStr && joinPrefix) {
      config.url = `${urlPrefix}${config.url}`
    }
    const params = config.params || {}
    const data = config.data || false
    if (config.method?.toUpperCase() === 'GET') {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false))
      } else {
        // 兼容restful风格
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`
        config.params = undefined
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params)
        if (Reflect.has(config, 'data') && config.data && Object.keys(config.data).length > 0) {
          config.data = data
          config.params = params
        } else {
          config.data = params
          config.params = undefined
        }
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(config.url, Object.assign({}, config.params, config.data))
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params
        config.params = undefined
      }
    }
    return config
  },

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: (config, options) => {
    // 请求之前处理config
    const token = localStorage.getItem('access_token')
    if (token && config.requestOptions.withToken !== false) {
      // jwt token
      config.headers.Authorization = options.authenticationScheme ? `${options.authenticationScheme} ${token}` : token
    }
    return config
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (error) => {
    // console.log('error,', error)
    const { response, code, message } = error || {}
    console.log(response, code, message)
    // TODO 此处要根据后端接口返回格式修改
    const msg = response && response.data && response.data.message ? response.data.message : message
    const err = error.toString()
    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        return
      }
      if (err && err.includes('Network Error')) {
        return Promise.reject(error)
      }
    } catch (error) {
      throw new Error(error)
    }
    // 请求是否被取消
    const isCancel = axios.isCancel(error)
    console.log(isCancel)
    if (!isCancel) {
      // 登录 如果出现用户名或者密码错误
      if (response.config.url.includes('/api/account/login')) {
        return Promise.reject(error)
      }
      if (msg && response.status !== 401) {
        checkStatus(error.response && error.response.status, msg)
      }

    } else {
      return Promise.reject(response.data)
    }
  },
}

function createAxios(opt) {
  return new VAxios(
    deepMerge(
      {
        timeout: 3 * 10 * 1000,
        authenticationScheme: 'Bearer',
        // 接口前缀
        prefixUrl: urlPrefix,
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        // 数据处理方式
        transform,
        // 请求拦截器
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 默认将prefix 添加到url
          joinPrefix: true,
          // 是否返回原生响应头 比如：需要获取响应头时使用该属性
          isReturnNativeResponse: false,
          // 需要对返回数据进行处理
          isTransformResponse: true,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          // 格式化提交参数时间
          formatDate: true,
          // 消息提示类型
          errorMessageMode: 'none',
          // 接口拼接地址
          urlPrefix: urlPrefix,
          //  是否加入时间戳
          joinTime: false,
          // 忽略重复请求
          ignoreCancelToken: true,
          // 是否携带token
          withToken: true,
          // 是否显示错误信息
          isShowErrorMessage: true,
        },
        withCredentials: false,
      },
      opt || {},
    ),
  )
}

export const http = createAxios()