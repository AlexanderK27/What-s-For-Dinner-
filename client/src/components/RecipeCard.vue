<template>
    <div class="recipe">
        <img 
            :src="'https://spoonacular.com/recipeImages/' + recipe.id + '-312x231.jpg'"
            :alt="recipe.title + ' image'"
        />
        <div>
            <div class="categories">
                <i class="material-icons md-18">star_outline</i>
            </div>
            <p class="title">{{recipe.title}}</p>
            <div class="info-wrapper">
                <div class="info time">
                    <p>{{recipe.readyInMinutes}}</p>
                    <i class="material-icons md-18">access_time</i>
                </div>
                <div class="info servings">
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
.recipe {
    display: flex;
    margin: 10px 20px;
    height: 231px;
    width: 480px;
    background-color: #DFFCCE;
    box-shadow: 0px 4px 4px hsla(0, 0%, 0%, 0.2);
    border: 2px solid #CDFCB0;

    img {
        height: 100%;
        max-width: 312px;
    }

    >div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex-grow: 1;
        padding: 8px;

        .categories {
            display: flex;
            justify-content: flex-end;
        }
        
        .title {
            flex: 1;
            color: #032003;
            font-weight: bold;
            text-align: center;
        }

        .info-wrapper {
            display: flex;
            justify-content: space-around;
            margin-bottom: 14px;

            .info {
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
                    // background-color: #FF9D5C;
                    color: #FF7D24;
                }

                &.servings {
                    // background-color: #FF9191;
                    color: #DB1818;
                }
            }
        }
    }

}

@media screen and (max-width: 600px) {
    .recipe {
        height: 150px;
    }
}
</style>