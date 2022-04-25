import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import HomePage from '../pages/Home.vue'
import RegisterPage from '../pages/Register.vue'
import store from "@/store";
import LoginPage from "@/pages/Login.vue";

Vue.use(VueRouter)

declare module 'vue-router' {
    interface RouteMeta {
        requiresAuth: boolean,
        title?: string
    }
}

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'home',
        component: HomePage,
        meta: {requiresAuth: true, title: "Home"}
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterPage,
        meta: {requiresAuth: false, title: "Register"},
        beforeEnter(to, from, next){
            if (store.getters.isAuth){
                next({name: "home"})
            }else{
                next()
            }
        }
    },
    {
        path: '/login',
        name: 'login',
        component: LoginPage,
        meta: {requiresAuth: false, title: "Login"},
        beforeEnter(to, from, next){
            if (store.getters.isAuth){
                next({name: "home"})
            }else{
                next()
            }
        }
    },
    {
        path: '/*',
        redirect: '/'
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
