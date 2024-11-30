
/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import HomeView from '../pages/Home.vue'
import { components } from 'vuetify/dist/vuetify-labs.js'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/user',
    children: [
      {
        path: 'wishlist',
        name: 'Wishlist',
        component: () => import('@/pages/Wishlist.vue'),
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('@/pages/Cart.vue'),
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('@/pages/Orders.vue'),
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/pages/About.vue'),
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/pages/Contact.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/pages/Registration.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/Login.vue'),
  },
  {
    path: '/shop/:cat',
    name: 'Shop',
    component: () => import('@/pages/ShopPage.vue'),
  },

  {
    path: '/admin',
    children: [
      {
        name: 'Admin',
        path: '',
        component: () => import('@/pages/admin/Dashboard.vue'),
      }, {
        path: 'crud',
        name: 'Crud',
        component: () => import('@/pages/admin/Crud.vue'),
      },
      {
        path : 'category',
        name: 'Category',
        component: () => import('@/pages/admin/Category.vue'),

      }
    ]
  }

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
