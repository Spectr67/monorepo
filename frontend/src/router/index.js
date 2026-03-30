import { createRouter, createWebHistory } from 'vue-router'
import PageMain from '@/pages/PageMain.vue'
import PageCars from '@/pages/PageCars.vue'

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
