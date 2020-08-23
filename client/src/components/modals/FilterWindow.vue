<template>
    <div class="window-wrapper">
        <div class="window">
            <div class="filters">
                <p>
                    <i class="material-icons">emoji_flags</i>
                    <span>Cuisines</span>
                </p>
                <div class="cuisines">
                    <p
                        v-for="(cuisine, idx) of cuisines"
                        :key="cuisine.name + idx"
                        :class="
							cuisines[idx].checked
								? 'filter-item checked'
								: 'filter-item'
						"
                        @click="cuisine.checked = !cuisine.checked"
                    >{{ cuisine.name }}</p>
                </div>
                <hr />
                <p>
                    <i class="material-icons">eco</i>
                    <span>Diets*</span>
                </p>
                <div class="diets">
                    <p
                        v-for="(diet, idx) of diets"
                        :key="diet.name + idx"
                        :class="
							diets[idx].checked
								? 'filter-item radio checked'
								: 'filter-item radio'
						"
                        @click="setDiets(diet.name)"
                    >{{ diet.name }}</p>
                </div>
                <small>*only one filter from this category can be selected at a time</small>
                <hr />
                <p>
                    <i class="material-icons">no_food</i>
                    <span>Intolerances</span>
                </p>
                <div class="intolerances">
                    <p
                        v-for="(intol, idx) of intolerances"
                        :key="intol.name + idx"
                        :class="
							intolerances[idx].checked
								? 'filter-item checked'
								: 'filter-item'
						"
                        @click="intol.checked = !intol.checked"
                    >{{ intol.name }}</p>
                </div>
            </div>
            <div class="window-buttons">
                <div class="button-wrap">
                    <AppButton
                        action="button"
                        type="btn-fluid btn-neutral btn-left"
                        title="Close"
                        :onClick="closeWindow"
                    />
                </div>
                <div class="button-wrap">
                    <AppButton
                        action="button"
                        type="btn-fluid btn-secondary btn-right"
                        title="Set filters"
                        :onClick="setFilters"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import AppButton from "../ui/AppButton";
export default {
    components: {
        AppButton,
    },
    data() {
        return {
            filters: {
                cuisines: [
                    { name: "African", checked: false },
                    { name: "American", checked: false },
                    { name: "British", checked: false },
                    { name: "Cajun", checked: false },
                    { name: "Caribbean", checked: false },
                    { name: "Chinese", checked: false },
                    { name: "Eastern European", checked: false },
                    { name: "European", checked: false },
                    { name: "French", checked: false },
                    { name: "German", checked: false },
                    { name: "Greek", checked: false },
                    { name: "Indian", checked: false },
                    { name: "Irish", checked: false },
                    { name: "Italian", checked: false },
                    { name: "Japanese", checked: false },
                    { name: "Jewish", checked: false },
                    { name: "Korean", checked: false },
                    { name: "Latin American", checked: false },
                    { name: "Mediterranean", checked: false },
                    { name: "Mexican", checked: false },
                    { name: "Middle Eastern", checked: false },
                    { name: "Nordic", checked: false },
                    { name: "Southern", checked: false },
                    { name: "Spanish", checked: false },
                    { name: "Thai", checked: false },
                    { name: "Vietnamese", checked: false },
                ],
                diets: [
                    { name: "Gluten Free", checked: false },
                    { name: "Ketogenic", checked: false },
                    { name: "Vegetarian", checked: false },
                    { name: "Lacto-Vegetarian", checked: false },
                    { name: "Ovo-Vegetarian", checked: false },
                    { name: "Vegan", checked: false },
                    { name: "Pescetarian", checked: false },
                    { name: "Paleo", checked: false },
                    { name: "Primal", checked: false },
                    { name: "Whole30", checked: false },
                ],
                intolerances: [
                    { name: "Dairy", checked: false },
                    { name: "Egg", checked: false },
                    { name: "Gluten", checked: false },
                    { name: "Grain", checked: false },
                    { name: "Peanut", checked: false },
                    { name: "Seafood", checked: false },
                    { name: "Sesame", checked: false },
                    { name: "Shellfish", checked: false },
                    { name: "Soy", checked: false },
                    { name: "Sulfite", checked: false },
                    { name: "Tree Nut", checked: false },
                    { name: "Wheat", checked: false },
                ],
            },
        };
    },
    computed: {
        ...mapGetters(["selectedFilters"]),
        cuisines: function () {
            const selCuisines = this.selectedFilters.cuisines.map(
                (item) => item.name
            );
            return this.filters.cuisines.map((item) => {
                if (selCuisines.includes(item.name)) {
                    item.checked = true;
                }
                return item;
            });
        },
        diets: function () {
            const selDiets = this.selectedFilters.diets.map(
                (item) => item.name
            );
            return this.filters.diets.map((item) => {
                if (selDiets.includes(item.name)) {
                    item.checked = true;
                }
                return item;
            });
        },
        intolerances: function () {
            const selIntolerances = this.selectedFilters.intolerances.map(
                (item) => item.name
            );
            return this.filters.intolerances.map((item) => {
                if (selIntolerances.includes(item.name)) {
                    item.checked = true;
                }
                return item;
            });
        },
    },
    methods: {
        ...mapMutations(["showFilterWindow", "setSelectedFilters"]),
        closeWindow() {
            this.showFilterWindow(false);
        },
        setDiets(name) {
            this.diets.forEach((diet) => {
                if (diet.name === name) {
                    diet.checked = !diet.checked;
                } else {
                    diet.checked = false;
                }
            });
        },
        setFilters() {
            const selectedFilters = {};
            selectedFilters.cuisines = this.cuisines.filter(
                (item) => item.checked
            );
            selectedFilters.diets = this.diets.filter((item) => item.checked);
            selectedFilters.intolerances = this.intolerances.filter(
                (item) => item.checked
            );
            this.setSelectedFilters(selectedFilters);
            this.showFilterWindow(false);
        },
    },
};
</script>

<style lang="less" scoped>
.window {
    display: block;
    max-width: 600px;
    height: 70vh;
    max-height: 800px;
}
.filters {
    box-sizing: border-box;
    width: 100%;
    height: calc(100% - 66px);
    overflow: auto;
    padding: 16px 32px;

    > p {
        display: flex;
        justify-content: center;
        align-items: flex-end;

        span {
            padding-left: 3px;
        }
    }

    > div {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        padding: 16px 0px;
    }
}
.filter-item {
    &.radio {
        border-radius: 0px;
    }

    &.checked {
        background-color: @color_danger;
    }
}
.window-buttons {
    padding-top: 16px;
}
</style>
