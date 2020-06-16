const hostname = window.location.hostname === 'localhost' ? 'localhost:8080' : window.location.hostname
export default {
    actions: {
        async fetchRecipes(ctx, text) {
            ctx.commit('setLoading', true)

            if (ctx.state.message) {
                ctx.commit('setMessage', null)
            } 
            
            if (ctx.state.recipes.length) {
                ctx.commit('updateRecipes', [])
            }

            let filters = ctx.getters.selectedFilters
            const cuisines = filters.cuisines.map(item => item.name)
            const diets = filters.diets.map(item => item.name)
            const intolerances = filters.intolerances.map(item => item.name)
            filters = JSON.stringify({ cuisines, diets, intolerances })

            try {
                const response = await fetch(`${window.location.protocol}//${hostname}/api/recipes/search?title=${text}&filters=${filters}`)
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
        },
        async fetchOneRecipe(ctx, id) {
            ctx.commit('showRecipeWindow', true)
            ctx.commit('setLoading', true)

            try {
                const response = await fetch(`${window.location.protocol}//${hostname}/api/recipes/${id}`)
                const recipe = await response.json()
                
                console.log(recipe)

                ctx.commit('setRecipe', recipe)
            } catch (e) {
                // ctx.commit('setError', e.error)
            }

            ctx.commit('setLoading', false)
        }
    },
    mutations: {
        updateRecipes(state, recipes) {
            state.recipes = recipes
        },
        setRecipe(state, recipe) {
            state.recipe = recipe
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
        recipe: null,
        message: null,
        loading: false
    },
    getters: {
        allRecipes(state) {
            return state.recipes
        },
        recipe(state) {
            return state.recipe
        },
        message(state) {
            return state.message
        },
        loading(state) {
            return state.loading
        }
    }
}