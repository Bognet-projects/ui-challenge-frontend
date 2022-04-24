import Vue from 'vue'
import VueRouter, {Route, RouteConfig, RouteMeta} from 'vue-router'
import HomePage from '../pages/Home.vue'
import RegisterPage from '../pages/Register.vue'
import store from "@/store";
import LoginPage from "@/pages/Login.vue";

Vue.use(VueRouter)

declare module 'vue-router' {
    interface RouteMeta {
        requiresAuth: boolean
    }
}

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'home',
        component: HomePage,
        meta: {requiresAuth: true}
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterPage,
        meta: {requiresAuth: false}
    },
    {
        path: '/login',
        name: 'login',
        component: LoginPage,
        meta: {requiresAuth: false}
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    store.dispatch("loadTokenFormSession").then(() => {
        if (to.meta && to.meta.requiresAuth && !store.getters.isAuth) {
            next({name: 'login'})
        } else {
            next()
        }
    })
})

export default router
