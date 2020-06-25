<template>
    <div>
        <header>
            <h2>What's For Dinner
                <i class="material-icons">help_outline</i>
            </h2>
            <router-link 
                :to="isAuthenticated ? 'profile' : '/?auth=true'" 
                :replace="isAuthenticated ? false : true"
            >
                <div>{{isAuthenticated ? user : 'Profile'}}</div>
            </router-link>
        </header>
        <main>
            <RecipeWindow v-if="recipeWindow" />
            <FilterWindow v-if="filterWindow" />
            <AuthWindow v-if="$route.query.auth" />
            <Search />
            <div class="recipes-wrapper" v-if="allRecipes.length">
                <Pagination :amountOfPages="allRecipes.length" />
                <div class="recipes">
                    <RecipeCard 
                        v-for="recipe of allRecipes[pageNumber - 1]"
                        @get-recipe="openRecipeWindow"
                        :recipe="recipe"
                        :key="recipe.id"
                    />
                </div>
                <Pagination :amountOfPages="allRecipes.length" />
            </div>
            <div v-else-if="loading"><AppLoader /></div>
            <div v-else></div>
        </main>
        <footer>
            <a href="https://spoonacular.com/food-api">Powered by <span>Spoonacular API</span></a>
            <p>Created by Kolomiichuk &lt;o.kolomiichuk@outlook.com&gt;</p>
        </footer>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Search from '../components/Search'
import Pagination from '../components/Pagination'
import RecipeCard from '../components/cards/RecipeCard'
import RecipeWindow from '../components/modals/RecipeWindow'
import FilterWindow from '../components/modals/FilterWindow'
import AuthWindow from '../components/modals/AuthWindow'
import AppLoader from '../components/ui/AppLoader'
export default {
    name: 'Home',
    components: {
        Search,
        RecipeCard,
        Pagination,
        RecipeWindow,
        FilterWindow,
        AuthWindow,
        AppLoader
    },
    computed: mapGetters([
        'allRecipes', 
        'pageNumber', 
        'loading', 
        'recipeWindow', 
        'filterWindow',
        'authWindow',
        'isAuthenticated',
        'user'
    ]),
    methods: {
        ...mapActions(['fetchOneRecipe']),
        ...mapMutations(['showAuthWindow', 'showRecipeWindow']),
        openRecipeWindow(id) {
            this.fetchOneRecipe(id)
            this.showRecipeWindow(true)
        }
    }
}
</script>

<style lang="less" scoped>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 10%;
    color: #2C8850;
    background-color: #F1FCEA;

    h2 {
        display: block;

        i {
            cursor: pointer;
        }
    }

    a {
        text-decoration: none;

        div {
            position: relative;
            padding: 12px 20px;
            color: #FFFFFF;
            font-size: 0.9rem;
            letter-spacing: 1px;
            text-transform: uppercase;
            z-index: 1;

            &::before {
                position: absolute;
                content: "";
                top: 0;
                left: 0;
                z-index: -1;
                width: 100%;
                height: 100%;
                background-color: #2C8850;
                border-radius: 20px;
            }
        }
    }
}

main {
    width: 80%;
    min-height: calc(100vh - 174px);
    margin: 0 auto;
    
    .recipes-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;

        .recipes {
            display: flex;
            flex-wrap: wrap;
            justify-content: center; 
        }
    }
}

footer {
    box-sizing: border-box;
    width: 100%;
    padding: 16px 24px;
    text-align: left;
    font-weight: bold;
    font-style: italic;
    background-color: #F1FCEA;

    a { 
        color: #2C8850; 
        font-size: 14px;
        text-decoration: none;
        cursor: pointer;

        span { font-style: normal; }
    }
    P { 
        margin-top: 4px;
        color: #777777;
        font-size: 12px; 
    }
}

@media screen and (max-width: 1320px) {
    main {
        width: 90%;
    }
}

@media screen and (max-width: 1170px) {
    main {
        width: 100%;
    }
}

@media screen and (max-width: 600px) {
    header {
        padding: 12px 4%;
    }
}

@media screen and (max-width: 500px) {
    header {
        h2 { font-size: 20px; }

        a { div { padding: 10px 16px; font-size: 0.8rem; } }
    }
}

@media screen and (max-width: 420px) {
    header {
        display: block;
        padding: 24px 4%;

        h2 { display: none; }
    }
}
</style>