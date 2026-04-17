import { createRouter, createWebHistory } from 'vue-router'
import PageMain from '../pages/PageWelcome.vue'
// import PageCars from '../pages/Cars/PageCars.vue'
// import Bybitpage from '../pages/PageBybit.vue'
// import MexcPage from '@/pages/PageMexc.vue'
import PageChart from '@/pages/PageChart.vue'
const routes = [
  {
    path: '/',
    component: PageMain,
  },
  // {
  //   path: '/cars',
  //   component: PageCars,
  // },
  // {
  //   path: '/bybit',
  //   component: PageBybit,
  // },
  // {
  //   path: '/mexc',
  //   component: PageMexc,
  // },
  {
    path: '/chart',
    component: PageChart,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
