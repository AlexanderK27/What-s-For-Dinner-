<template>
    <div class="wrapper">
        <AppBackdrop />
        <div class="window">
            <i
                class="material-icons md-48"
                @click="closeWindow"
            >clear</i>
            <div v-if="recipe" class="recipe">
                <div class="head">
                    <img
                        :src="'https://spoonacular.com/recipeImages/' + recipe.id + '-312x231.jpg'"
                        :alt="recipe.title + ' image'"
                    />
                    <div class="summary">
                        <h2>{{recipe.title}}</h2>
                        <p>{{recipe.readyInMinutes}} min | {{recipe.servings}} servings</p>
                        <p v-if="recipe.diets.length">
                            <strong>Diet: </strong>
                            <span 
                                v-for="(diet, idx) in recipe.diets"
                                :key="diet + idx"
                            >{{idx !== 0 ? ', ' : null}}{{diet}}</span>
                        </p>
                        <p v-if="recipe.cuisines.length">
                            <strong>Cuisine: </strong>
                            <span 
                                v-for="(cuisine, idx) in recipe.cuisines"
                                :key="cuisine + idx"
                            >{{idx !== 0 ? ', ' : null}}{{cuisine}}</span>
                        </p>
                        <p v-if="recipe.dishTypes.length">
                            <strong>Dish type: </strong>
                            <span 
                                v-for="(dish, idx) in recipe.dishTypes"
                                :key="dish + idx"
                            >{{idx !== 0 ? ', ' : null}}{{dish}}</span>
                        </p>
                    </div>
                    <div class="ingredients">
                        <p>Ingredients:</p>
                        <ul v-if="recipe.extendedIngredients.length">
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
                    </div>
                </div>
                <div class="instructions" v-if="recipe.analyzedInstructions.length">
                    <ol>
                        <li 
                            v-for="(step, idx) in recipe.analyzedInstructions[0].steps"
                            :key="'step' + idx"
                        >
                            {{step.step}}
                        </li>
                    </ol>
                </div>
            </div>
            <div v-else class="loader">
                <AppLoader />
            </div>
        </div>
    </div>
</template>

<script>
import AppBackdrop from '../ui/AppBackdrop'
import AppLoader from '../ui/AppLoader'
import { mapGetters, mapMutations } from 'vuex'
export default {
    computed: mapGetters(['recipe']),
    components: {
        AppBackdrop,
        AppLoader
    },
    methods: {
        ...mapMutations(['setRecipe', 'showRecipeWindow']),
        closeWindow() {
            this.showRecipeWindow(false)
            this.setRecipe(null)
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
    z-index: 1500;

    .window {
        position: fixed;
        display: flex;
        flex-direction: column;
        width: 70%;
        height: 80vh;
        margin: 10vh 15%;
        background-color: #F4FCF0;
        border: 3px solid #77B550;
        z-index: 3000;

        >i {
            font-size: 48px;
            text-align: right;
            cursor: pointer;
        }

        .recipe {
            padding: 0px 48px 48px;
            overflow: auto;

            .head {
                display: flex;
                flex-wrap: wrap;
                text-align: left;

                h2 {
                    margin-top: 0;
                }

                img {
                    width: 100%;
                    max-width: 321px;
                    max-height: 213px;
                    border: 1px solid #0F0F0F;
                }

                .summary {
                    flex: 1;
                    margin: 0px 16px;
                    padding: 0px 16px;
                }

                .ingredients {
                    min-width: 200px;

                    p {
                        margin-top: 0;
                    }

                    ul {
                        padding-left: 20px;
                    }
                }
            }
            
            .instructions {
                margin-top: 36px;

                ol {
                    padding-left: 20px;
                }

                li {
                    text-align: left;
                }
            }
        }

        .loader {
            display: flex;
            flex: 1;
            justify-content: center;
            align-items: center;

            div {
                margin-top: -48px;
            }
        }
    }
}
</style>