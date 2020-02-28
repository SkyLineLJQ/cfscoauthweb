const Vue = require('vue')
const axios = require('axios')

/****** 创建axios实例 ******/
const service = axios.create({
  timeout: 500000  // 请求超时时间
});


/*是否有请求正在刷新token*/
window.isRefreshing = false

/*被挂起的请求数组*/
let refreshSubscribers = []

/*push所有请求到数组中*/
function subscribeTokenRefresh (cb) {
  refreshSubscribers.push(cb)
}

/*刷新请求（refreshSubscribers数组中的请求得到新的token之后会自执行，用新的token去请求数据）*/
function onRrefreshed (token) {
  refreshSubscribers.map(cb => cb(token))
}

service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//service添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    console.log(JSON.stringify(config))
    return config;
  }, function (error) {
    // 对请求错误做些什么
    console.log(error)
    return Promise.reject(error);
  });


// 添加响应拦截器
service.interceptors.response.use(function (response) {
    console.log(response)
  // 对响应数据做点什么
  if(response.data.code == 1){
    Vue.prototype.$message.error('登录过期，请重新登录！')
    setTimeout(()=>{
      window.location.href='/'
    },1000)
  }
  return response;
}, function (error) {
    console.log(error)
  return Promise.reject(error);
});

export default service;
