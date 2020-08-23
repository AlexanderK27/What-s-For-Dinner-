<template>
    <div class="block">
        <ul>
            <li
                v-for="(ingredient, idx) in suggestions"
                :key="ingredient + idx"
                :ref="'hint' + idx"
                :tabindex="idx + 1"
                @keydown.up.prevent="passFocus(idx, 'up')"
                @keydown.down.prevent="passFocus(idx, 'down')"
                @keyup.enter="$emit('pick-ingredient', ingredient)"
                @click="$emit('pick-ingredient', ingredient)"
            >
                <span>{{ingredient.split(match)[0]}}</span>
                <b>{{match}}</b>
                <span>{{ingredient.split(match)[1]}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        suggestions: {
            type: Array,
            required: true,
        },
        match: String,
        focused: Boolean,
    },
    watch: {
        focused: "setFocusOnFirstHint",
    },
    methods: {
        setFocusOnFirstHint(val) {
            if (val) {
                this.$refs.hint0[0].focus();
            }
        },
        passFocus(idx, keyType) {
            if (keyType === "up") {
                if (idx === 0) {
                    this.$emit("focus-on-input");
                } else {
                    this.$refs["hint" + (idx - 1)][0].focus();
                }
            } else if (keyType === "down") {
                if (idx + 1 !== this.suggestions.length) {
                    this.$refs["hint" + (idx + 1)][0].focus();
                }
            }
        },
    },
};
</script>

<style lang="less" scoped>
.block {
    width: 100%;
    padding: 8px 16px;
    background-color: transparent;

    ul {
        margin: 0;
        padding: 0;
        list-style: none;
        text-align: left;

        li {
            padding: 8px 12px;
            background-color: @color_lightest;
            cursor: pointer;

            &:hover,
            &:focus {
                background-color: @color_grey_9;
            }

            &:focus {
                outline: none;
            }
        }
    }
}
</style>
