import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BusquedaView from '../views/BusquedaView.vue'
import ProductoView from '@/views/ProductoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
//      path: '/items?search=:search',
      path: '/search',
      name: 'search',
      component: BusquedaView
    },
    {
      path: '/producto/:id', 
      name: 'producto',
      component: ProductoView
    }
  ]
})

export default router
