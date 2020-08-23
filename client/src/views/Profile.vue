<template>
    <div class="page-wrapper">
        <ChangePassWindow v-if="changePassWindow" />
        <DeleteAccWindow v-if="deleteAccWindow" />
        <router-link to="/">
            <div class="round-button back">
                <i class="material-icons">arrow_back</i>
            </div>
        </router-link>
        <div class="round-button user">
            <i class="material-icons">person</i>
            <div class="settings">
                <p class="username">{{ user }}</p>
                <hr />
                <div v-if="provider">
                    <p class="disabled">Change password</p>
                    <p class="disabled">Delete account</p>
                </div>
                <div v-else>
                    <p class="update" @click="showChangePassWindow(true)">Change password</p>
                    <p class="delete" @click="showDeleteAccWindow(true)">Delete account</p>
                </div>
                <hr />
                <p class="logout" @click="logout">
                    Log out
                    <i class="material-icons exit">login</i>
                </p>
            </div>
        </div>
        <main class="recipes">
            <div v-if="!recipe" class="noop"></div>
            <DetailedRecipe v-else :recipe="recipe" @delete-recipe="onRecipeDeletes" />
        </main>
        <aside :class="recipesList ? 'pictures opened' : 'pictures closed'">
            <div v-if="savedRecipes.length">
                <ProfileRecipeCard
                    v-for="(recipe, idx) in savedRecipes"
                    :key="recipe.title + idx"
                    :recipe="recipe"
                    @select-recipe="openRecipeDetails"
                />
            </div>
            <div v-else-if="loading" class="centered">
                <AppLoader />
            </div>
            <div v-else class="centered">
                <p>
                    Here you can find all your recipes
                    <br />You have not saved any yet :(
                    <br />Let's start with
                    it!
                </p>
            </div>
            <div class="pictures-toggle" @click="toggleRecipesList">
                <i v-if="recipesList" class="material-icons">navigate_next</i>
                <i v-else class="material-icons">navigate_before</i>
            </div>
        </aside>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import DetailedRecipe from "../components/DetailedRecipe";
import ProfileRecipeCard from "../components/cards/ProfileRecipeCard";
import DeleteAccWindow from "../components/modals/DeleteAccWindow";
import ChangePassWindow from "../components/modals/ChangePassWindow";
import AppLoader from "../components/ui/AppLoader";
export default {
    name: "Profile",
    components: {
        ProfileRecipeCard,
        DeleteAccWindow,
        ChangePassWindow,
        DetailedRecipe,
        AppLoader,
    },
    data() {
        return {
            recipe: null,
            recipesList: false,
        };
    },
    computed: mapGetters([
        "loading",
        "savedRecipes",
        "user",
        "provider",
        "deleteAccWindow",
        "changePassWindow",
    ]),
    methods: {
        ...mapActions(["fetchSavedRecipes", "logout", "deleteRecipe"]),
        ...mapMutations(["showDeleteAccWindow", "showChangePassWindow"]),
        toggleRecipesList() {
            this.recipesList = !this.recipesList;
        },
        openRecipeDetails(recipe) {
            this.toggleRecipesList();
            this.recipe = recipe;
        },
        onRecipeDeletes(id) {
            this.openRecipeDetails(null);
            this.deleteRecipe(id);
        },
    },
    mounted: function () {
        this.$nextTick(function () {
            this.fetchSavedRecipes();
        });
    },
};
</script>

<style lang="less" scoped>
.page-wrapper {
    display: flex;
    height: 100vh;
    background-color: @color_firm_secondary;
    overflow: hidden;

    .round-button {
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 30px;
        width: 42px;
        height: 40px;
        color: @color_lightest;
        font-weight: bold;
        background-color: @color_firm_primary;
        border-radius: 50%;
        transition: 0.2s;
        cursor: pointer;
        z-index: 9;

        &:hover {
            top: 29px;
            box-shadow: @shadow-sm;
        }

        &.back {
            left: 30px;
        }

        &.user {
            left: 80px;
            transition: 0.5s;
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
                &.username,
                &.disabled {
                    cursor: default;
                }

                &.update:hover {
                    color: @color_warning;
                }

                &.delete:hover {
                    color: @color_danger_dark;
                }

                &.disabled {
                    text-decoration: line-through;
                    &:hover {
                        color: @color_lightest;
                    }
                }

                &.logout {
                    display: flex;
                    justify-content: center;
                    transition: 0.1s;

                    &:hover {
                        text-decoration: underline;
                        .exit {
                            display: inline-block;
                        }
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
            background-image: url("../assets/profile-page.jpg");
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
        }
    }

    .pictures {
        box-sizing: border-box;
        height: 100vh;
        width: 320px;
        padding: 0 4px;
        background-color: @color_darkest;
        overflow: auto;

        .centered {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;

            > div {
                margin-top: 0px;
            }

            > p {
                font-size: 14px;
                font-weight: bold;
                color: @color_lightest;
            }
        }

        .pictures-toggle {
            display: none;
            width: 42px;
            height: 40px;
            border-radius: 50%;
            background-color: @color_darkest;
        }
    }
}

@media screen and (max-width: 1200px) {
    .pictures {
        position: fixed;
        top: 0;
        z-index: 10;
        transition: 0.4s;

        &.opened {
            right: 0;

            .pictures-toggle {
                right: 340px;
            }
        }

        &.closed {
            right: -320px;

            .pictures-toggle {
                right: 40px;
            }
        }

        .pictures-toggle {
            display: flex !important;
            justify-content: center;
            align-items: center;
            position: fixed;
            bottom: 50px;
            z-index: 11;
            transition: 0.4s;

            i {
                color: @color_lightest;
            }
        }
    }
}
</style>
