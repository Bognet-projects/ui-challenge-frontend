import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomePage from '../pages/Home.vue'
import RegisterPage from '../pages/Register.vue'
import store from "@/store";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next)=>{
  store.dispatch("loadTokenFormSession").then(()=>{next()})
})

export default router
