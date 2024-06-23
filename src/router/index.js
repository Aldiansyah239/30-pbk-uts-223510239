import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/post',
      name: 'post',
      component: () => import('../views/Post.vue')
    },
    {
      path: '/albums',
      name: 'albums',
      component: () => import('../views/Albums.vue')
    },
    {
      path: '/albums/:id',
      name: 'photos',
      component: () => import('../views/Photos.vue')
    }
  ]
})

export default router
