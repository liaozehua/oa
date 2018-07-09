import Cookis from '../common/nenglong.cookies'
import axios from 'axios'
import router from '@/router'
import qs from 'qs' //辅助工具插件，axios使用post请求需要用到


//默认配置  在请求时配置覆盖默认配置
const http = axios.create({
  baseURL: 'http://192.168.9.110:8081/api-core',
  timeout: 1000 * 30,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

/**
 * 请求拦截
 */
http.interceptors.request.use(config => {
  config.headers['token'] = Cookis.getCookie('token') // 请求头带上token
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
  if (response.data && response.data.code === 401) { // 401, token失效
    Cookies.delCookie('token')
    router.push({ name: 'login' }, () => {
      location.reload() // 刷新页面, 清空整站临时存储数据
    })
  }
  console.log(response);
  return response
}, error => {
  return Promise.reject(error)
})

/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
// http.adornUrl = (actionName) => { //actionName 为接口参数
//   // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
//   // return (process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY ? '/proxyApi/' : window.SITE_CONFIG.baseUrl) + actionName
//   return 'http://192.168.9.110:8081/api-core' + actionName
// }

/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefultParams 是否开启默认参数?
 */
http.adornParams = (params = {}) => {
  return params
}

/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} openDefultdata 是否开启默认数据?
 * @param {*} contentType 数据格式
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
http.adornData = (data = {}, contentType = 'json') => {
  return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
}

export default http
