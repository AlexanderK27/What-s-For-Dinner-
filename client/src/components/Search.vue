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
                <input 
                    type="text" 
                    placeholder="Dish name"
                    v-model="searchValue" 
                />
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
                    @click="fetchRecipesByIngredients(usersIngredients)"
                >search</i>
            </div>
            <form @submit.prevent="addIngredient">
                <input 
                    type="text" 
                    ref="searchInput"
                    v-model="findIngredientInputValue" 
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
        <div class="search-type-selector">
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
    </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import SelectedFilters from './SelectedFilters'
import SearchHints from './SearchHints'
import ingredients from '../db/ingredients'
export default {
    data() {
        return {
            searchType: 'word',
            searchValue: '',
            findIngredientInputValue: '',
            suggestions: [],
            passFocus: false
        }
    },
    components: {
        SelectedFilters,
        SearchHints
    },
    computed: {
        ...mapGetters(['usersIngredients']),
        enteredIngredient: function() {
            return this.findIngredientInputValue.toLowerCase()
        }
    },
    watch: {
        searchType: 'changeSearchType'
    },
    methods: {
        ...mapActions(['fetchRecipes', 'fetchRecipesByIngredients']),
        ...mapMutations(['setSearchType', 'showFilterWindow', 'setUsersIngredients']),
        clearInput() {
            this.searchValue = ''
        },
        changeSearchType(type) {
            this.setSearchType(type)
        },
        openFilter() {
            this.showFilterWindow(true)
        },
        addIngredient() {
            if (ingredients.includes(this.enteredIngredient) && !this.usersIngredients.includes(this.enteredIngredient)) {
                this.setUsersIngredients(this.usersIngredients.concat([this.enteredIngredient]))
                this.findIngredientInputValue = ''
            }
        },
        pushToSearchInput(ingredient) {
            this.findIngredientInputValue = ingredient
            this.prepareSuggestions(ingredient)
            this.focusInput()
        },
        prepareSuggestions() {
            if (this.enteredIngredient.length > 1) {
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
        width: 100%;
        max-width: 700px;
        margin: 50px auto 14px;

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

    .search-type-selector {
        margin-bottom: 30px;

        input, label {
            cursor: pointer;
        }
    }
}

@media screen and (max-width: 830px) {
    .search-wrapper {
        box-sizing: border-box;
        padding: 0 10%;
    }
}

@media screen and (max-width: 600px) {
    .search-wrapper {
        padding: 0 2%;
    }
}

@media screen and (max-width: 460px) {
    .search-wrapper {
        .search {
            form {
                button { font-size: 12px; }
            }
        }
        .search-type-selector {
            label { font-size: 14px; }
        }
    }
}
</style>