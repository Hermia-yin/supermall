//在用这个网络封装之前，需要安装axios,【npm install axios --save】

// 2.终极的网络封装，因为instance返回的是promise
// export function request(config) {
//   // 1.创建axios的实例
//   const instance = axios.create({
//     baseURL: 'http://123.207.32.32:8000',
//     timeout: 5000
//   })
//   return instance(config)
// }

import axios from 'axios'
// 3.axios拦截器
export function request(config) {
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })
  //开始使用拦截器
  //（1）请求拦截
  instance.interceptors.request.use(config=>{
    // console.log(config);
    //对发送内容进行处理
    //返回拦截的请求
    return config
  },err=>{
    console.log(err);})

  //我的界面里的数据请求用到的是这个
  // （2）响应拦截
  instance.interceptors.response.use(res=>{
    // console.log(res);
    //对响应结果进行处理
    //返回拦截的结果
    return res.data
  },err=>{
    console.log(err);
  })
  return instance(config)
}

