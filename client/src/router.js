import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/profile',
            name: 'Profile',
            component: () => import('./views/Profile.vue')
        },
        {
            path: '/notfound',
            name: 'NotFound',
            component: () => import('./views/NotFound.vue')
        },
        {
            path: '**',
            redirect: '/notfound'
        }
    ]
})