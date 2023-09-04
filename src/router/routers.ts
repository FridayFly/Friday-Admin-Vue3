import type { RouteRecordRaw } from 'vue-router'
const Routers: RouteRecordRaw[] = [
  {
    name: 'defaultRoute',
    path: '/',
    component: () => import('@/views/layout/HomeLayout.vue'),
    children: [
      {
        path: '',
        name: 'index',
        component: () => import('../views/home/HomeView.vue')
      },
      {
        name: 'about',
        path: 'about',
        component: () => import('../views/AboutView.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/LoginView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('../views/common/page-404.vue')
  }
]

export const NotFoundPageRoute: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: '404',
  component: () => import('../views/common/page-404.vue')
}

export default Routers
