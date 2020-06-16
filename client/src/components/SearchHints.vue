<template>
    <div class="block">
        <ul>
            <li 
                v-for="(ingredient, idx) in suggestions"
                :key="ingredient + idx"
                :ref="'hint' + (idx)"
                :tabindex="idx + 1"
                @keyup.up.prevent="passFocus(idx, 'up')"
                @keyup.down.prevent="passFocus(idx, 'down')"
                @keyup.enter="$emit('pick-ingredient', ingredient)"
                @click="$emit('pick-ingredient', ingredient)" 
            >
                {{ingredient.split(match)[0]}}<b>{{match}}</b>{{ingredient.split(match)[1]}}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        suggestions: {
            type: Array,
            required: true
        },
        match: String,
        focused: Boolean
    },
    watch: {
        focused: 'setFocusOnFirstHint'
    },
    methods: {
        setFocusOnFirstHint(val) {
            if (val) {
                this.$refs.hint0[0].focus()
            }
        },
        passFocus(idx, keyType) {
            if (keyType === 'up') {
                if (idx === 0) {
                    this.$emit('focus-on-input')
                } else {
                    this.$refs['hint' + (idx - 1)][0].focus()
                }
            } else if (keyType === 'down') {
                if (idx + 1 !== this.suggestions.length) {
                    this.$refs['hint' + (idx + 1)][0].focus()
                }
            }
            
        }
    }
}
</script>

<style lang="less" scoped>
.block {
    width: 100%;
    padding: 8px 16px;
    background-color: #FFFFFF;

    ul {
        margin: 0;
        padding: 0;
        list-style: none;
        text-align: left;

        li {
            margin-bottom: 3px;
            padding: 8px 12px;
            border-radius: 3px;
            box-shadow: 0 1px 1px 1px hsla(0, 0%, 0%, 0.2);
            cursor: pointer;

            &:hover {
                background-color: #EEEEEE;
            }

            &:focus {
                background-color: #DDDDDD;
                outline: none;
            }
        }
    }
}
</style>