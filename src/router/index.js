import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const home = () => import('../pages/home/home.vue');
const index = () => import('../pages/index/index.vue');
const goods = () => import('../pages/goods/goods.vue');
const cart = () => import('../pages/cart/cart.vue');
const mime = () => import('../pages/mime/mime.vue');
const login = () => import('../pages/login/login.vue');
const register = () => import('../pages/register/register.vue');
const router = new Router({
  routes: [
    {
      path: '/',
      component: home,
      children: [
        {
          path: 'index',
          component: index,
          name: '首页'
        },
        {
          path: 'goods',
          component: goods,
          name: '商品列表'
        },
        {
          path: 'cart',
          component: cart,
          name: '购物车'
        },
        {
          path: 'mime',
          component: mime,
          name: '会员中心'
        },
        {
          path: 'login',
          component: login,
          name: '欢迎登陆'
        },
        {
          path: 'register',
          component: register,
          name: '欢迎注册'
        },
        {
          path: '*',
          redirect: '/index'
        }
      ]
    },

  ]
})
export default router
