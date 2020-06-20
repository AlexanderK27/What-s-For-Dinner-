<template>
    <div class="card" @click="$emit('select-recipe', recipe)">
        <img 
            :src="'https://spoonacular.com/recipeImages/' + recipe.id + '-312x231.jpg'"
            :alt="recipe.title + ' image'"
        />
        <div class="about-recipe">
            <p>{{recipe.title}}</p>
            <div class="icons">
                <div class="time">
                    <p>{{recipe.readyInMinutes}}</p>
                    <i class="material-icons md-18">access_time</i>
                </div>
                <div class="servings">
                    <p>{{recipe.servings}}</p>
                    <i class="material-icons md-18">restaurant</i>
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
    }
}
</script>

<style lang="less" scoped>
.card {
    position: relative;
    width: 100%;
    max-width: 312px;
    overflow: hidden;
    cursor: pointer;
    
    .about-recipe {
        box-sizing: border-box;
        position: absolute;
        left: 0;
        bottom: -41px;
        width: 100%;
        padding: 8px 16px 0px;
        color: #FFFFFF;
        text-align: center;
        font-size: 16px;
        background-color: rgba(0, 0, 0, 0.8);
        transition: 0.5s;

        &:hover {
            bottom: 0;
        }

        .icons {
            display: flex;
            justify-content: space-around;
            width: 200px;
            margin: 0 auto;
            margin-bottom: 14px;

            >div {
                display: flex;
                justify-content: center;
                width: 40px;
                padding: 6px 0px;

                p {
                    margin: 0 6px 0 0;
                    font-size: 18px;
                    // font-weight: bold;
                }

                i {
                    font-size: 18px;
                    // font-weight: bold;
                }

                &.time {
                    color: #FF7D24;
                }

                &.servings {
                    color: #DB1818;
                }
            }
        }
    }
}
</style>