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
      path: '/profile',
      name: 'profile',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "profile" */ './views/Profile.vue')
    },
    {
      path: '/picture/:id',
      name: 'picture',
      component: () => import(/* webpackChunkName: "picture" */ './views/Picture.vue')
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
