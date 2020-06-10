const hostname = window.location.hostname === 'localhost' ? 'localhost:8080' : window.location.hostname
export default {
    actions: {
        async fetchRecipes(ctx, text) {
            ctx.commit('setLoading', true)

            if (ctx.state.message) {
                ctx.commit('setMessage', false)
            } 
            
            if (ctx.state.recipes.length) {
                ctx.commit('updateRecipes', [])
            }

            try {
                const response = await fetch(`${window.location.protocol}//${hostname}/api/recipes/search?title=${text}`)
                const recipes = await response.json()

                if (recipes.message) {
                    return (
                        ctx.commit('setMessage', recipes.message),
                        ctx.commit('setLoading', false)
                    )
                }
                
                ctx.commit('updateRecipes', recipes.results)
            } catch (e) {
                console.log(e)
            }

            ctx.commit('setLoading', false)
        }
    },
    mutations: {
        updateRecipes(state, recipes) {
            state.recipes = recipes
        },
        setMessage(state, message) {
            state.message = message
        },
        setLoading(state, loading) {
            state.loading = loading
        }
    },
    state: {
        recipes: [],
        message: false,
        loading: false
    },
    getters: {
        allRecipes(state) {
            return state.recipes
        },
        message(state) {
            return state.message
        },
        loading(state) {
            return state.loading
        }
    }
}