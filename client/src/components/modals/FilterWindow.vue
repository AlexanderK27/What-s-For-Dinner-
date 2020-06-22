<template>
    <div class="wrapper">
        <AppBackdrop />
        <div class="window">
            <div class="filters">
                <p><i class="material-icons">emoji_flags</i> Cuisines</p>
                <div class="cuisines">
                    <div 
                        v-for="(cuisine, idx) of cuisines"
                        :key="cuisine.name + idx"
                        :class="cuisines[idx].checked ? 'filter-item checked' : 'filter-item'"
                        @click="cuisine.checked = !cuisine.checked"
                    >
                        <p>{{cuisine.name}}</p>
                    </div>
                </div>
                <hr>
                <p><i class="material-icons">eco</i> Diets</p>
                <div class="diets">
                    <div 
                        v-for="(diet, idx) of diets"
                        :key="diet.name + idx"
                        :class="diets[idx].checked ? 'filter-item radio checked' : 'filter-item radio'"
                        @click="setDiets(diet.name)"
                    >
                        <p>{{diet.name}}</p>
                    </div>
                </div>
                <hr>
                <p><i class="material-icons">no_food</i> Intolerances</p>
                <div class="intolerances">
                    <div 
                        v-for="(intol, idx) of intolerances"
                        :key="intol.name + idx"
                        :class="intolerances[idx].checked ? 'filter-item checked' : 'filter-item'"
                        @click="intol.checked = !intol.checked"
                    >
                        <p>{{intol.name}}</p>
                    </div>
                </div>
            </div>
            <div class="buttons">
                <button @click="closeWindow">Close</button>
                <button @click="setFilters">Set filters</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import AppBackdrop from '../ui/AppBackdrop'
export default {
    data() {
        return {
            filters: {
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
                intolerances: [
                    {name: 'Dairy', checked: false},{name: 'Egg', checked: false},
                    {name: 'Gluten', checked: false},{name: 'Grain', checked: false},
                    {name: 'Peanut', checked: false},{name: 'Seafood', checked: false},
                    {name: 'Sesame', checked: false},{name: 'Shellfish', checked: false},
                    {name: 'Soy', checked: false},{name: 'Sulfite', checked: false},
                    {name: 'Tree Nut', checked: false},{name: 'Wheat', checked: false}
                ]
            }
        }
    },
    computed: {
        ...mapGetters(['selectedFilters']),
        cuisines: function() {
            const selCuisines = this.selectedFilters.cuisines.map(item => item.name)
            return this.filters.cuisines.map(item => {
                if (selCuisines.includes(item.name)) {
                    item.checked = true
                }
                return item
            })
        },
        diets: function() {
            const selDiets = this.selectedFilters.diets.map(item => item.name)
            return this.filters.diets.map(item => {
                if (selDiets.includes(item.name)) {
                    item.checked = true
                }
                return item
            })
        },
        intolerances: function() {
            const selIntolerances = this.selectedFilters.intolerances.map(item => item.name)
            return this.filters.intolerances.map(item => {
                if (selIntolerances.includes(item.name)) {
                    item.checked = true
                }
                return item
            })
        }
    },
    components: {
        AppBackdrop
    },
    methods: {
        ...mapMutations(['showFilterWindow', 'setSelectedFilters']),
        closeWindow() {
            this.showFilterWindow(false)
        },
        setDiets(name) {
            this.diets.forEach(diet => {
                if (diet.name === name) {
                    diet.checked = !diet.checked
                } else {
                    diet.checked = false
                }
            })
        },
        setFilters() {
            const selectedFilters = {}
            selectedFilters.cuisines = this.cuisines.filter(item => item.checked)
            selectedFilters.diets = this.diets.filter(item => item.checked)
            selectedFilters.intolerances = this.intolerances.filter(item => item.checked)
            this.setSelectedFilters(selectedFilters)
            this.showFilterWindow(false)
        }
    }
}
</script>

<style lang="less" scoped>
.wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1500;

    .window {
        background-color: #FFFFFF;
        width: 90%;
        max-width: 540px;
        height: 60vh;
        padding: 16px 32px;
        border-radius: 30px;
        box-shadow: 0 10px 24px hsla(0, 0%, 0%, 0.2);
        z-index: 3000;

        .filters {
            width: 100%;
            height: calc(100% - 50px);
            padding-right: 20px;
            overflow: auto;

            >p {
                text-align: center;
            }

            >div {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
                padding: 16px 0px;

                .filter-item {
                    background-color: #ddd;
                    margin: 8px 2px;
                    padding: 10px 16px;
                    font-size: 0.9rem;
                    border-radius: 30px;
                    transition: 0.2s;
                    cursor: pointer;

                    &.radio {
                        border-radius: 0px;
                    }

                    &.checked {
                        background-color: indianred;
                    }

                    p {
                        margin: 0;
                        cursor: pointer;
                        -moz-user-select: none;
                        -ms-user-select: none;
                        -o-user-select: none;
                        -webkit-user-select: none;
                        user-select: none;
                    }
                }
            }
        }

        .buttons {
            width: 100%;
            height: 50px;
        }
    }
}
</style>