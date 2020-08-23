<template>
    <div class="window-wrapper">
        <div class="window">
            <i class="material-icons md-36" @click="closeWindow">clear</i>
            <article v-if="recipe" class="recipe">
                <div class="head">
                    <img
                        :src="'https://spoonacular.com/recipeImages/' + recipe.id + '-312x231.jpg'"
                        :alt="recipe.title + ' image'"
                    />
                    <section class="summary">
                        <h3>{{recipe.title}}</h3>
                        <p>{{recipe.readyInMinutes}} min | {{recipe.servings}} servings</p>
                        <p v-if="recipe.diets.length">
                            <strong>Diet:</strong>
                            <span
                                v-for="(diet, idx) in recipe.diets"
                                :key="diet + idx"
                            >{{idx !== 0 ? ', ' : null}}{{diet}}</span>
                        </p>
                        <p v-if="recipe.cuisines.length">
                            <strong>Cuisine:</strong>
                            <span
                                v-for="(cuisine, idx) in recipe.cuisines"
                                :key="cuisine + idx"
                            >{{idx !== 0 ? ', ' : null}}{{cuisine}}</span>
                        </p>
                        <p v-if="recipe.dishTypes.length">
                            <strong>Dish type:</strong>
                            <span
                                v-for="(dish, idx) in recipe.dishTypes"
                                :key="dish + idx"
                            >{{idx !== 0 ? ', ' : null}}{{dish}}</span>
                        </p>
                    </section>
                    <section v-if="recipe.extendedIngredients.length" class="ingredients">
                        <h4>Ingredients ({{recipe.extendedIngredients.length}}):</h4>
                        <ul>
                            <li
                                v-for="(ingred, idx) in recipe.extendedIngredients"
                                :key="ingred + idx"
                            >
                                {{ingred.measures.metric.unitShort === 'ml' || ingred.measures.metric.unitShort === 'g'
                                ? Math.round(ingred.measures.metric.amount)
                                : ingred.measures.metric.amount}}
                                {{ingred.measures.metric.unitShort}}
                                <b>{{ingred.name}}</b>
                            </li>
                        </ul>
                    </section>
                </div>
                <section v-if="recipe.analyzedInstructions.length" class="instructions">
                    <h4>Steps ({{recipe.analyzedInstructions[0].steps.length}}):</h4>
                    <ol>
                        <li
                            v-for="(step, idx) in recipe.analyzedInstructions[0].steps"
                            :key="'step' + idx"
                        >{{step.step}}</li>
                    </ol>
                </section>
                <div v-else class="instructions centered">
                    <p>Sorry, this recipe has not any instructions</p>
                </div>
            </article>
            <div v-else class="loader">
                <AppLoader />
            </div>
        </div>
    </div>
</template>

<script>
import AppLoader from "../ui/AppLoader";
import { mapGetters, mapMutations } from "vuex";
export default {
    computed: mapGetters(["recipe"]),
    components: {
        AppLoader,
    },
    methods: {
        ...mapMutations(["setRecipe", "showRecipeWindow"]),
        closeWindow() {
            this.showRecipeWindow(false);
            this.setRecipe(null);
        },
    },
};
</script>

<style lang="less" scoped>
.window {
    flex-direction: column;
    max-width: 70%;
    max-height: 80vh;
    background-color: @color_firm_secondary;
    border: 3px solid @color_success_dark;
    border-radius: 0;

    > i {
        font-size: 36px;
        text-align: right;
        cursor: pointer;
    }

    .recipe {
        padding: 0px 24px 24px;
        overflow: auto;

        .head {
            display: flex;
            flex-wrap: wrap;
            text-align: left;

            h3 {
                margin-top: 0;
            }

            img {
                width: 100%;
                max-width: 321px;
                max-height: 213px;
                margin-bottom: 20px;
                border: 1px solid @color_firm_tertiary;
            }

            .summary {
                flex: 1;
                min-width: 200px;
                margin: 0px 16px;
            }

            .ingredients {
                flex: 1;
                min-width: 200px;

                h4 {
                    margin-top: 0;
                }

                ul {
                    padding-left: 20px;
                    list-style-type: square;
                }
            }
        }

        .instructions {
            margin-top: 12px;
            text-align: left;

            h4 {
                margin: 0;
            }

            ol {
                padding-left: 20px;
            }

            &.centered {
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }

    .loader {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 500px;

        div {
            margin-top: -48px;
        }
    }
}
@media screen and (min-width: 1250px) {
    .window {
        max-width: 880px;
        max-height: 500px;
    }
}
@media screen and (max-width: 1170px) {
    .window {
        max-width: 700px;
    }
}
@media screen and (max-width: 900px) {
    .window {
        max-width: 80%;

        .recipe {
            padding: 0 16px 16px;

            .head {
                img {
                    width: 80%;
                }
            }
        }
    }
}
@media screen and (max-width: 740px) {
    .window {
        .recipe {
            .head {
                img {
                    width: 100%;
                    max-width: 100%;
                    max-height: 100%;
                }
                .summary {
                    margin-left: 0;
                }
            }
        }
    }
}
@media screen and (max-width: 580px) {
    .window {
        max-width: 90%;
    }
}
@media screen and (max-width: 500px) {
    .window {
        .recipe {
            .head {
                .ingredients {
                    width: 100%;
                    padding: 12px 0;
                    border-top: 1px solid @color_success_dark;
                    border-bottom: 1px solid @color_success_dark;
                }
            }
        }
    }
}
</style>