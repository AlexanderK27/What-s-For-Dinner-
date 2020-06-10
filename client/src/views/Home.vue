<template>
    <div>
        <header>
            <h2>What's For Dinner
                <i class="material-icons">help_outline</i>
            </h2>
            <router-link to='profile'>
                <div>Profile</div>
            </router-link>
        </header>
        <main>
            <Search />
            <div class="recipes" v-if="allRecipes.length">
                <RecipeCard 
                    v-for="recipe of allRecipes"
                    :recipe="recipe"
                    :key="recipe.id"
                />
            </div>
            <div v-else-if="message"><p>{{message}}</p></div>
            <div v-else-if="loading"><Loader /></div>
            <div v-else></div>
            
        </main>
        <!-- <div>
            <button @click="getOneRecipe" >Get recipe</button>
        </div> -->
    </div>
</template>

<script>
import Search from '../components/Search'
import RecipeCard from '../components/RecipeCard'
import Loader from '../ui/Loader'
import { mapGetters } from 'vuex'
export default {
    name: 'Home',
    computed: mapGetters(['allRecipes', 'message', 'loading']),
    data() {
        return {}
    },
    components: {
        Search,
        RecipeCard,
        Loader
    },
    methods: {
        // getOneRecipe: async function getOneRecipe() {
        //     try {
        //         const response = await fetch(`${window.location.protocol}//${this.hostname}/api/recipes/723984`)
        //         const recipe = await response.json()
        //         console.log(recipe)
        //     } catch (e) {
        //         console.log(e)
        //     }
        // }
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
    margin: 0 auto;
    
    .recipes {
        display: flex;
        flex-wrap: wrap;
        justify-content: center; 
    }
}
</style>