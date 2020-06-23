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
        },
        showDeleteAccWindow(state, show) {
            state.deleteAccWindow = show
        },
        showChangePassWindow(state, show) {
            state.changePassWindow = show
        },
        setAlert(state, alert) {
            const allAlerts = [...state.alerts]
            const alertId = Date.now()
            allAlerts.unshift({ ...alert, id: alertId, expires: alertId + 6000 })
            state.alerts = allAlerts.filter(alert => alert.expires > Date.now())
        }
    },
    state: {
        filterWindow: false,
        recipeWindow: false,
        authWindow: false,
        deleteAccWindow: false,
        changePassWindow: false,
        alerts: []
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
        },
        deleteAccWindow(state) {
            return state.deleteAccWindow
        },
        changePassWindow(state) {
            return state.changePassWindow
        },
        alerts(state) {
            return state.alerts
        }
    }
}