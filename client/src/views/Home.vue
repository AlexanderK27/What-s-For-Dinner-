<template>
    <div>
        <h2>Home page</h2>
        <router-link to='profile'>My recipes</router-link>
        <hr>
        <div>
            <button @click="getOneRecipe" >Get recipe</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Home',
    data() {
        return {
            hostname: window.location.hostname === 'localhost' ? 'localhost:8080' : window.location.hostname
        }
    },
    components: {

    },
    methods: {
        getOneRecipe: async function getOneRecipe() {
            try {
                const response = await fetch(`${window.location.protocol}//${this.hostname}/api/recipes/723984`)
                const recipe = await response.json()
                console.log(recipe)
            } catch (e) {
                console.log(e)
            }
        }
    }
}
</script>

<style lang="less" scoped>

</style>