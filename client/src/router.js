import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import store from './store';
import { getCookie, deleteCookie } from './functions/handleCookies'

Vue.use(Router)

const router = new Router({
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
            component: () => import('./views/Profile.vue'),
            beforeEnter: (to, from, next) => {
                let user = getCookie('user')
                if (user) {
                    user = JSON.parse(user)
                    deleteCookie('user')
                    store.commit('setToken', user.token)
                    store.commit('setTokenExpireTime', user.tokenExpires)
                    store.commit('setUser', user.user.username)
                    store.commit('setProvider', user.user.provider)
                    store.commit('setIsAuthenticated', true)
                }

                const token = window.localStorage.getItem('token')
                const expiresIn = window.localStorage.getItem('expiresIn')
                const timeNow = Date.now()

                if(token && expiresIn) {
                    +expiresIn > timeNow ? next() : next({ name: 'Home' })
                } else {
                    next({ name: 'Home' })
                }
            }
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

router.beforeEach((to, from, next) => {
    const token = window.localStorage.getItem('token')
    const expiresIn = window.localStorage.getItem('expiresIn')
    const timeNow = Date.now()
    
    if (token && expiresIn) {
        if (+expiresIn <= timeNow) {
            store.dispatch('logout')
            store.commit('setAlert', {
                type: 'warning',
                message: 'Please authorize'
            })
        } else {
            store.commit('setIsAuthenticated', true)
        }
    } else if (store.state.user.isAuthenticated) {
        store.commit('setIsAuthenticated', false)
    }

    next()
})

export default router