/* ****************************************************************
*************************** ROUTING *******************************
*******************************************************************

Here it is set the routes for the links in the HEADER page.*/

import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/News/user',
    name: 'NewsClient',
    component: () => import(/* webpackChunkName: "about" */ '../views/NewsClient.vue')
  },
  {
    path: '/News/admin',
    name: 'NewsAdmin',
    component: () => import(/* webpackChunkName: "about" */ '../views/NewsAdmin.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
