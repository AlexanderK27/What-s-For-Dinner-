import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import store from './store';

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
            store.commit('setIsAuthenticated', false)
            window.localStorage.removeItem('token')
            window.localStorage.removeItem('expiresIn')
        } else {
            store.commit('setIsAuthenticated', true)
        }
    } else if (store.state.user.isAuthenticated) {
        store.commit('setIsAuthenticated', false)
    }

    next()
})

export default router