/**
 * Created by djz on 2023/3/24.
 */
import dateFormatFun from 'dateformat'


const toString = Object.prototype.toString

/**
 * @description: 判断值是否未某个类型
 */
export const is = (val, type) => {
  return toString.call(val) === `[object ${type}]`
}
export const isFunction = (val) => is(val, 'Function')

/**
 * @description: 是否已定义
 */
export const isDef = val => typeof val !== 'undefined'

export const isUnDef = val => !isDef(val)
/**
 * @description: 是否为对象
 */
export const isObject = val => val !== null && is(val, 'Object')

/**
 * @description:  是否为时间
 */
export const isDate = val => is(val, 'Date')

/**
 * @description:  是否为数值
 */
export const isNumber = val => is(val, 'Number')

/**
 * @description:  是否为字符串
 */
export const isString = val => is(val, 'String')
/**
 * @description:  是否为boolean类型
 */
export const isBoolean = val => is(val, 'Boolean')

/**
 * @description:  是否为数组
 */
export const isArray = val =>  val && Array.isArray(val)


const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm'


export const joinTimestamp = (join, restful = false) => {
  if (!join) {
    return restful ? '' : {}
  }
  const now = new Date().getTime()
  if (restful) {
    return `?_t=${now}`
  }
  return { _t: now }
}

/**
 * @description: Format request parameter time
 */
export function formatRequestDate(params) {
  if (Object.prototype.toString.call(params) !== '[object Object]') {
    return
  }

  for (const key in params) {
    if (params[key] && params[key]._isAMomentObject) {
      params[key] = params[key].format(DATE_TIME_FORMAT)
    }
    if (isString(key)) {
      const value = params[key]
      if (value) {
        try {
          params[key] = isString(value) ? value.trim() : value
        } catch (error) {
          throw new Error(error)
        }
      }
    }
    if (isObject(params[key])) {
      formatRequestDate(params[key])
    }
  }
}

export const isUrl = (url) => {
  return /(^http|https:\/\/)/g.test(url)
}

export const deepMerge = (src, target) => {
  for ( let key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key])
  }
  return src
}

export const setObjToUrlParams = (baseUrl, obj) => {
  let parameters = ''
  let url = ''
  for (const key in obj) {
    // @ts-ignore
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&'
  }
  parameters = parameters.replace(/&$/, '')
  if (/\?$/.test(baseUrl)) {
    url = baseUrl + parameters
  } else {
    url = baseUrl.replace(/\/?$/, '?') + parameters
  }
  return url
}

// 格式化时间
export function dataFormat(ipt, format = 'yyyy-mm-dd HH:MM:ss') {
  if (!ipt) {
    return ''
  }
  return dateFormatFun(new Date(ipt), format)
}