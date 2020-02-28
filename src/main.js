const Vue = require('vue')
import App from './App.vue'
import router from './router'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
const ElementUI = require('element-ui')
import store from './store'
import axios from './assets/js/axios';



Vue.config.productionTip = false;
/****** 全局注册axios ******/
Vue.prototype.axios = axios;



// Vue.use(ElementUI);

// 进入路由前的处理
router.beforeEach((to, from, next) => {
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
