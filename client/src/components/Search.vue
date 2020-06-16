<template>
    <div class="search-wrapper">
        <SelectedFilters />
        <div class="search" v-if="searchType === 'word'">
            <div class="icon filter">
                <i 
                    class="material-icons md-36"
                    @click="openFilter"
                >construction</i>
            </div>
            <form @submit.prevent="fetchRecipes(searchValue)">
                <input type="text" v-model="searchValue" />
                <i 
                    v-if="searchValue !== ''" 
                    class="material-icons md-24 clear"
                    @click="clearInput"
                >clear</i>
                <button type="submit">search</button>
            </form> 
        </div>
        <div class="search" v-else >
            <div class="icon search">
                <i 
                    class="material-icons md-36"
                    @click="fetchByIngredients"
                >search</i>
            </div>
            <form @submit.prevent="addIngredient">
                <input 
                    type="text" 
                    ref="searchInput"
                    v-model="enteredIngredient" 
                    placeholder="Your ingredient" 
                    @input="prepareSuggestions" 
                    @keyup.down.prevent="focusOnHints"
                />
                <button type="submit">add one</button>
                <div v-if="suggestions.length && enteredIngredient" class="search-hints">
                    <SearchHints 
                        :suggestions="suggestions" 
                        :match="enteredIngredient"
                        :focused="passFocus"
                        @pick-ingredient="pushToSearchInput"
                        @focus-on-input="focusInput"
                    />
                </div>
            </form> 
        </div>
        <div>
            <form>
                <input 
                    type="radio" 
                    id="byWord" 
                    name="searchType" 
                    value="word" 
                    v-model="searchType" 
                />
                <label for="byWord">Search by word in name</label>
                <input 
                    type="radio" 
                    id="byIngredients" 
                    name="searchType" 
                    value="ingredient" 
                    v-model="searchType" 
                />
                <label for="byIngredients">Search by ingredients</label>
            </form>
        </div>
        <pre>{{usersIngredients}}</pre>
    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import SelectedFilters from './SelectedFilters'
import SearchHints from './SearchHints'
import ingredients from '../db/ingredients'
export default {
    data() {
        return {
            searchType: 'word',
            searchValue: '',
            enteredIngredient: '',
            usersIngredients: [],
            suggestions: [],
            passFocus: false
        }
    },
    components: {
        SelectedFilters,
        SearchHints
    },
    methods: {
        ...mapActions(['fetchRecipes']),
        ...mapMutations(['showFilterWindow']),
        clearInput() {
            this.searchValue = ''
        },
        fetchByIngredients() {

        },
        openFilter() {
            this.showFilterWindow(true)
        },
        addIngredient() {
            this.usersIngredients.push(this.enteredIngredient)
            this.enteredIngredient = ''
        },
        pushToSearchInput(ingredient) {
            this.enteredIngredient = ingredient
            this.prepareSuggestions(ingredient)
            this.focusInput()
        },
        prepareSuggestions() {
            if (this.enteredIngredient.length > 2) {
                const match = ingredients.filter(item => item.includes(this.enteredIngredient))
                match.sort((a, b) => a.length - b.length)
                this.suggestions = match.slice(0, 5)
            } else {
                this.suggestions = []
            }
        },
        focusInput() {
            this.$refs.searchInput.focus()
            this.passFocus = false
        },
        focusOnHints() {
            this.passFocus = true
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

        .icon {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 42px;
            height: 42px;
            margin: 0 8px 0 0;

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

                &::placeholder {
                    color: #BBBBBB;
                }
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

            .search-hints {
                position: absolute;
                min-width: 340px;
            }
        }
    }
}
</style>