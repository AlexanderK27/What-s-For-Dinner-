<template>
    <div class="window-wrapper" @click="closeWindow">
        <div class="window" @click.stop>
            <i class="material-icons md-32" @click="closeWindow">highlight_off</i>
            <article class="information">
                <section class="about">
                    <h1>Search methods</h1>
                    <hr />
                    <h4>By dish name</h4>
                    <p>
                        To start the search in this mode, you can simply enter the name of a dish,
                        part of it, or even do not write anything at all. Use filters to refine or
                        personalize your search.
                        <br />Available categories:
                    </p>
                    <ul>
                        <li>cuisines of the world (26 options)</li>
                        <li>diets (10 options)</li>
                        <li>intolerances to products (12 options)*</li>
                    </ul>
                    <small>*results may be inaccurate. In order to avoid the effects of allergies, please check the ingredient list before eating.</small>
                    <h4>By ingredients you have</h4>
                    <p>
                        Describe what you have in the fridge and find out what you can cook from it.
                        <br />The amount of used and missing ingredients will be available on each recipe.
                    </p>
                </section>
                <section class="definitions">
                    <h1>Diet Definitions</h1>
                    <hr />
                    <p>
                        <b>Gluten Free</b>
                        <br />Eliminating gluten means avoiding wheat, barley, rye, and other
                        gluten-containing grains and foods made from them (or that may have been cross contaminated).
                    </p>

                    <p>
                        <b>Ketogenic</b>
                        <br />The keto diet is based more on the ratio of fat, protein, and carbs in the diet rather than specific ingredients. Generally speaking, high fat, protein-rich foods are acceptable and high carbohydrate foods are not.
                    </p>

                    <p>
                        <b>Vegetarian</b>
                        <br />No ingredients may contain meat or meat by-products, such as bones or gelatin.
                    </p>

                    <p>
                        <b>Lacto-Vegetarian</b>
                        <br />All ingredients must be vegetarian and none of the ingredients can be or contain egg.
                    </p>

                    <p>
                        <b>Ovo-Vegetarian</b>
                        <br />All ingredients must be vegetarian and none of the ingredients can be or contain dairy.
                    </p>

                    <p>
                        <b>Vegan</b>
                        <br />No ingredients may contain meat or meat by-products, such as bones or gelatin, nor may they contain eggs, dairy, or honey.
                    </p>

                    <p>
                        <b>Pescetarian</b>
                        <br />Everything is allowed except meat and meat by-products - some pescetarians eat eggs and dairy, some do not.
                    </p>

                    <p>
                        <b>Paleo</b>
                        <br />Allowed ingredients include meat (especially grass fed), fish, eggs, vegetables, some oils (e.g. coconut and olive oil), and in smaller quantities, fruit, nuts, and sweet potatoes. We also allow honey and maple syrup (popular in Paleo desserts, but strict Paleo followers may disagree). Ingredients not allowed include legumes (e.g. beans and lentils), grains, dairy, refined sugar, and processed foods.
                    </p>

                    <p>
                        <b>Primal</b>
                        <br />Very similar to Paleo, except dairy is allowed - think raw and full fat milk, butter, ghee, etc.
                    </p>

                    <p>
                        <b>Whole30</b>
                        <br />Allowed ingredients include meat, fish/seafood, eggs, vegetables, fresh fruit, coconut oil, olive oil, small amounts of dried fruit and nuts/seeds. Ingredients not allowed include added sweeteners (natural and artificial, except small amounts of fruit juice), dairy (except clarified butter or ghee), alcohol, grains, legumes (except green beans, sugar snap peas, and snow peas), and food additives, such as carrageenan, MSG, and sulfites.
                    </p>
                </section>
            </article>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
    methods: {
        ...mapMutations(["showAboutWindow"]),
        closeWindow() {
            this.showAboutWindow(false);
        },
    },
};
</script>

<style lang="less" scoped>
.window {
    box-sizing: border-box;
    position: relative;
    max-width: 640px;
    max-height: 80vh;
    padding: 16px 0;

    i {
        z-index: 1;
        position: absolute;
        top: 12px;
        right: 12px;
        font-size: 32px;
        cursor: pointer;
        transition: 0.2s;

        &:hover {
            color: @color_firm_primary;
        }
    }
}
.information {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    margin-right: -4px;
    padding: 0 32px;
    overflow: auto;
    text-align: left;

    li {
        list-style-type: circle;
    }
}
h1 {
    margin: 16px 0;
    font-size: 28px;
    color: @color_firm_primary;
}
@media screen and (min-height: 1000px) {
    .window {
        max-height: 800px;
    }
}
@media screen and (max-width: 800px) {
    .window {
        max-width: 90%;
    }
}
</style>