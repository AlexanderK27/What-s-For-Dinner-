import { Error } from "mongoose"

const hostname = window.location.hostname === 'localhost' ? 'localhost:8080' : window.location.hostname
export default {
    actions: {
        async fetchRecipes(ctx, text) {
            ctx.commit('setLoading', true)
            
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
                const data = await response.json()

                if (!response.ok) {
                    if (response.status >= 500) {
                        throw new Error(data.message)
                    } else {
                        return (
                            ctx.commit('setAlert', {
                                type: 'neutral',
                                message: data.message
                            }),
                            ctx.commit('setLoading', false)
                        )
                    }
                }
                
                ctx.commit('changePageNumber', 1)
                ctx.commit('updateRecipes', data.results)
            } catch (e) {
                ctx.commit('setAlert', {
                    type: 'danger',
                    message: e
                })
            }

            ctx.commit('setLoading', false)
        },
        async fetchRecipesByIngredients(ctx, ingredients) {
            ctx.commit('setLoading', true)
            
            if (ctx.state.recipes.length) {
                ctx.commit('updateRecipes', [])
            }

            const usersIngredients = JSON.stringify(ingredients)

            try {
                const response = await fetch(`${window.location.protocol}//${hostname}/api/recipes/searchByIngredients?ing=${usersIngredients}`)
                const data = await response.json()

                if (!response.ok) {
                    if (response.status >= 500) {
                        throw new Error(data.message)
                    } else {
                        return (
                            ctx.commit('setAlert', {
                                type: 'neutral',
                                message: data.message
                            }),
                            ctx.commit('setLoading', false)
                        )
                    }
                }
                
                ctx.commit('changePageNumber', 1)
                ctx.commit('updateRecipes', data)
            } catch (e) {
                ctx.commit('setAlert', {
                    type: 'danger',
                    message: e
                })
            }

            ctx.commit('setLoading', false)
        },
        async fetchOneRecipe(ctx, recipeId) {
            ctx.commit('setLoading', true)

            try {
                const response = await fetch(`${window.location.protocol}//${hostname}/api/recipes/${recipeId}`)
                const data = await response.json()
                
                if (!response.ok) {
                    if (response.status >= 500) {
                        throw new Error(data.message)
                    } else {
                        return (
                            ctx.commit('setAlert', {
                                type: 'neutral',
                                message: data.message
                            }),
                            ctx.commit('setLoading', false)
                        )
                    }
                }

                ctx.commit('setRecipe', data)
            } catch (e) {
                ctx.commit('setAlert', {
                    type: 'danger',
                    message: e
                })
            }

            ctx.commit('setLoading', false)
        },
        async saveRecipe(ctx, recipeId) {
            try {
                if (!ctx.getters.isAuthenticated) {
                    return ctx.commit('setAlert', {
                        type: 'warning',
                        message: 'Authorize to save recipes'
                    })
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
            } catch (e) {
                const savedRecipesIds = ctx.getters.savedRecipesIds
                ctx.commit('setSavedRecipesIds', savedRecipesIds.filter(id => id !== recipeId))
                ctx.commit('setAlert', {
                    type: 'danger',
                    message: e
                })
            }
        },
        async deleteRecipe(ctx, recipeId) {
            try {
                if (!ctx.getters.isAuthenticated) {
                    return ctx.commit('setAlert', {
                        type: 'warning',
                        message: 'Please authorize'
                    })
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
            } catch (e) {
                const savedRecipesIds = ctx.getters.savedRecipesIds
                ctx.commit('setSavedRecipesIds', savedRecipesIds.concat([recipeId]))
                ctx.commit('setAlert', {
                    type: 'danger',
                    message: e
                })
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
                const data = await response.json()

                if (!response.ok) {
                    throw new Error(data.message || 'Something went wrong')
                }

                const savedRecipesIds = data.map(recipe => recipe.id)
                console.log(savedRecipesIds)
                ctx.commit('setSavedRecipesIds', savedRecipesIds)
                ctx.commit('setSavedRecipes', data)
            } catch (e) {
                ctx.commit('setAlert', {
                    type: 'danger',
                    message: e
                })
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
        setLoading(state, loading) {
            state.loading = loading
        }
    },
    state: {
        recipes: [],
        recipesOnPage: 10,
        pageNumber: 1,
        recipe: null,
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
        loading(state) {
            return state.loading
        }
    }
}