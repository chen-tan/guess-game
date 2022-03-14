import Vue from 'vue'
import App from './App.vue'

import 'normalize.css/normalize.css'

import router from './router'
import store from './store'
import ElementUI from 'element-ui'

import './style/global.scss'
import 'element-ui/lib/theme-chalk/index.css'
import './icons'

Vue.use(ElementUI, { size: 'small' });

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
