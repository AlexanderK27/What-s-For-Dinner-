<template>
    <div class="input-field">
        <label :for="name">
            {{label}}
        </label>
        <input 
            :type="inputType" 
            :id="name" 
            :placeholder="placeholder" 
            :class="warning ? 'warning' : 'ok'"
            v-model="inputValue"
            @input="$emit('input-change', inputValue)"
            @blur="$emit('input-change', inputValue)"
        />
        <small v-if="warning">
            {{warning}}
        </small>
        <div v-if="showPasswordIcon" class="icon" @click="onShowPassword">
            <i class="material-icons">
                {{show ? 'visibility_off' : 'visibility'}}
            </i>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        name: { type: String, required: true },
        label: { type: String },
        type: { type: String, default: 'text' },
        placeholder: { type: String },
        value: { type: String },
        warning: { type: String },
        showPasswordIcon: { type: Boolean, default: false }
    },
    data() {
        return {
            show: false,
            inputType: this.type,
            inputValue: this.value
        }
    },
    methods: {
        onShowPassword() {
            this.inputType === 'text' ? this.inputType = 'password' : this.inputType = 'text'
            this.show = !this.show
        }
    }
}
</script>

<style lang="less" scoped>
.input-field {

    input {
        width: 100%;
        padding: 8px 14px;

        &.ok {
            border-color: #AAAAAA;
        }

        &.warning {
            border-color: #CD0000;
        }
    }

    small {
        color: #CD0000;
    }


}
</style>