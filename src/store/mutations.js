//将函数名用固定的名字来表示，以后维护的时候想要改变量名只要去 文件mutation-types.js 里统一修改就可以了
import {ADD_COUNTER, ADD_TO_CART} from './mutation-types'

export default {
  //mutations唯一的目的--改变state的状态，优点:方便追踪记录改变
  //mutations中的每个方法尽可能只完成一件事情
  // addCart(cartList, payload) {
  //   //payload是新添加的商品
  //   //1.查找之前数组中是否有该商品
  //   let oldProduct = state.cartList.find(item => item.iid === payload.iid)
  //   //2.如果没有就给新商品添加count属性，并添加到cartList里
  //   //如果有，就只增加count数量
  //   if (oldProduct) {
  //     oldProduct.count += 1
  //   } else {
  //     payload.count = 1
  //     state.cartList.push(payload)
  //   }
  // }
  //已有商品增加数量
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  //新商品压入数组
  [ADD_TO_CART](state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}
