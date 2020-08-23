<template>
    <article class="detailed-recipe">
        <div class="brief">
            <div class="recipe-photo">
                <img :src="recipe.image" :alt="recipe.title + ' image'" />
                <div class="shadow"></div>
            </div>
            <section class="recipe-main">
                <h2>{{recipe.title}}</h2>
                <p class="with-icon">
                    <i class="material-icons md-18">access_time</i>
                    Ready in {{recipe.readyInMinutes}} minutes
                </p>
                <p class="with-icon">
                    <i class="material-icons md-18">restaurant</i>
                    {{recipe.servings}} servings
                </p>
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
                <button
                    class="delete-btn"
                    type="button"
                    @click="$emit('delete-recipe', recipe.id)"
                >delete</button>
            </section>
        </div>
        <div class="details">
            <section class="ingredients" v-if="recipe.extendedIngredients.length">
                <h4>
                    <i class="material-icons">menu_book</i>
                    Ingredients
                </h4>
                <ul>
                    <li
                        v-for="(ingred, idx) in recipe.extendedIngredients"
                        :key="ingred.name + idx"
                        @click="handleChecklist(ingred.name + idx)"
                    >
                        <i
                            v-if="!checklist.includes(ingred.name + idx)"
                            class="material-icons"
                        >check_box_outline_blank</i>
                        <i v-else class="material-icons">check_box</i>
                        {{ingred.measures.metric.unitShort === 'ml' || ingred.measures.metric.unitShort === 'g'
                        ? Math.round(ingred.measures.metric.amount)
                        : ingred.measures.metric.amount}}
                        {{ingred.measures.metric.unitShort}}
                        <b>{{ingred.name}}</b>
                    </li>
                </ul>
            </section>
            <section class="instructions" v-if="recipe.analyzedInstructions.length">
                <h3>Cooking process</h3>
                <div
                    v-for="(step, idx) in recipe.analyzedInstructions[0].steps"
                    :key="'step' + idx"
                    class="step"
                >
                    <i>Step {{idx + 1}}:</i>
                    <p>{{step.step}}</p>
                </div>
            </section>
        </div>
    </article>
</template>

<script>
export default {
    props: {
        recipe: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            checklist: [],
        };
    },
    methods: {
        handleChecklist(name) {
            if (this.checklist.includes(name)) {
                this.checklist = this.checklist.filter((item) => item !== name);
            } else {
                this.checklist.push(name);
            }
        },
    },
};
</script>

<style lang="less" scoped>
.detailed-recipe {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    overflow: auto;

    .brief {
        display: flex;

        .recipe-photo {
            position: relative;

            img {
                height: 100%;
            }

            .shadow {
                position: absolute;
                top: 0;
                right: -10px;
                width: 100%;
                height: 100%;
                background: linear-gradient(
                    to right,
                    transparent 15%,
                    @color_firm_tertiary 98%
                );
            }
        }

        .recipe-main {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 0 16px;
            background-color: @color_firm_tertiary;
            color: @color_lightest;
            z-index: 2;

            .with-icon {
                display: flex;
                align-items: center;

                i {
                    font-size: 22px;
                    margin: -4px 7px 0px 0px;
                }
            }

            p {
                margin: 0.5em 0;
            }

            .delete-btn {
                margin: 12px 0px 0px;
                padding: 6px 14px;
                font-size: 11px;
                letter-spacing: 1px;
                text-transform: uppercase;
                color: @color_lightest;
                background-color: transparent;
                border: 1px solid @color_lightest;
                border-radius: 3px;
                cursor: pointer;
                transition: 0.2s;

                &:hover {
                    color: @color_firm_tertiary;
                    background-color: @color_lightest;
                }
            }
        }
    }

    .details {
        display: flex;
        flex: 1;

        .ingredients {
            width: 320px;
            height: 100%;
            text-align: left;
            background-color: @color_firm_quaternary;

            h4 {
                display: flex;
                align-items: center;
                justify-content: center;

                i {
                    margin: -3px 4px 0px 0px;
                }
            }

            li {
                display: flex;
                align-items: center;
                padding: 6px 0px;
                list-style: none;

                i {
                    margin-right: 14px;
                }
                b {
                    margin-left: 8px;
                }
            }
        }

        .instructions {
            flex: 1;
            height: fit-content;
            padding: 0px 16px 16px;
            text-align: left;

            h3 {
                display: block;
                width: fit-content;
                margin: 18px auto;
                padding-bottom: 8px;
                text-align: center;
                border-bottom: 2px solid @color_firm_tertiary;
            }

            .step {
                i {
                    font-size: 16px;
                    font-weight: bold;
                }
            }
        }
    }
    .step-stuff {
        display: flex;
    }
}
@media screen and (max-width: 900px) {
    .detailed-recipe {
        .brief {
            position: relative;

            .recipe-photo {
                .shadow {
                    background: linear-gradient(
                        to right,
                        transparent 0%,
                        @color_firm_tertiary 75%
                    );
                }
            }
            .recipe-main {
                position: absolute;
                top: 0;
                right: 0;
                width: 380px;
                height: 100%;
            }
        }
    }
}
@media screen and (max-width: 550px) {
    .detailed-recipe {
        .brief {
            flex-wrap: wrap;
            width: 100vw;

            .recipe-photo {
                order: 2;
                width: 100%;
                border-top: 1px solid #0f0f0f;
                overflow: hidden;

                img {
                    width: inherit;
                }
                .shadow {
                    display: none;
                }
            }
            .recipe-main {
                order: 1;
                position: relative;
                box-sizing: border-box;
                width: 100%;
                height: fit-content;
                padding-bottom: 20px;
                border-top: 1px solid #0f0f0f;
            }
        }

        .details {
            flex-wrap: wrap;

            .ingredients {
                width: 100%;
                height: fit-content;
            }
        }
    }
}
</style>