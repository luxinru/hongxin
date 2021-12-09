import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import './registerServiceWorker'
import '@/assets/styles/reset.scss'
import '@/assets/styles/common.less'
// import { Notify, Dialog } from 'vant';
import Vant from 'vant'
import vueTouch from "vue-plugin-touch"
import 'amfe-flexible'

import $ from "jquery"
import requestAnimationFrameHack from './utils/requestAnimationFram'
import jequeryExtensFly from './utils/fly'
import Btn from "./components/btn.vue"

requestAnimationFrameHack()
jequeryExtensFly($)
window.$ = $

Vue.component('Btn', Btn)
Vue.use(vueTouch);
Vue.use(Vant);
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
