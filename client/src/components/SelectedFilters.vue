<template>
    <div v-if="searchType === 'word'" class="selected-filters">
        <div
            v-for="(cuisine, idx) of selectedFilters.cuisines"
            :key="cuisine.name + idx"
            class="filter-item"
        >
            <p>{{ cuisine.name }}</p>
            <i
                class="material-icons md-18"
                @click="removeFilter({ group: 'cuisines', name: cuisine.name })"
            >clear</i>
        </div>
        <div
            v-for="(diet, idx) of selectedFilters.diets"
            :key="diet.name + idx"
            class="filter-item"
        >
            <p>{{ diet.name }}</p>
            <i
                class="material-icons md-18"
                @click="removeFilter({ group: 'diets', name: diet.name })"
            >clear</i>
        </div>
        <div
            v-for="(intol, idx) of selectedFilters.intolerances"
            :key="intol.name + idx"
            class="filter-item"
        >
            <p>{{ intol.name }}</p>
            <i
                class="material-icons md-18"
                @click="
					removeFilter({ group: 'intolerances', name: intol.name })
				"
            >clear</i>
        </div>
    </div>
    <div v-else class="selected-filters">
        <div
            v-for="(ingredient, idx) of usersIngredients"
            :key="ingredient + idx"
            class="filter-item"
        >
            <p>{{ ingredient }}</p>
            <i class="material-icons md-18" @click="removeUsersIngredient(ingredient)">clear</i>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
    computed: mapGetters(["searchType", "selectedFilters", "usersIngredients"]),
    methods: {
        ...mapActions(["removeFilter"]),
        ...mapMutations(["removeUsersIngredient"]),
    },
};
</script>

<style lang="less" scoped>
.selected-filters {
    display: flex;
    flex-wrap: wrap;
    width: 60%;
    min-height: 52px;
    margin: 0 auto;
    padding: 16px 0px;

    .filter-item {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        max-height: 36px;

        p {
            margin: 0 8px 0 0;
        }

        i {
            font-size: 1rem;
            color: @color_grey_6;
            cursor: pointer;
        }
    }
}

@media screen and (max-width: 830px) {
    .selected-filters {
        width: 90%;
    }
}
</style>
