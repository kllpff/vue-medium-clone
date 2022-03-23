import {createRouter, createWebHashHistory} from 'vue-router'
import GlobalFeed from '@/views/GlobalFeed'
import Register from '@/views/Register'
import Login from '@/views/Login'
import YourFeed from '@/views/YourFeed'

const routes = [
  {
    path: '/',
    name: 'globalFeed',
    component: GlobalFeed,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/settings',
    name: 'settings',
    component: Login,
  },
  {
    path: '/:slug',
    name: 'userProfile',
    component: Login,
  },
  {
    path: '/profiles/:slug/favorites',
    name: 'userProfileFavorites',
    component: Login,
  },
  {
    path: '/feed',
    name: 'yourFeed',
    component: YourFeed,
  },
  {
    path: '/tags/:slug',
    name: 'tag',
    component: GlobalFeed,
  },
  {
    path: '/articles/new',
    name: 'createArticle',
    component: GlobalFeed,
  },
  {
    path: '/articles/:slug',
    name: 'article',
    component: GlobalFeed,
  },
  {
    path: '/articles/:slug/edit',
    name: 'editArticle',
    component: GlobalFeed,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
