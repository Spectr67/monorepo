import { createRouter, createWebHistory } from 'vue-router'
import PageMain from '../pages/PageMain.vue'
import PageCars from '../pages/Cars/PageCars.vue'
import Bybitpage from '../pages/Bybit/Bybitpage.vue'
import MexcPage from '@/pages/Mexc/MexcPage.vue'
const routes = [
  {
    path: '/',
    component: PageMain,
  },
  {
    path: '/cars',
    component: PageCars,
  },
  {
    path: '/bybit',
    component: Bybitpage,
  },
  {
    path: '/mexc',
    component: MexcPage,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
