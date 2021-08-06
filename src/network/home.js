//封装首页里所有的数据请求，方便统一管理，减少耦合

import {request} from "./request";

//首页轮播图数据请求
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}
//首页商品列表数据请求
export function getHomeGoods(type,page) {
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
}
