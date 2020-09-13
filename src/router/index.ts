import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Home from '../views/Home.vue'
import rule from "@/router/rule";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            auth: false
        }
    },
    {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
        meta: {
            auth: false
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/system/Login.vue'),
        meta: {
            auth: false
        }
    },
    {
        path: '/index',
        name: 'Index',
        component: () => import('../views/Index.vue'),
        meta: {
            auth: true
        }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

rule(router)
export default router
