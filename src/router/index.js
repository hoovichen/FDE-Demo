import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      en: {
        title: 'Home - FireDragon',
        description: 'Welcome to FireDragon, the best sauce products website.'
      },
      zh: {
        title: '首页 - 火龙企业',
        description: '欢迎来到火龙企业，最佳酱料产品网站。'
      }
    },
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      en: {
        title: 'About Us - FireDragon',
        description: 'Learn about FireDragon Enterprise.'
      },
      zh: {
        title: '关于我们 - 火龙企业',
        description: '了解火龙企业。'
      }
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/product',
    name: 'product',
    meta: {
      en: {
        title: 'Products - FireDragon',
        description: 'Explore our premium sauce products.'
      },
      zh: {
        title: '产品 - 火龙企业',
        description: '探索我们的优质酱料产品。'
      }
    },
    component: () => import('@/views/ProductView.vue')
  },
  {
    path: '/faq',
    name: 'faq',
    meta: {
      en: {
        title: 'FAQ - FireDragon',
        description: 'Frequently asked questions about our products.'
      },
      zh: {
        title: '常见问题 - 火龙企业',
        description: '关于我们产品的常见问题解答。'
      }
    },
    component: () => import('@/views/FAQView.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    meta: {
      en: {
        title: 'Contact Us - FireDragon',
        description: 'Get in touch with FireDragon Enterprise.'
      },
      zh: {
        title: '联系我们 - 火龙企业',
        description: '联系火龙企业。'
      }
    },
    component: () => import('@/views/ContactView.vue')
  },
  {
    path: '/stories',
    name: 'stories',
    meta: {
      en: {
        title: 'Brand Story - FireDragon',
        description: 'Learn about FireDragon\'s history and values.'
      },
      zh: {
        title: '品牌故事 - 火龙企业',
        description: '了解火龙企业的历史和价值观。'
      }
    },
    component: () => import('@/views/StoriesView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    meta: {
      en: {
        title: '404 Not Found - FireDragon',
        description: 'Page not found.'
      },
      zh: {
        title: '404 页面未找到 - 火龙企业',
        description: '页面未找到。'
      }
    },
    component: () => import('@/views/NotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
