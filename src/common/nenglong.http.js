import NengLong from './nenglong.common'
import axios from 'axios'
import qs from 'qs' //辅助工具插件，axios使用post请求需要用到
import Cookies from '../common/nenglong.cookies'

/// <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
/// <reference path="jquery-1.7.2.js" />

//https://github.com/axios/axios
/***********************************************************************************************************/
NengLong.namespace("Http");

//nlHttp   默认配置  在请求时配置覆盖默认配置
NengLong.Http.nlHttp = axios.create({
    // 罗健电脑链接 http://192.168.9.100:8042/api-office/
    baseURL: 'http://13512799741.imwork.net:23605',
    // baseURL: 'http://192.168.8.225:8080',
    timeout: 1000 * 30,
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
});

// http request 拦截器
NengLong.Http.nlHttp.interceptors.request.use( function (config) {
    // Do something before request is sent
    config.headers['token'] = Cookies.getCookie('token');
    return config;
}, function (error) {
    // Do something with request error
    console.log(error);
    return Promise.reject(error);
});

// http response 拦截器
NengLong.Http.nlHttp.interceptors.response.use(function(response) {
    // Do something with response data
    if (response.data && response.data.code === 401) { // 401, token失效
        console.log('token失效');
        Cookies.delCookie('token')
        router.push({ name: 'home' }, function() {
            location.reload() // 刷新页面, 清空整站临时存储数据
        })
    }

    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

//默认请求配置
NengLong.Http.defaultConfig = {
    // 请求数据转换
    // transformRequest: [function (data, headers) {
    //     // Do whatever you want to transform the data
    //
    //     return data;
    // }],
    //  响应数据转换
    // transformResponse: [function (data) {
    //     // Do whatever you want to transform the data
    //
    //     return data;
    // }],

    // header 设置默认头部
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        // token: 12345
    },

    // 设置默认URL参数--GET
    params: {
        // token: 12345
    },
    // 设置默认数据--PUT
    data: {
        // token: 12345
    },

    //超时
    timeout: 1000 * 30,

    // `withCredentials` indicates whether or not cross-site Access-Control requests
    withCredentials: false, // default

    // `responseType ：options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    responseType: 'json', // default

    // responseEncoding
    // responseEncoding: 'utf8', // default

    // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
    // xsrfCookieName: 'XSRF-TOKEN', // default

    // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
    // xsrfHeaderName: 'X-XSRF-TOKEN', // default

    //上传
    // onUploadProgress: function (progressEvent) {
    //     // Do whatever you want with the native progress event
    // },

    // 下载
    // onDownloadProgress: function (progressEvent) {
    //     // Do whatever you want with the native progress event
    // },

    //  maxContentLength
    // maxContentLength: 2000,

    //  maxRedirects
    // maxRedirects: 5,

    //  httpAgent
    // httpAgent: new http.Agent({ keepAlive: true }),
    // httpsAgent: new https.Agent({ keepAlive: true }),

    // 代理设置
    // proxy: {
    //     host: '127.0.0.1',
    //     port: 9000,
    //     auth: {
    //         username: 'mikeymike',
    //         password: 'rapunz3l'
    //     }
    // },

    //  cancelToken
    // cancelToken: new CancelToken(function (cancel) {
    // })
};

//处理网络错误
NengLong.Http.checkStatus = function(response) {
    // loading
    // 如果http状态码正常，则直接返回数据
    if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
        return response
        // 如果不需要除了data之外的数据，可以直接 return response.data
    }
    // 异常状态下，把错误信息返回去
    return {
        status: -404,
        msg: '网络异常'
    }
};

//处理数据错误
NengLong.Http.checkCode = function (response) {
    // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
    if (response.status === -404) {
        // alert(response.msg)
    }
    if (response.data && ( response.data.code !== 1)) {
        //TODO：根据API协议定制
        alert(response.data.msg)
    }
    return response
};
/*
 * get请求数据处理
 * @param {*} url 数据接口
 * @param {*} paramList 配置信息，结构为对象模式，可省略
 * @param {*} callback 数据处理函数
 * @param {*} config 配置信息，覆盖默认配置，结构为对象模式，可省略
 */
// Object.assign 深度复制，将两个object合并成一个新对象，后面的对象覆盖前面对象命名一样的属性
NengLong.Http.get = function (url,paramList,callback,config) {
    // var newConfig = $.extend(true,NengLong.Http.defaultConfig, config);
    var newConfig = Object.assign(NengLong.Http.defaultConfig, config);
    if(paramList != null){
        // newConfig = $.extend(true,newConfig, {params:paramList});
        newConfig = Object.assign(newConfig, {params:paramList});
    }
    NengLong.Http.nlHttp.get(url,newConfig)
        .then(function (response) {
            return NengLong.Http.checkStatus(response);
        })
        .then(function (response) {
            return NengLong.Http.checkCode(response);
        })
        .then(function (response) {
            callback(response);

        });
};
/*
 * post请求数据处理
 * @param {*} url 数据接口
 * @param {*} data 数据对象
 * @param {*} callback 数据处理函数
 * @param {*} config 配置信息，覆盖默认配置，结构为对象模式，可省略
 */
NengLong.Http.post = function (url,data,callback,config) {
    // var newConfig = $.extend(true,NengLong.Http.defaultConfig, config);
    var newConfig = Object.assign(NengLong.Http.defaultConfig, config);
    NengLong.Http.nlHttp.post(url,data,newConfig)
        .then(function (response) {
            return NengLong.Http.checkStatus(response);
        })
        .then(function (response) {
            return NengLong.Http.checkCode(response);
        })
        .then(function (response) {
            return callback(response);
        });
};

// Response 对象说明
// {
//     // `data` is the response that was provided by the server
//     data: {},
//
//     // `status` is the HTTP status code from the server response
//     status: 200,
//
//         // `statusText` is the HTTP status message from the server response
//         statusText: 'OK',
//
//     // `headers` the headers that the server responded with
//     // All header names are lower cased
//     headers: {},
//
//     // `config` is the config that was provided to `axios` for the request
//     config: {},
//
//     // `request` is the request that generated this response
//     // It is the last ClientRequest instance in node.js (in redirects)
//     // and an XMLHttpRequest instance the browser
//     request: {}
// }


export default NengLong.Http;