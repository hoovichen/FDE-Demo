import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { title: 'Home Page' },
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    meta: { title: 'About Page' },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/product',
    name: 'product',
    meta: { title: 'Product Detail Page' },
    component: () => import('@/views/ProductView.vue')
  },
  {
    path: '/faq',
    name: 'faq',
    meta: { title: 'FAQ Page' },
    component: () => import('@/views/FAQView.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    meta: { title: 'Contact Page' },
    component: () => import('@/views/ContactView.vue')
  },
  {
    path: '/stories',
    name: 'stories',
    meta: { title: 'Stories Page' },
    component: () => import('@/views/StoriesView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
