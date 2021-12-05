import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import './registerServiceWorker'
import '@/assets/styles/reset.scss'
// import { Notify, Dialog } from 'vant';
import Vant from 'vant';
import vueTouch from "vue-plugin-touch"
import 'amfe-flexible'

import $ from "jquery"
import requestAnimationFrameHack from './utils/requestAnimationFram'
import jequeryExtensFly from './utils/fly'

requestAnimationFrameHack()
jequeryExtensFly($)
window.$ = $

// Vue.use(Notify).use(Dialog).use(vueTouch);
Vue.use(vueTouch);
Vue.use(Vant);
// const ua = navigator.userAgent

// if(ua.indexOf("bsl") >= 0 ) {

//   // alert("mainjs")
//   var x = 1;

//   function appFinishiLoad() {
//     BSL.PhoneID('id');
//   }

// function id(i) {
//     if(i.indexOf('-') < 0){
//         BSL.OpenStep();
//     }
//     alert(i)
//     setInterval(function () {
//       BSL.GetStepCount('step');
//       x++;
//     }, 1000);
//   }

//   function step(s) {
//     alert(s)
//     //document.body.innerHTML = '��' + x + '�λ�ò���Ϊ' + s;
//   }
//   BSL.PhoneID('id');

// }
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
