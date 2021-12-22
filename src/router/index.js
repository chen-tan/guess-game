import Vue from 'vue'
import Router from 'vue-router'
import guessRoutes from './guess'
import countdownRoutes from './countdown.js'

Vue.use(Router);

const routes = [
  {
    path: '/',
    redirect: '/guess'
  },
  guessRoutes,
  countdownRoutes
]





const router = new Router({
  mode: 'hash',
  routes
})

export default router;