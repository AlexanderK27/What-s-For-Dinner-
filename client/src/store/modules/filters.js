export default {
    actions: {
        removeFilter(ctx, {group, name}) {
            const filters = {
                ...ctx.state.selectedFilters,
                [group]: ctx.state.selectedFilters[group].filter(item => item.name !== name)
            }

            ctx.commit('setSelectedFilters', filters)

            switch(group) {
                case 'cuisines': {
                    const cuisines = ctx.state.cuisines
                        .map(item => item.name === name ? { ...item, checked: false } : item)
                    return ctx.commit('setCuisines', cuisines)}
                case 'diets': {
                    const diets = ctx.state.diets
                        .map(item => item.name === name ? { ...item, checked: false } : item)
                    return ctx.commit('setDiets', diets)}
                case 'intolerances': {
                    const intolerances = ctx.state.intolerances
                        .map(item => item.name === name ? { ...item, checked: false } : item)
                    return ctx.commit('setIntolerances', intolerances)}
                default:
                    return 
            }
        }
    },
    mutations: {
        setCuisines(state, cuisines) {
            state.cuisines = cuisines
        },
        setDiets(state, diets) {
            state.diets = diets
        },
        setIntolerances(state, intolerances) {
            state.intolerances = intolerances
        },
        setSelectedFilters(state, filters) {
            state.selectedFilters = filters
        }
    },
    state: {
        selectedFilters: {
            cuisines: [],
            diets: [],
            intolerances: []
        },
        cuisines: [
            {name: 'African', checked: false},{name: 'American', checked: false},
            {name: 'British', checked: false},{name: 'Cajun', checked: false},
            {name: 'Caribbean', checked: false},{name: 'Chinese', checked: false},
            {name: 'Eastern European', checked: false},{name: 'European', checked: false},
            {name: 'French', checked: false},{name: 'German', checked: false},
            {name: 'Greek', checked: false},{name: 'Indian', checked: false},
            {name: 'Irish', checked: false},{name: 'Italian', checked: false},
            {name: 'Japanese', checked: false},{name: 'Jewish', checked: false},
            {name: 'Korean', checked: false},{name: 'Latin American', checked: false},
            {name: 'Mediterranean', checked: false},{name: 'Mexican', checked: false},
            {name: 'Middle Eastern', checked: false},{name: 'Nordic', checked: false},
            {name: 'Southern', checked: false},{name: 'Spanish', checked: false},
            {name: 'Thai', checked: false},{name: 'Vietnamese', checked: false}
        ],
        diets: [
            {name: 'Gluten Free', checked: false},{name: 'Ketogenic', checked: false},
            {name: 'Vegetarian', checked: false},{name: 'Lacto-Vegetarian', checked: false},
            {name: 'Ovo-Vegetarian', checked: false},{name: 'Vegan', checked: false},
            {name: 'Pescetarian', checked: false},{name: 'Paleo', checked: false},
            {name: 'Primal', checked: false},{name: 'Whole30', checked: false}
        ],
        excludeIngredients: [],
        intolerances: [
            {name: 'Dairy', checked: false},{name: 'Egg', checked: false},
            {name: 'Gluten', checked: false},{name: 'Grain', checked: false},
            {name: 'Peanut', checked: false},{name: 'Seafood', checked: false},
            {name: 'Sesame', checked: false},{name: 'Shellfish', checked: false},
            {name: 'Soy', checked: false},{name: 'Sulfite', checked: false},
            {name: 'Tree Nut', checked: false},{name: 'Wheat', checked: false}
        ]
    },
    getters: {
        stdFilters(state) {
            return {
                cuisines: state.cuisines,
                diets: state.diets,
                intolerances: state.intolerances
            }
        },
        selectedFilters(state) {
            return state.selectedFilters
        }
    }
}