// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import App from './App'
import Cookies from './common/nenglong.cookies'
import https from './common/nenglong.http'
import store from './store/index'
import './font/iconfont.css'	//全局图标
import './common/login'
// Cookies.delCookie('token');
// 挂载全局
Vue.prototype.$http = https // ajax请求方法
Vue.prototype.$cookie = Cookies

FastClick.attach(document.body)	//解决浏览器点击事件300毫秒的延迟

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
