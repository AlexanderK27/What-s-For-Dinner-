import router from '../../router';

const hostname = window.location.hostname === 'localhost' ? 'localhost:8080' : window.location.hostname
export default {
    actions: {
        async registrateNewUser(ctx, credentials) {
            // ctx.commit('setLoading', true)
            try {
                const response = await fetch(`${window.location.protocol}//${hostname}/api/auth/registrate`, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: {'Content-Type': 'application/json'}
                })
                const data = await response.json()
                console.log(data)
                if (data.message) {
                    return (
                        ctx.commit('setMessage', data.message)
                        // ctx.commit('setLoading', false)
                    )
                }
                
                ctx.commit('setUser', data.user)
                ctx.commit('setToken', data.token)
                ctx.commit('setTokenExpireTime', data.tokenExpires)
                router.push('/profile');
            } catch (e) {
                console.log(e)
            }

            // ctx.commit('setLoading', false)
        },
        async login(ctx, credentials) {
            // ctx.commit('setLoading', true)
            try {
                const response = await fetch(`${window.location.protocol}//${hostname}/api/auth/login`, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: {'Content-Type': 'application/json'}
                })
                const data = await response.json()
                console.log(data)
                if (data.message) {
                    return (
                        ctx.commit('setMessage', data.message)
                        // ctx.commit('setLoading', false)
                    )
                }
                
                ctx.commit('setUser', data.user)
                ctx.commit('setToken', data.token)
                ctx.commit('setTokenExpireTime', data.tokenExpires)
                router.push('/profile');
            } catch (e) {
                console.log(e)
            }

            // ctx.commit('setLoading', false)
        }
    },
    mutations: {
        setUser(state, user) {
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
        user: null,
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