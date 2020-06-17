<template>
    <div class="block" v-if="searchType === 'word'">
        <div 
            v-for="(cuisine, idx) of selectedFilters.cuisines"
            :key="cuisine.name + idx"
            class="filter"
        >
            <p>{{cuisine.name}}</p>
            <i 
                class="material-icons md-18" 
                @click="removeFilter({ group: 'cuisines', name: cuisine.name})"
            >clear</i>
        </div>
        <div 
            v-for="(diet, idx) of selectedFilters.diets"
            :key="diet.name + idx"
            class="filter"
        >
            <p>{{diet.name}}</p>
            <i 
                class="material-icons md-18" 
                @click="removeFilter({ group: 'diets', name: diet.name})"
            >clear</i>
        </div>
        <div 
            v-for="(intol, idx) of selectedFilters.intolerances"
            :key="intol.name + idx"
            class="filter"
        >
            <p>{{intol.name}}</p>
            <i 
                class="material-icons md-18" 
                @click="removeFilter({ group: 'intolerances', name: intol.name})"
            >clear</i>
        </div>
    </div>
    <div class="block" v-else>
        <div 
            v-for="(ingredient, idx) of usersIngredients"
            :key="ingredient + idx"
            class="filter"
        >
            <p>{{ingredient}}</p>
            <i 
                class="material-icons md-18" 
                @click="removeUsersIngredient(ingredient)"
            >clear</i>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
    computed: mapGetters(['searchType', 'selectedFilters', 'usersIngredients']),
    methods: {
        ...mapActions(['removeFilter']),
        ...mapMutations(['removeUsersIngredient'])
    }
}
</script>

<style lang="less" scoped>
.block {
    display: flex;
    flex-wrap: wrap;
    width: 60%;
    min-height: 52px;
    margin: 0 auto;
    padding: 16px 0px;

    .filter {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        max-height: 36px;
        margin: 8px 2px;
        padding: 10px 16px;
        font-size: 0.9rem;
        border-radius: 30px;
        background-color: #ddd;
        transition: 0.2s;
        -moz-user-select: none;
        -ms-user-select: none;
        -o-user-select: none;
        -webkit-user-select: none;
        user-select: none;

        p {
            margin: 0 8px 0 0;
        }

        i {
            font-size: 1rem;
            color: #999999;
            cursor: pointer;
        }
    }
}
</style>