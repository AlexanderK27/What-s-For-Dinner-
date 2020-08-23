<template>
    <button
        :type="action"
        :for="formName"
        :class="type"
        :disabled="disabled"
        @click="onClick"
    >{{title}}</button>
</template>

<script>
export default {
    props: {
        action: { type: String, default: "button" },
        formName: { type: String },
        type: { type: String, default: "neutral" },
        disabled: { type: Boolean },
        onClick: { type: Function, default: function () {} },
        title: { type: String, required: true },
    },
};
</script>

<style lang="less" scoped>
.btn-fluid {
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 14px;
    letter-spacing: 1px;
    text-transform: uppercase;
    border: none;
    outline: none;
    cursor: pointer;

    &:hover,
    &:disabled {
        box-shadow: inset 0px -2px 2px 2px hsla(0, 0%, 0%, 0.2);
        font-size: 13px;
    }
    &:disabled {
        cursor: not-allowed;
    }
    &.btn-neutral {
        background-color: @color_grey_8;
        color: @color_darkest;
    }
    &.btn-danger {
        background-color: @color_danger_dark;
        color: @color_lightest;
    }
    &.btn-secondary {
        background-color: @color_success_dark;
        color: @color_lightest;
    }
    &.btn-left {
        border-bottom-left-radius: 29px;
    }

    &.btn-right {
        border-bottom-right-radius: 29px;
    }
}
</style>