export default {
  path: '/practice',
  component: () => import('@/views/practice'),
  children: [
    {
      path: 'rightDown',
      component: () => import('@/views/rightDown')
    }
  ]
}