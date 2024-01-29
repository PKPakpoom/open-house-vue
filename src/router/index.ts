/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/index.vue')
  },
  {
    path: '/game',
    name: 'Game',
    component: () => import('@/pages/Game.vue')
  }
]

  


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router
