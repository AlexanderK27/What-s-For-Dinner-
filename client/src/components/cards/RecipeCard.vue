<template>
    <div class="recipe-card" @click="$emit('get-recipe', recipe.id)">
        <img
            :src="'https://spoonacular.com/recipeImages/' + recipe.id + '-312x231.jpg'"
            :alt="recipe.title + ' image'"
        />
        <div>
            <div class="categories">
                <i
                    v-if="savedRecipesIds.includes(recipe.id)"
                    class="material-icons md-18"
                    @click.stop="deleteRecipe(recipe.id)"
                >star</i>
                <i
                    v-else
                    class="material-icons md-18"
                    @click.stop="saveRecipe(recipe.id)"
                >star_outline</i>
            </div>
            <p class="title">{{recipe.title}}</p>
            <div class="info-wrapper" v-if="recipe.readyInMinutes">
                <div class="info time">
                    <p>{{recipe.readyInMinutes}}</p>
                    <i class="material-icons md-18">access_time</i>
                    <div class="tooltip">
                        <p>Cooking time</p>
                    </div>
                </div>
                <div class="info servings">
                    <p>{{recipe.servings}}</p>
                    <i class="material-icons md-18">restaurant</i>
                    <div class="tooltip">
                        <p>Amount of servings</p>
                    </div>
                </div>
            </div>
            <div class="info-wrapper" v-else>
                <div class="info unused">
                    <p>{{recipe.unusedIngredients.length}}</p>
                    <i class="material-icons md-18">not_interested</i>
                    <div class="tooltip">
                        <p>Unused ingredients</p>
                        <hr />
                        <ol>
                            <li
                                v-for="(ing, i) of recipe.unusedIngredients"
                                :key="ing.name + i"
                            >{{i + 1 + '. ' + ing.name}}</li>
                        </ol>
                    </div>
                </div>
                <div class="info missed">
                    <p>{{recipe.missedIngredientCount}}</p>
                    <i class="material-icons md-18">playlist_add</i>
                    <div class="tooltip">
                        <p>Missed ingredients</p>
                        <hr />
                        <ol>
                            <li
                                v-for="(ing, i) of recipe.missedIngredients"
                                :key="ing.name + i"
                            >{{i + 1 + '. ' + ing.name}}</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    props: {
        recipe: {
            type: Object,
            required: true,
        },
    },
    computed: mapGetters(["savedRecipesIds"]),
    methods: mapActions(["saveRecipe", "deleteRecipe"]),
};
</script>

<style lang="less" scoped>
.recipe-card {
    display: flex;
    margin: 10px 20px;
    height: 231px;
    width: 480px;
    background-color: @color_firm_quaternary;
    box-shadow: 0px 4px 4px hsla(0, 0%, 0%, 0.2);
    border: 2px solid #cdfcb0;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
        border: 2px solid @color_success_dark;
    }

    img {
        height: 100%;
        max-width: 312px;
    }

    > div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex-grow: 1;
        padding: 8px;
    }
}
.categories {
    display: flex;
    justify-content: flex-end;
}
.title {
    flex: 1;
    color: @color_darkest;
    font-weight: bold;
    text-align: center;
}
.info-wrapper {
    display: flex;
    justify-content: space-around;
    margin-bottom: 14px;
}
.info {
    position: relative;
    display: flex;
    justify-content: center;
    width: 40px;
    padding: 6px 14px;
    border-radius: 10px;

    p {
        margin: 0 6px 0 0;
        font-size: 18px;
        font-weight: bold;
    }
    i {
        font-size: 18px;
        font-weight: bold;
    }

    &.time {
        color: @color_warning_dark;
    }

    &.servings,
    &.missed {
        color: @color_danger_dark;
    }

    &.missed {
        i {
            font-size: 22px;
        }
    }

    .tooltip {
        visibility: hidden;
        opacity: 0;
        box-sizing: border-box;
        position: absolute;
        bottom: 28px;
        width: 160px;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 12px;
        background-color: @color_firm_tertiary;
        color: @color_lightest;
        transition: opacity 0.2s ease-out 0.6s;

        &::after {
            content: " ";
            position: absolute;
            top: 100%;
            left: 50%;
            margin-left: -5px;
            border-width: 9px;
            border-style: solid;
            border-color: @color_firm_tertiary transparent transparent
                transparent;
        }
        p {
            width: 100%;
            text-align: center;
            font-size: 12px;
        }
        ol {
            width: 100%;
            margin: 0;
            padding: 4px;
            text-align: left;
            list-style-type: none;
        }
    }

    &:hover {
        .tooltip {
            visibility: visible;
            opacity: 1;
        }
    }
}
@media screen and (max-width: 500px) {
    .recipe-card {
        box-sizing: border-box;
        width: 96vw;
        height: 150px;
        margin: 2vw;
    }
}
@media screen and (max-width: 470px) {
    .recipe-card {
        > div {
            overflow-y: auto;
        }
    }
    .title {
        font-size: 14px;
    }
    .info {
        p,
        i {
            font-size: 16px;
        }
    }
}
@media screen and (max-width: 340px) {
    .recipe-card {
        img {
            width: 45%;
        }
    }
}
</style>