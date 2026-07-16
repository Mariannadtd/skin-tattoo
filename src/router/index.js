import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/principles',
      name: 'principles',
      component: () => import('../views/PrinciplesView.vue')
    },
    {
      path: '/masters',
      name: 'masters',
      component: () => import('../views/MastersView.vue')
    },
    {
      path: '/works',
      name: 'works',
      component: () => import('../views/WorksView.vue')
    },
    {
      path: '/promo',
      name: 'promo',
      component: () => import('../views/PromoView.vue')
    },
    {
      path: '/booking',
      name: 'booking',
      component: () => import('../views/BookingView.vue')
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
