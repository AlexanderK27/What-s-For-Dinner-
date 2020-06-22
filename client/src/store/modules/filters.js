export default {
    actions: {
        removeFilter(ctx, {group, name}) {
            const filters = {
                ...ctx.state.selectedFilters,
                [group]: ctx.state.selectedFilters[group].filter(item => item.name !== name)
            }

            ctx.commit('setSelectedFilters', filters)
        }
    },
    mutations: {
        setSearchType(state, type) {
            state.searchType = type
        },
        setSelectedFilters(state, filters) {
            state.selectedFilters = filters
        },
        setUsersIngredients(state, ingredients) {
            state.usersIngredients = ingredients
        },
        removeUsersIngredient(state, ingredient) {
            state.usersIngredients = state.usersIngredients.filter(ing => ing !== ingredient)
        }
    },
    state: {
        searchType: 'word',
        selectedFilters: {
            cuisines: [],
            diets: [],
            intolerances: []
        },
        usersIngredients: []
    },
    getters: {
        searchType(state) {
            return state.searchType
        },
        selectedFilters(state) {
            return state.selectedFilters
        },
        usersIngredients(state) {
            return state.usersIngredients
        }
    }
}