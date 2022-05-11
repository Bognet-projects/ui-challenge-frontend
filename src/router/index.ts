import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import HomePage from '../pages/Home.vue'
import RegisterPage from '../pages/Register.vue'
import store from "@/store";
import LoginPage from "@/pages/Login.vue";
import UsersPage from "@/pages/Users.vue";
import ProfilePage from "@/pages/Profile.vue";
import ArticlePage from "@/pages/Article.vue";

Vue.use(VueRouter)

declare module 'vue-router' {
    interface RouteMeta {
        requiresAuth: boolean,
        title?: string
    }
}

const routes: Array<RouteConfig> = [
    {
        path: '/articles',
        name: 'home',
        component: HomePage,
        meta: {requiresAuth: false, title: "Home"}
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
        path: '/users',
        name: 'users',
        component: UsersPage,
        meta: {requiresAuth: true, title: "Users List"}
    },
    {
        path: '/profile',
        name: 'profile',
        component: ProfilePage,
        meta: {requiresAuth: true, title: "My Profile"}
    },
    {
        path: '/article/:id',
        name: 'article',
        component: ArticlePage,
        meta: {requiresAuth: false}
    },
    {
        path: '/*',
        redirect: '/articles'
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
