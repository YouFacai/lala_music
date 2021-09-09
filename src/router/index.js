import { createRouter, createWebHashHistory, redirect } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'music',
    redirect: '/recommend',
    component: () => import('../views/Music/index.vue'),
    children: [{
      // 正在播放
      path: 'playing',
      name: 'playing',
      component: () => import('../views/Music/playing/index.vue'),
    }, {
      // 搜索
      path: 'select',
      name: 'select',
      component: () => import('../views/Music/select/index.vue'),
    }, {
      path: 'mv',
      name: 'mv',
      component: () => import('../views/Music/Mv/index.vue')
    }, {
      path: 'discuss',
      name: 'discuss',
      component: () => import('../views/Music/Discuss/index.vue')
    }, {
      path: 'recommend',
      name: 'recommend',
      component: () => import('../views/Music/Recommend/index.vue'),
    }],
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router




