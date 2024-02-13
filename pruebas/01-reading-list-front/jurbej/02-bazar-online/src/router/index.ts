import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SearchResultsView from '../views/SearchResultsView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/products',
      name: 'searchResults',
      component: SearchResultsView,
      props: (route) => ({ search: route.query.search })
    },
    {
      path: '/products/:id',
      name: 'productDetail',
      component: ProductDetailView,
      props: true
    }
  ]
})

export default router
