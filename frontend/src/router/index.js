import { createRouter, createWebHistory } from 'vue-router'
import PageCars from '@/pages/PageCars.vue'
import PageMain from '@/pages/PageMain.vue'

const routes = [
  {
    path: '/',
    component: PageMain,
  },
  {
    path: '/cars',
    component: PageCars,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
