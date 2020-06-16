<template>
    <div class="search-wrapper">
        <SelectedFilters />
        <div class="search">
            <div class="filter">
                <i 
                    class="material-icons md-36"
                    @click="openFilter"
                >construction</i>
            </div>
            <form @submit.prevent="getRecipes">
                <input type="text" v-model="searchValue" />
                <i 
                    v-if="searchValue !== ''" 
                    class="material-icons md-24 clear"
                    @click="clearInput"
                >clear</i>
                <button>search</button>
            </form> 
        </div>
    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import SelectedFilters from '../components/SelectedFilters'
export default {
    data() {
        return {
            searchValue: ''
        }
    },
    components: {
        SelectedFilters,
    },
    methods: {
        ...mapActions(['fetchRecipes']),
        ...mapMutations(['showFilterWindow']),
        clearInput() {
            this.searchValue = ''
        },
        getRecipes() {
            this.fetchRecipes(this.searchValue)
        },
        openFilter() {
            this.showFilterWindow(true)
        }
    }
}
</script>

<style lang="less" scoped>
.search-wrapper {
    width: 100%;

    .search {
        position: relative;
        display: flex;
        width: 60%;
        margin: 50px auto;

        .filter {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 42px;
            height: 42px;
            margin-right: 8px;

            i {
                font-size: 32px;
                color: #2C7750;
                cursor: pointer;
                transition: 50ms;

                &:hover {
                    font-size: 36px;
                } 
            }
        }

        form {
            width: 100%;

            input {
                box-sizing: border-box;
                width: 100%;
                padding: 10px calc(24% + 33px) 10px 4%;
                border: 2px solid #2CB950;
                border-radius: 20px;
                color: #888888;
                font-weight: bold;
                font-size: 16px;
                outline: none;
            }

            .clear {
                position: absolute;
                top: 9px;
                right: calc(20% + 9px);
                font-size: 24px;
                color: #BBBBBB;
                transition: 0.2s;
                cursor: pointer;

                &:hover {
                    color: #AAAAAA;
                }
            }

            button {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                width: 20%;
                height: 42px;
                background: linear-gradient(120deg, #2CA050 0%, #2CC150 120%);
                color: #FFFFFF;
                text-transform: uppercase;
                letter-spacing: 1px;
                border: none;
                border-top-right-radius: 20px;
                border-bottom-right-radius: 20px;
                outline: none;
                cursor: pointer;
            }
        }
    }
}
</style>