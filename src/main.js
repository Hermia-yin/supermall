import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'

import toast from 'components/common/toast/toast'

//移动端解决300ms延迟
//使用方法：1.安装fastclick(npm install fastclick --save)/2.引入/3.调用attach函数
import FastClick from 'fastclick'
//为了提高界面性能 图片进入界面时再加载
//使用方法：1.安装vue-lazyload/2.引入/3.Vue.use/4.使用图片的地方<img v-lazy='img.src'>
import VueLazyload from "vue-lazyload";
import {request} from "./network/request";

Vue.config.productionTip = false

// 我们需要一个事件总线来储存一些事件(使用这些事件的组件之间通信困难，非父子 兄弟关系)
// 并且这个事件总线可以发送事件
//vue实例可以发送事件
// 所以我们将vue实例赋值到原型下   全局实例化$bus事件总线
Vue.prototype.$bus = new Vue();

//安装toast插件
Vue.use(toast)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

//移动端解决300ms延迟
FastClick.attach(document.body)
//使用图片懒加载的插件，为了提高界面性能 图片进入界面时再加载
Vue.use(VueLazyload,{
  loading:require('./assets/img/common/placeholder.png')
})
