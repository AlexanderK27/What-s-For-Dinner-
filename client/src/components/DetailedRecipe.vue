<template>
    <div class="wrapper">
        <div class="brief">
            <div class="recipe-photo">
                <img :src="recipe.image" :alt="recipe.title + ' image'" />
                <div class="shadow"></div>
            </div>
            <div class="recipe-main">
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
        </div>
        <div class="details">
            <div class="ingredients" v-if="recipe.extendedIngredients.length">
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
                        <i v-if="!checklist.includes(ingred.name + idx)" class="material-icons">
                            check_box_outline_blank
                        </i>
                        <i v-else class="material-icons">check_box</i>
                        {{ingred.measures.metric.unitShort === 'ml' || ingred.measures.metric.unitShort === 'g'
                            ? Math.round(ingred.measures.metric.amount)
                            : ingred.measures.metric.amount}}
                        {{ingred.measures.metric.unitShort}}
                        <b>{{ingred.name}}</b>
                    </li>
                </ul>
            </div>
            <div class="instructions" v-if="recipe.analyzedInstructions.length">
                <h3>Cooking process</h3>
                <div 
                    v-for="(step, idx) in recipe.analyzedInstructions[0].steps"
                    :key="'step' + idx"
                    class="step"
                >
                    <i>Step {{idx + 1}}:</i>
                    <p>{{step.step}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        recipe: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            checklist: []
        }
    },
    methods: {
        handleChecklist(name) {
            if (this.checklist.includes(name)) {
                this.checklist = this.checklist.filter(item => item !== name)
            } else {
                this.checklist.push(name)
            }
        }
    }
}
</script>

<style lang="less" scoped>
.wrapper {
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
                background: linear-gradient(to right, transparent 15%, #2C3E50 98%);
            }
        }

        .recipe-main {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 0 16px;
            background-color: #2C3E50;
            color: #FFFFFF;

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
        }
    }

    .details {
        display: flex;

        .ingredients {
            width: 320px;
            text-align: left;
            background-color: #DEFCCB;

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
            padding: 0px 16px;
            text-align: left;

            h3 {
                display: block;
                width: fit-content;
                margin: 18px auto;
                padding-bottom: 8px;
                text-align: center;
                border-bottom: 2px solid #2C3E50;
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
</style>