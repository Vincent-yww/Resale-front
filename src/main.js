// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import SlideVerify from 'vue-monoplasty-slide-verify';
import Axios from 'axios';
import VueAxios from 'vue-axios';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import VueHighlightJS from 'vue-highlightjs'
import 'element-ui/lib/theme-chalk/display.css'

Vue.use(VueAxios, Axios);
Vue.use(VueHighlightJS);
Vue.use(SlideVerify);
Vue.use(ElementUI);
Vue.use(mavonEditor);
//引入了拼图验证码组件

Vue.config.productionTip = false;

// Vue.prototype.websiteUrl = 'http://localhost:8080';
Vue.prototype.websiteUrl = 'http://115.28.184.217:8080';
// Vue.prototype.resourceUrl = 'http://cdn.2gc5519406.zicp.vip/';
Vue.prototype.resourceUrl = 'http://q2fl9rcgp.bkt.clouddn.com/';
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});
