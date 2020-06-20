import { Error } from "mongoose"

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
                
                ctx.commit('changePageNumber', 1)
                ctx.commit('updateRecipes', recipes.results)
            } catch (e) {
                console.log(e)
            }

            ctx.commit('setLoading', false)
        },
        async fetchRecipesByIngredients(ctx, ingredients) {
            ctx.commit('setLoading', true)

            if (ctx.state.message) {
                ctx.commit('setMessage', null)
            } 
            
            if (ctx.state.recipes.length) {
                ctx.commit('updateRecipes', [])
            }

            const usersIngredients = JSON.stringify(ingredients)

            try {
                const response = await fetch(`${window.location.protocol}//${hostname}/api/recipes/searchByIngredients?ing=${usersIngredients}`)
                const recipes = await response.json()
                console.log(recipes)

                if (recipes.message) {
                    return (
                        ctx.commit('setMessage', recipes.message),
                        ctx.commit('setLoading', false)
                    )
                }
                
                ctx.commit('changePageNumber', 1)
                ctx.commit('updateRecipes', recipes)
            } catch (e) {
                console.log(e)
            }

            ctx.commit('setLoading', false)
        },
        async fetchOneRecipe(ctx, recipeId) {
            ctx.commit('setLoading', true)

            try {
                const response = await fetch(`${window.location.protocol}//${hostname}/api/recipes/${recipeId}`)
                const recipe = await response.json()
                
                if (!response.ok || recipe.message) {
                    ctx.commit('setMessage', recipe.message),
                    ctx.commit('setLoading', false)
                    throw new Error(recipe.message || 'Something went wrong')
                }

                ctx.commit('setRecipe', recipe)
            } catch (e) {
                console.log(e)
                // ctx.commit('setError', e.error)
            }

            ctx.commit('setLoading', false)
        },
        async saveRecipe(ctx, recipeId) {
            try {
                console.time('save')
                if (!ctx.getters.isAuthenticated) {
                    return console.log('Please authorize')
                }
    
                const savedRecipesIds = ctx.getters.savedRecipesIds
                ctx.commit('setSavedRecipesIds', savedRecipesIds.concat([recipeId]))

                await ctx.dispatch('fetchOneRecipe', recipeId)
                const recipe = ctx.state.recipe

                if(!recipe) {
                    throw new Error('Server error, could not save the recipe')
                }

                const parsedRecipe = { 
                    id: recipe.id, 
                    image: recipe.image, 
                    readyInMinutes: recipe.readyInMinutes, 
                    servings: recipe.servings, 
                    title: recipe.title, 
                    diets: recipe.diets, 
                    cuisines: recipe.cuisines,
                    dishTypes: recipe.dishTypes, 
                    extendedIngredients: recipe.extendedIngredients, 
                    analyzedInstructions: recipe.analyzedInstructions 
                }
    
                const response = await fetch(`${window.location.protocol}//${hostname}/api/user/recipe`, {
                    method: 'POST',
                    body: JSON.stringify({recipe: parsedRecipe}),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${ctx.getters.token}`
                    }
                })
                const data = await response.json()
    
                if (!response.ok) {
                    throw new Error(data.message || 'Something went wrong')
                }
                
                const savedRecipes = ctx.getters.savedRecipes
                ctx.commit('setSavedRecipes', savedRecipes.concat([parsedRecipe]))
                console.log(data.message)
                console.timeEnd('save')
            } catch (e) {
                const savedRecipesIds = ctx.getters.savedRecipesIds
                ctx.commit('setSavedRecipesIds', savedRecipesIds.filter(id => id !== recipeId))
                console.log(e, e.message)
            }
        },
        async deleteRecipe(ctx, recipeId) {
            try {
                if (!ctx.getters.isAuthenticated) {
                    return console.log('Please authorize')
                }

                const savedRecipesIds = ctx.getters.savedRecipesIds
                ctx.commit('setSavedRecipesIds', savedRecipesIds.filter(id => id !== recipeId))

                const response = await fetch(`${window.location.protocol}//${hostname}/api/user/recipe`, {
                    method: 'DELETE',
                    body: JSON.stringify({ id: recipeId }),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${ctx.getters.token}`
                    }
                })
                const data = await response.json()

                if (!response.ok) {
                    throw new Error(data.message || 'Something went wrong')
                }

                const savedRecipes = ctx.getters.savedRecipes
                ctx.commit('setSavedRecipes', savedRecipes.filter(recipe => recipe.id !== recipeId))
                console.log(data.message)
            } catch (e) {
                const savedRecipesIds = ctx.getters.savedRecipesIds
                ctx.commit('setSavedRecipesIds', savedRecipesIds.concat([recipeId]))
                console.log(e, e.message)
            }
        },
        async fetchSavedRecipes(ctx) {
            ctx.commit('setLoading', true)
            try {
                const response = await fetch(`${window.location.protocol}//${hostname}/api/user/me/recipes`, {
                    method: 'GET',
                    body: null,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${ctx.getters.token}`
                    }
                })
                const resipes = await response.json()

                if (!response.ok) {
                    throw new Error(response)
                }
                console.log(resipes)
                ctx.commit('setSavedRecipes', resipes)
            } catch (e) {
                console.log(e)
            }
            ctx.commit('setLoading', false)
        }
    },
    mutations: {
        updateRecipes(state, recipes) {
            const pages = []
            const amountOnPage = state.recipesOnPage || 10
            
            for (let recipeIdx = 0; recipeIdx < recipes.length; recipeIdx = recipeIdx + amountOnPage) {
                pages.push(recipes.slice(recipeIdx, recipeIdx + amountOnPage))
            }
            
            state.recipes = pages
        },
        changePageNumber(state, number) {
            state.pageNumber = number
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
        recipesOnPage: 10,
        pageNumber: 1,
        recipe: null,
        message: null,
        loading: false
    },
    getters: {
        allRecipes(state) {
            return state.recipes
        },
        pageNumber(state) {
            return state.pageNumber
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