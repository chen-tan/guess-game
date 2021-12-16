import Vue from 'vue'
import Router from 'vue-router'
import guessRoutes from './guess'

Vue.use(Router);

const routes = [
  {
    path: '/',
    redirect: '/guess'
  },
  guessRoutes
]





const router = new Router({
  mode: 'hash',
  routes
})

export default router;