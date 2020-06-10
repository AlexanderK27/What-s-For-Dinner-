<template>
    <div class="search-wrapper">
        <div class="search">
            <form @submit.prevent="getRecipes">
                <input type="text" v-model="searchValue" />
                <i 
                    v-if="searchValue !== ''" 
                    class="material-icons md-24"
                    @click="clearInput"
                >clear</i>
                <button>search</button>
            </form> 
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchValue: '',
            hostname: window.location.hostname === 'localhost' ? 'localhost:8080' : window.location.hostname
        }
    },
    methods: {
        clearInput() {
            this.searchValue = ''
        },
        async getRecipes() {
            try {
                const response = await fetch(`${window.location.protocol}//${this.hostname}/api/recipes/search?title=${this.searchValue}`)
                const recipes = await response.json()

                if (recipes.message) {
                    return this.$emit('get-recipes', false, recipes.message)
                }
                this.$emit('get-recipes', recipes.results)
            } catch (e) {
                console.log(e)
            }
        }
    }
}
</script>

<style lang="less" scoped>
.search-wrapper {
    width: 100%;

    .search {
        position: relative;
        width: 60%;
        margin: 50px auto;

        input {
            box-sizing: border-box;
            width: 100%;
            padding: 10px calc(24% + 33px) 10px 4%;
            border: 2px solid #2CB950;
            border-radius: 20px;
            color: #888888;
            font-weight: bold;
            font-size: 16px;
            outline: none;
        }

        i {
            position: absolute;
            top: 9px;
            right: calc(20% + 9px);
            font-size: 24px;
            color: #BBBBBB;
            transition: 0.2s;
            cursor: pointer;

            &:hover {
                color: #AAAAAA;
            }
        }

        button {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            width: 20%;
            height: 42px;
            background: linear-gradient(120deg, #2CA050 0%, #2CC150 120%);
            color: #FFFFFF;
            text-transform: uppercase;
            letter-spacing: 1px;
            border: none;
            border-top-right-radius: 20px;
            border-bottom-right-radius: 20px;
            outline: none;
            cursor: pointer;
        }
    }
}
</style>