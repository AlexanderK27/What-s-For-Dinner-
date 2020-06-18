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
        showAuthWindow(state, show) {
            state.authWindow = show
        }
    },
    state: {
        filterWindow: false,
        recipeWindow: false,
        authWindow: true
    },
    getters: {
        filterWindow(state) {
            return state.filterWindow
        },
        recipeWindow(state) {
            return state.recipeWindow
        },
        authWindow(state) {
            return state.authWindow
        }
    }
}