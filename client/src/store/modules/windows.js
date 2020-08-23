export default {
    actions: {},
    mutations: {
        setAlert(state, alert) {
            const allAlerts = [...state.alerts]
            const alertId = Date.now()
            allAlerts.unshift({ ...alert, id: alertId, expires: alertId + 6000 })
            state.alerts = allAlerts.filter(alert => alert.expires > Date.now())
        },
        showAboutWindow(state, show) {
            state.aboutWindow = show
        },
        showAuthWindow(state, show) {
            state.authWindow = show
        },
        showChangePassWindow(state, show) {
            state.changePassWindow = show
        },
        showDeleteAccWindow(state, show) {
            state.deleteAccWindow = show
        },
        showFilterWindow(state, show) {
            state.filterWindow = show
        },
        showRecipeWindow(state, show) {
            state.recipeWindow = show
        }
    },
    state: {
        aboutWindow: false,
        alerts: [],
        authWindow: false,
        changePassWindow: false,
        deleteAccWindow: false,
        filterWindow: false,
        recipeWindow: false
    },
    getters: {
        aboutWindow(state) {
            return state.aboutWindow
        },
        alerts(state) {
            return state.alerts
        },
        authWindow(state) {
            return state.authWindow
        },
        changePassWindow(state) {
            return state.changePassWindow
        },
        deleteAccWindow(state) {
            return state.deleteAccWindow
        },
        filterWindow(state) {
            return state.filterWindow
        },
        recipeWindow(state) {
            return state.recipeWindow
        }
    }
}