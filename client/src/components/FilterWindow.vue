<template>
    <div class="wrapper">
        <Backdrop />
        <div class="window">
            <div class="filters">
                <p>Cuisines</p>
                <div class="cuisines">
                    <div 
                        v-for="(cuisine, idx) of stdFilters.cuisines"
                        :key="cuisine.name + idx"
                        :class="cuisine.checked ? 'filter-checkbox checked' : 'filter-checkbox'"
                        @click="cuisine.checked = !cuisine.checked"
                    >
                        <input type="checkbox" :id="cuisine.name" v-model="cuisine.checked" />
                        <label>{{cuisine.name}}</label>
                    </div>
                </div>
                <hr>
                <p>Diets</p>
                <div class="diets">
                    <div 
                        v-for="(diet, idx) of stdFilters.diets"
                        :key="diet.name + idx"
                        :class="diet.checked ? 'filter-checkbox checked' : 'filter-checkbox'"
                        @click="diet.checked = !diet.checked"
                    >
                        <input type="checkbox" :id="diet.name" v-model="diet.checked" />
                        <label>{{diet.name}}</label>
                    </div>
                </div>
                <hr>
                <p>Intolerances</p>
                <div class="intolerances">
                    <div 
                        v-for="(intol, idx) of stdFilters.intolerances"
                        :key="intol.name + idx"
                        :class="intol.checked ? 'filter-checkbox checked' : 'filter-checkbox'"
                        @click="intol.checked = !intol.checked"
                    >
                        <input type="checkbox" :id="intol.name" v-model="intol.checked" />
                        <label>{{intol.name}}</label>
                    </div>
                </div>
            </div>
            <div>
                <button @click="closeWindow">Close</button>
                <button @click="setFilters">Set filters</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import Backdrop from '../ui/Backdrop'
export default {
    data() {
        return {}
    },
    computed: mapGetters(['stdFilters']),
    components: {
        Backdrop
    },
    methods: {
        ...mapMutations(['showFilterWindow', 'setSelectedFilters']),
        closeWindow() {
            this.showFilterWindow(false)
        },
        setFilters() {
            const selectedFilters = {}
            selectedFilters.cuisines = this.stdFilters.cuisines.filter(item => item.checked)
            selectedFilters.diets = this.stdFilters.diets.filter(item => item.checked)
            selectedFilters.intolerances = this.stdFilters.intolerances.filter(item => item.checked)
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
        background-color: #eee;
        width: 50%;
        height: 60vh;
        padding: 16px 32px;
        box-shadow: 0px 15px 36px hsla(0, 0%, 0%, 0.2);
        border-radius: 36px;
        z-index: 3000;

        .filters {
            width: 100%;
            height: 100%;
            padding-right: 20px;
            overflow: auto;

            >p {
                text-align: left;
            }

            >div {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
                padding: 16px 0px;

                .filter-checkbox {
                    background-color: #ddd;
                    margin: 8px 2px;
                    padding: 10px 16px;
                    font-size: 0.9rem;
                    border-radius: 30px;
                    transition: 0.2s;
                    cursor: pointer;

                    &.checked {
                        background-color: indianred;
                    }

                    input {
                        display: none;
                    }

                    label {
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
    }
}
</style>