export default {
    actions: {

    },
    mutations: {
        showFilterWindow(state, show) {
            state.filterWindow = show
        },
        showRecipeWindow(state, show) {
            state.recipeWindow = show
        },
    },
    state: {
        filterWindow: false,
        recipeWindow: false,
    },
    getters: {
        filterWindow(state) {
            return state.filterWindow
        },
        recipeWindow(state) {
            return state.recipeWindow
        },
    }
}