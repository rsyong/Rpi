// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../static/public.css'
import '../static/login.css'
import '../static/page.css'
import axios from 'axios'
Vue.prototype.$http = axios;
axios.defaults.withCredentials=false;
//axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL='http://ranshuyong.top:3002';
//axios.defaults.baseURL='http://127.0.0.1/php/';
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
