//以插件的形式将toast封装起来,toast（吐司）消息弹窗
//使用方法：在需要的组件方法中直接调用 this.$toast.show(message,duration)
//创建方法：1.创建Toast组件/2.创建toast.js/3.在main.js里安装toast

//引入Toast组件
import Toast from "./Toast.vue";

const obj = {}

//install函数默认会传一个Vue参数
// obj.install=function (Vue){
//   console.log('执行了obj的install函数',Vue);
// }
obj.install = function (Vue) {
  // 1.创建组件构造器
  const toastConstructor = Vue.extend(Toast)
  //2.new的方式，根据组件构造器，可以创建出来一个组件对象
  const toast = new toastConstructor()
  //3.将组件对象，手动挂载到某个元素上
  toast.$mount(document.createElement('div'))
  //4.现在 toast.$el 对应的就是 div
  document.body.appendChild(toast.$el)


  Vue.prototype.$toast = toast;
}

//使用default可以在 引入obj的时候起别名 (比如现在main.js里就是toast代替了obj)
export default obj
