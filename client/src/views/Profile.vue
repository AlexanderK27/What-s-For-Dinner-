<template>
    <div class="wrapper">
        <router-link to='/'>
            <div class="round-button back">
                <i class="material-icons">arrow_back</i>
            </div>
        </router-link>
        <div class="round-button user">
            <i class="material-icons">person</i>
            <div class="settings">
                <p>Username</p>
                <hr>
                <p>Change password</p>
                <p>Delete account</p>
                <hr>
                <p>Log out</p>
            </div>
        </div>
        <div class="recipes">
            <div class="noop" v-if="!recipe"></div>
            <DetailedRecipe v-else :recipe="recipe" />
            <!-- <pre>
                {{recipe}}
            </pre> -->
        </div>
        <div class="pictures">
            <Loader v-if="loading" />
            <ProfileRecipeCard
                v-else-if="savedRecipes.length" 
                v-for="(recipe, idx) in savedRecipes"
                :key="recipe.title + idx"
                :recipe="recipe"
                @select-recipe="openRecipeDetails"
            />
            <div v-else>
                <p>No saved recipes yet</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ProfileRecipeCard from '../components/ProfileRecipeCard'
import DetailedRecipe from '../components/DetailedRecipe'
import Loader from '../ui/Loader'
export default {
    name: 'Profile',
    components: {
        ProfileRecipeCard,
        DetailedRecipe,
        Loader
    },
    data() {
        return {
            recipe: null
        }
    },
    computed: mapGetters(['loading', 'savedRecipes']),
    methods: {
        ...mapActions(['fetchSavedRecipes']),
        openRecipeDetails(recipe) {
            this.recipe = recipe
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            console.log('Inside mounted')
            this.fetchSavedRecipes()
        })
    }
}
</script>

<style lang="less" scoped>
.wrapper {
    display: flex;
    min-height: 100vh;
    background-color: #F1FCEA;

    .round-button {
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 30px;
        width: 42px;
        height: 40px;
        color: #FFFFFF;
        font-weight: bold;
        background-color: #10770C;
        border-radius: 50%;
        transition: 0.2s;
        cursor: pointer;
        z-index: 4000;

        &:hover {
            top: 29px;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.7);
        }

        &.back {
            left: 30px;
        }

        &.user {
            left: 80px;
            transition: 1s;
            overflow: hidden;

            .material-icons {
                display: block;
            }
            .settings {
                display: none;
                box-sizing: border-box;
                position: absolute;
                top: 0;
                left: 0;
                width: 180px;
                height: 220px;
                padding: 10px;
                overflow: hidden;
            }
            
            &:hover {
                width: 180px;
                height: 220px;
                border-radius: 26px;

                .material-icons {
                    display: none;
                }
                .settings {
                    display: block;
                }
            }
        }

        i {
            font-size: 28px;
        }
    }

    .recipes {
        box-sizing: border-box;
        flex: 1;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;

        .noop {
            width: 100%;
            max-width: 420px;
            height: 420px;
            opacity: 0.5;
            background-image: url('../assets/profile-page.jpg');
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
        }
    }

    .pictures {
        box-sizing: border-box;
        height: 100vh;
        padding: 0px 4px;
        background-color: #000000;
        overflow: auto;
    }
}
</style>