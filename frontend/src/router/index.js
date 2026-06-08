import { createRouter, createWebHistory } from 'vue-router'
import PageMain from '../pages/PageWelcome.vue'
import PageCars from '@/pages/PageCars.vue'
import PageChart from '@/pages/PageChart.vue'
import PageCoins from '@/pages/PageCoins.vue'
import PageBitcoin from '@/pages/PageBitcoin.vue'
import PageCharts from '@/pages/PageCharts.vue'
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
    path: '/chart',
    component: PageChart,
  },
  {
    path: '/coins',
    component: PageCoins,
  },
  {
    path: '/bitcoin',
    component: PageBitcoin,
  },
  {
    path: '/pageCharts',
    component: PageCharts,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
