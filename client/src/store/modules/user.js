import router from '../../router';

const hostname = window.location.hostname === 'localhost' ? 'localhost:8080' : window.location.hostname
export default {
    actions: {
        async registrateNewUser(ctx, credentials) {
            try {
                const response = await fetch(`${window.location.protocol}//${hostname}/api/auth/registrate`, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: {'Content-Type': 'application/json'}
                })
                const data = await response.json()

                if (!response.ok) {
                    throw new Error(data.message)
                }
                
                ctx.commit('setUser', data.user.username)
                ctx.commit('setToken', data.token)
                ctx.commit('setTokenExpireTime', data.tokenExpires)
                router.push('/profile');
                ctx.commit('setAlert', {
                    type: 'success',
                    message: 'Welcome aboard!'
                })
            } catch (e) {
                ctx.commit('setAlert', {
                    type: 'danger',
                    message: e
                })
            }
        },
        async login(ctx, credentials) {
            try {
                const response = await fetch(`${window.location.protocol}//${hostname}/api/auth/login`, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: {'Content-Type': 'application/json'}
                })
                const data = await response.json()

                if (!response.ok) {
                    throw new Error(data.message)
                }
                
                ctx.commit('setUser', data.user.username)
                ctx.commit('setToken', data.token)
                ctx.commit('setTokenExpireTime', data.tokenExpires)
                router.push('/profile');
            } catch (e) {
                ctx.commit('setAlert', {
                    type: 'danger',
                    message: e
                })
            }
        },
        async logout(ctx) {
            ctx.commit('setIsAuthenticated', false)
            window.localStorage.removeItem('token')
            window.localStorage.removeItem('expiresIn')
            window.localStorage.removeItem('username')
            router.push('/')
        },
        async deleteAccount(ctx, password) {
            try {
                const response = await fetch(`${window.location.protocol}//${hostname}/api/user/me`, {
                    method: 'DELETE',
                    body: JSON.stringify({ password }),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${ctx.getters.token}`
                    }
                })
                const data = await response.json()               

                if (!response.ok) {
                    throw new Error(data.message)
                }

                ctx.commit('setAlert', {
                    type: 'success',
                    message: data.message
                })

                ctx.commit('showDeleteAccWindow', false)
                await ctx.dispatch('logout')
            } catch (e) {
                ctx.commit('setAlert', {
                    type: 'danger',
                    message: e
                })
            }
        },
        async updatePassword(ctx, passwords) {
            try {
                const response = await fetch(`${window.location.protocol}//${hostname}/api/user/me`, {
                    method: 'PATCH',
                    body: JSON.stringify({ ...passwords }),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${ctx.getters.token}`
                    }
                })
                const data = await response.json()               

                if (!response.ok) {
                    throw new Error(data.message)
                }

                ctx.commit('setAlert', {
                    type: 'success',
                    message: data.message
                })
                ctx.commit('showChangePassWindow', false)
            } catch (e) {
                ctx.commit('setAlert', {
                    type: 'danger',
                    message: e
                })
            }
        }
    },
    mutations: {
        setUser(state, user) {
            if (user) {
                window.localStorage.setItem('username', user)
            } else {
                window.localStorage.removeItem('username')
            }
            state.user = user
        },
        setToken(state, token) {
            if (token) {
                window.localStorage.setItem('token', token)
            } else {
                window.localStorage.removeItem('token')
            }
            state.token = token
        },
        setTokenExpireTime(state, time) {
            if (time) {
                window.localStorage.setItem('expiresIn', time)
            } else {
                window.localStorage.removeItem('expiresIn')
            }
            state.tokenExpires = time
        },
        setIsAuthenticated(state, isAuthed) {
            state.isAuthenticated = isAuthed
        },
        setSavedRecipes(state, recipes) {
            state.savedRecipes = recipes
        },
        setSavedRecipesIds(state, recipesIds) {
            state.savedRecipesIds = recipesIds
        }
    },
    state: {
        user: window.localStorage.getItem('username'),
        token: window.localStorage.getItem('token'),
        tokenExpires: window.localStorage.getItem('expiresIn'),
        isAuthenticated: false,
        savedRecipes: [],
        savedRecipesIds: []
    },
    getters: {
        user(state) {
            return state.user
        },
        token(state) {
            return state.token
        },
        tokenExpires(state) {
            return state.tokenExpires
        },
        isAuthenticated(state) {
            return state.isAuthenticated
        },
        savedRecipes(state) {
            return state.savedRecipes
        },
        savedRecipesIds(state) {
            return state.savedRecipesIds
        }
    }
}