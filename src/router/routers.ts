import type { RouteRecordRaw } from 'vue-router'
const Routers: RouteRecordRaw[] = [
  {
    path: '/home',
    component: () => import('@/views/layout/HomeLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/home/HomeView.vue')
      },
      {
        path: 'about',
        component: () => import('../views/AboutView.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('../views/common/page-404.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/LoginView.vue')
  }
]

export default Routers
