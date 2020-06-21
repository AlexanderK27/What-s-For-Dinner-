<template>
    <button
        :type="action"
        :for="formName"
        :class="type"
        :disabled="disabled"
        @click="onClick"
    >
        {{title}}
    </button>
</template>

<script>
export default {
    props: {
        action: { type: String, default: 'button' },
        formName: { type: String },
        type: { type: String, default: 'neutral' },
        disabled: { type: Boolean },
        onClick: { type: Function, default: function () {} },
        title: { type: String, required: true }
    }
}
</script>

<style lang="less" scoped>
.fluid {
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 14px;
    letter-spacing: 1px;
    text-transform: uppercase;
    border: none;
    outline: none;
    cursor: pointer;

    &:hover, &:disabled {
        box-shadow: inset 0px -2px 2px 2px hsla(0, 0%, 0%, 0.2);
        font-size: 13px;
    }

    &:disabled {
        cursor: not-allowed;
    }

    &.neutral {
        background-color: #A9A9A9;
        color: #0F0F0F;
    }
    
    &.danger {
        background-color: #CD0000;
        color: #FFFFFF;
    }
    
    &.bblr {
        border-bottom-left-radius: 29px;
    }

    &.bbrr {
        border-bottom-right-radius: 29px;
    }
}
</style>