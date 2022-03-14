import Vue from 'vue'
import Router from 'vue-router'
import guessRoutes from './guess'
import countdownRoutes from './countdown.js'
import practice from './practice.js'
Vue.use(Router);

const routes = [
  {
    path: '/',
    redirect: '/practice'
  },
  guessRoutes,
  countdownRoutes,
  practice
]





const router = new Router({
  mode: 'hash',
  routes
})

export default router;