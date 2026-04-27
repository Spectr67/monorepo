import { createRouter, createWebHistory } from 'vue-router'
import PageMain from '../pages/PageWelcome.vue'
import PageCars from '@/pages/PageCars.vue'
import PageBybit from '@/pages/PageBybit.vue'
import PageMexc from '@/pages/PageMexc.vue'
import PageChart from '@/pages/PageChart.vue'
import PageCoins from '@/pages/PageCoins.vue'
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
    component: PageBybit,
  },
  {
    path: '/mexc',
    component: PageMexc,
  },
  {
    path: '/chart',
    component: PageChart,
  },
  {
    path: '/coins',
    component: PageCoins,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
