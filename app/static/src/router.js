import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/picture/:id',
      name: 'picture',
      component: () => import(/* webpackChunkName: "picture" */ './views/Picture.vue')
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import(/* webpackChunkName: "categories" */ './views/Categories.vue')
    },
    {
      path: '/publish',
      name: 'publish',
      component: () => import(/* webpackChunkName: "publish" */ './views/Publish.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/admin/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "adminRegister" */ './views/AdminRegister.vue')
    },

  ]
})
