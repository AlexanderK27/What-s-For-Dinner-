import Vue from 'vue'
import Vuex from 'vuex'
import recipes from './modules/recipes'
import windows from './modules/windows'
import filters from './modules/filters'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        recipes,
        windows,
        filters
    }
})