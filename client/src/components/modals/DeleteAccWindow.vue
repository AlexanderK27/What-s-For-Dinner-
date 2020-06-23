<template>
    <div class="window-wrapper">
        <AppBackdrop />
        <div class="window">
            <div class="message">
                <p>Delete your Account?</p>
                <small>This action is final and you will be unable to recover any data</small>
                <div v-if="agree" class="confirm">
                    <AppInput 
                        type="password"
                        name="password"
                        placeholder="Enter your password to continue"
                        :value="password"
                        :warning="passwordWarning"
                        :showPasswordIcon="true"
                        @input-change="onPasswordInputChange"
                    />
                </div>
            </div>
            <div class="buttons">
                <div class="button-wrap">
                    <AppButton 
                        title="Cancel" 
                        type="fluid neutral bblr" 
                        :disabled="disabled"
                        :onClick="closeWindow" 
                    />
                </div>
                <div class="button-wrap">
                    <AppButton 
                        v-if="!agree" 
                        title="Yes" 
                        type="fluid danger bbrr" 
                        :disabled="disabled"
                        :onClick="onUserAgree" 
                    />
                    <AppButton 
                        v-else 
                        title="Delete" 
                        type="fluid danger bbrr" 
                        :disabled="disabled"
                        :onClick="onDelete" 
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import AppBackdrop from '../ui/AppBackdrop'
import AppButton from '../ui/AppButton'
import AppInput from '../ui/AppInput'
export default {
    components: {
        AppBackdrop,
        AppButton,
        AppInput
    },
    data() {
        return {
            agree: false,
            disabled: false,
            password: '',
            passwordWarning: ''
        }
    },
    methods: {
        ...mapActions(['deleteAccount']),
        ...mapMutations(['showDeleteAccWindow']),
        onUserAgree() {
            this.agree = true
        },
        closeWindow() {
            this.showDeleteAccWindow(false)
        },
        onPasswordInputChange(value) {
            this.password = value
            if (this.passwordWarning && this.password.trim()) {
                this.passwordWarning = ''
            }
        },
        onDelete() {
            if (this.password.trim()) {
                this.disabled = true
                const noop = async () => {
                    await this.deleteAccount(this.password)
                    this.disabled = false
                }
                noop()
            } else {
                this.passwordWarning = 'Please enter your password'
            }
        }
    }
}
</script>

<style lang="less" scoped>
.window-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    z-index: 1500;

    .window {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 90%;
        max-width: 400px;
        margin: auto;
        background-color: #FFFFFF;
        border-radius: 30px;
        box-shadow: 0 10px 24px hsla(0, 0%, 0%, 0.2);
        overflow: hidden;
        z-index: 3000;

        .message {
            display: flex;
            flex-direction: column;
            align-content: center;
            padding: 30px 16px;

            p {
                margin: 8px;
                font-size: 32px;
                color: #333333;
            }

            small {
                margin: 4px 60px;
                color: #777777;
            }

            .confirm {
                width: 80%;
                margin: 10px auto 0px;
            }
        }

        .buttons {
            display: flex;
            width: 100%;
            height: 50px;

            .button-wrap {
                width: 50%;
            }
        }
    }
}
</style>