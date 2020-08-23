<template>
    <div class="block">
        <div
            v-for="(number, idx) in Array(amountOfPages).fill(0)"
            :key="'pageNumber' + Math.random() + idx"
            :class="idx + 1 === pageNumber ? 'number active' : 'number'"
            @click="changePageNumber(idx + 1)"
        >
            <span>{{ number + idx + 1 }}</span>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
    props: {
        amountOfPages: {
            type: Number,
            required: true,
        },
    },
    computed: mapGetters(["pageNumber"]),
    methods: mapMutations(["changePageNumber"]),
};
</script>

<style lang="less" scoped>
@color_paggination: #70ca70;
.block {
    display: flex;
    padding: 8px 8px 0;
    border-top: 3px solid @color_paggination;

    .number {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 42px;
        height: 40px;
        margin: 8px 6px;
        background-color: @color_grey_10;
        border: 2px solid @color_paggination;
        border-radius: 50%;
        font-weight: bold;
        cursor: pointer;

        &.active {
            background-color: @color_paggination;
            color: @color_lightest;
            text-shadow: @shadow-xs;
        }
    }
}
</style>
