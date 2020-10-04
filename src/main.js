import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router';
import store from "@/store/index";
import './router/permit';
import './assets/icon/iconfont.css';
import './styles/main.scss'
import 'github-markdown-css/github-markdown.css'
import astrict from '@/utils/astrict'
import VueClipboard from 'vue-clipboard2'

Vue.use(astrict)
Vue.use(VueClipboard)
Vue.config.productionTip = false
Vue.use(ElementUI);


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
