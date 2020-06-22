<template>
    <div class="page-wrapper">
        <ChangePassWindow v-if="changePassWindow"/>
        <DeleteAccWindow v-if="deleteAccWindow"/>
        <router-link to='/'>
            <div class="round-button back">
                <i class="material-icons">arrow_back</i>
            </div>
        </router-link>
        <div class="round-button user">
            <i class="material-icons">person</i>
            <div class="settings">
                <p>{{user}}</p>
                <hr>
                <p @click="showChangePassWindow(true)">Change password</p>
                <p @click="showDeleteAccWindow(true)">Delete account</p>
                <hr>
                <p @click="logout">
                    Log out
                    <i class="material-icons exit">login</i>
                </p>
            </div>
        </div>
        <div class="recipes">
            <div class="noop" v-if="!recipe"></div>
            <DetailedRecipe v-else :recipe="recipe" />
        </div>
        <div class="pictures">
            <div v-if="savedRecipes.length" >
                <ProfileRecipeCard
                    v-for="(recipe, idx) in savedRecipes"
                    :key="recipe.title + idx"
                    :recipe="recipe"
                    @select-recipe="openRecipeDetails"
                />
            </div>
            <div class="loader" v-else-if="loading">
                <AppLoader />
            </div>
            <div v-else>
                <p>No saved recipes yet</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import DetailedRecipe from '../components/DetailedRecipe'
import ProfileRecipeCard from '../components/cards/ProfileRecipeCard'
import DeleteAccWindow from '../components/modals/DeleteAccWindow'
import ChangePassWindow from '../components/modals/ChangePassWindow'
import AppLoader from '../components/ui/AppLoader'
export default {
    name: 'Profile',
    components: {
        ProfileRecipeCard,
        DeleteAccWindow,
        ChangePassWindow,
        DetailedRecipe,
        AppLoader
    },
    data() {
        return {
            recipe: null
        }
    },
    computed: mapGetters(['loading', 'savedRecipes', 'user', 'deleteAccWindow', 'changePassWindow']),
    methods: {
        ...mapActions(['fetchSavedRecipes', 'logout']),
        ...mapMutations(['showDeleteAccWindow', 'showChangePassWindow']),
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
.page-wrapper {
    display: flex;
    min-height: 100vh;
    background-color: #F0FDEB;

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
            transition: 0.7s;
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
                padding: 10px;
                overflow: hidden;
            }
            
            &:hover {
                width: 180px;
                height: 200px;
                border-radius: 26px;

                .material-icons {
                    display: none;
                }
                .settings {
                    display: block;
                }
            }

            p {
                &:nth-of-type(2) {
                    &:hover { color: #D8DD00 }
                }

                &:nth-of-type(3) {
                    &:hover { color: #CD0000 }
                }

                &:nth-of-type(4) {
                    display: flex;
                    justify-content: center;
                    transition: 0.1s;

                    &:hover {
                        text-decoration: underline;
                        .exit { display: inline-block; }
                    }
                }

                .exit { 
                    display: none;
                    margin: -3px 0 0 7px;
                    font-size: 22px;
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
            background-image: url('../assets/profile-page.jpg');
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
        }
    }

    .pictures {
        box-sizing: border-box;
        height: 100vh;
        min-width: 320px;
        padding: 0px 4px;
        background-color: #000000;
        overflow: auto;

        .loader {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;

            >div {
                margin-top: 0px;
            }
        }
    }
}
</style>