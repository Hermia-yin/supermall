import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const ShopCar = () => import('../views/shopcar/ShopCar')
const Profile = () => import('../views/profile/Profile')
const Detail =()=>import('../views/detail/Detail')

//解决路由重复报错（解决点击底部tab按钮两次以上会报错问题）
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
}

//1。安装插件
Vue.use(VueRouter)

//2.创建路由对象
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/shopcar',
    component: ShopCar
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:iid',
    component: Detail
  },
]
const router = new VueRouter({
  routes,
  //哈希模式会带#，不美观；history模式/
  mode: 'history'
})

//3.导出router
export default router
