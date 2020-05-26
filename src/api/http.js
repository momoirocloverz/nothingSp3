import axios from 'axios';
import router from '../router';
import { Message } from 'element-ui'
import util from '../common/util'
/* eslint-disable */

require('es6-promise').polyfill();
let notify;
let message;
let CancelToken = axios.CancelToken
const axiosInstance = axios.create({
  // baseURL: 'http://10000rc.com:9093/bos',
  baseURL: 'http://193.112.185.161:9093/bos',
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 180000,
});

axios.interceptors.request.use(config => {
  // 得到参数中的 requestName 字段，用于决定下次发起请求，取消对应的 相同字段的请求
  // 如果没有 requestName 就默认添加一个 不同的时间戳
  let requestName
  if (config.method === 'post') {
    if (config.data && config.data.requestName) {
      requestName = config.data.requestName
    } else {
      requestName = new Date().getTime()
    }
  } else {
    if (config.params && config.params.requestName) {
      requestName = config.params.requestName
    } else {
      requestName = new Date().getTime()
    }
  }
  // 判断，如果这里拿到的参数中的 requestName 在上一次请求中已经存在，就取消上一次的请求
  if (requestName) {
    if (axios[requestName] && axios[requestName].cancel) {
      axios[requestName].cancel()
    }
    config.cancelToken = new CancelToken(c => {
      axios[requestName] = {}
      axios[requestName].cancel = c
    })
  }
  return config
}, error => {
  return Promise.reject(error)
})

axiosInstance.interceptors.response.use(
  response => {
    switch (response.data.respCode) {
      case -1:
      if(response.data.errorCode == 20001){
        message = Message.error('绑定手机号已被使用')
      }else if(response.data.errorCode == 505) {

      }else if(response.data.errorCode == 20009){
        message = Message.error(response.data.errorMsg)
      }else{
        message = Message.error(response.data.errorMsg)
      }
        break;
      case -2:
      sessionStorage.removeItem('token')
      router.replace({
        path: '/',
      })
      message = Message.error(response.data.errorMsg)
      
      break;
      
    }
    // console.log(response)
    if (response.headers.status == 1) {
      sessionStorage.setItem(
        "token",
        response.headers.authorization
      );
      util.setLocalStorage('token', response.headers.authorization);
    }
    return response;
  },
  error => {
//    console.log(error.response)
    if (error.response.status == 401) {
      message = Message.error(error.response.data.errorMsg)
    }
    // console.log(error.response.data.errorMsg, 'ajax')
    // message = Message.error(error.response.data.errorMsg)
    // message = Message.error(error.response.data.message)
    // alert("服务器错误！请联系管理员")

    // message = Message.error("服务器错误！请联系管理员")
    // if (error.toString() === 'Error: Network Error') {
    //   // message = Message.error("网络错误！")
    // }
    // if (error.toString() === 'Error: Network Error') {
    //   // message = Message.error("服务器错误！请联系管理员")
    // }
    return Promise.reject(error);
  }
);





export function get(url, params) {
  // let token = sessionStorage.getItem('token')
  let localToken = util.getLocalStorage('token')
  return new Promise((resolve, reject) => {
    axiosInstance.get(url, {
      params: params,
      headers:{
        'Authorization' : `Bearer ${localToken}`
      }
    }).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err.data)
    })
  });
}
export function gets(url, params) {
  // let token = sessionStorage.getItem('token')
  let localToken = util.getLocalStorage('token')
  console.log('chdbfsdb')
  // console.log(token)
  return new Promise((resolve, reject) => {
    axiosInstance.get(url, {
      params: params,
      headers:{
        'Authorization' : `Bearer ${localToken}`
      }
    }).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err.data)
    })
  });
}

export function deletes(url, params) {
  // let token = sessionStorage.getItem('token')
  let localToken = util.getLocalStorage('token')
  return new Promise((resolve, reject) => {
    axiosInstance.delete(url, {
      params: params,
      headers:{
        'Authorization' : `Bearer ${localToken}`
      }
    }).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err.data)
    })
  });

}
//
router.beforeEach((to, from, next) => {
  if (to.meta.breadName) {
  document.title = to.meta.breadName+'-万才网平台后台'
}else{
    document.title = '万才网平台后台'
  }
  let localToken = util.getLocalStorage('token')

  let token = sessionStorage.getItem('token')
  if (to.meta.isRequireAuth == false) {
    next()
  } else {
    if (localToken) {  // 通过vuex state获取当前的token是否存在
      next();
    }
    else {
      if (to.path === '/') { //这就是跳出循环的关键
        next()
      } else {
        next('/')
      }
    }
  }
//  console.log(to)
})

axiosInstance.interceptors.request.use(
  config => {
  let localToken = util.getLocalStorage('token')
    const token = sessionStorage.getItem('token')
    if (token) {  // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加
      config.headers.Authorization = `Bearer ${localToken}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });

    

  export default axiosInstance;
