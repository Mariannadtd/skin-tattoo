import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
      path: '/certificates',
      name: 'certificates',
      component: () => import('../views/CertificatesView.vue')
    },
    {
      path: '/booking',
      name: 'booking',
      component: () => import('../views/BookingView.vue')
    },
    {
      path: '/reviews',
      name: 'reviews',
      component: () => import('../views/ReviewsView.vue')
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: () => import('../views/ContactsView.vue')
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
