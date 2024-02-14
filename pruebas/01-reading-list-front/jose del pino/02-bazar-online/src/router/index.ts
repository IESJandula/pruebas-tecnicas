import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
/* import Search from '../views/Search.vue' */

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    /* {
//      path: '/items?search=:search',
      path: '/search',
      name: 'search',
      component: SearchView
    }, */
    /* {
      path: '/',
      name: 'home',
      component: HomeView
    } */
  ]
})

export default router
