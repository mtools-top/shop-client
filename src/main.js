// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

// 样式重置
import './assets/reset.css'
// 路由导入
import router from './router'
// 导入vant所有组件
import Vant from 'vant';
import '../node_modules/vant/lib/index.css'
Vue.use(Vant);
// 开发环境添加请求路径
Vue.prototype.$local = 'http://localhost:3000'
// 生产环境
// Vue.prototype.$local = ''
Vue.config.productionTip = false
import store from './store'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
