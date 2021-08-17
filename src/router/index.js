import { createRouter, createWebHistory,redirect } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'music',
    redirect:'/playing',
    component: () => import('../views/Music/index.vue'),
    children:[{
      // 正在播放
      path: 'playing',
      name: 'playing',
      component: () => import('../views/Music/playing/index.vue'),
    },{
      // 推荐
      path: 'recommend',
      name: 'recommend',
      component: () => import('../views/Music/recommend/index.vue'),
    },{
      // 搜索
      path: 'select',
      name: 'select',
      component: () => import('../views/Music/select/index.vue'),
    },{
      // MV
      path: 'selectMv',
      name: 'selectMv',
      component: () => import('../views/Music/selectMv/index.vue'),
    }]
  },
  {
    path: '/mv',
    name: 'mv',
    component: () => import(/* webpackChunkName: "mv" */ '../views/Mv/index.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
