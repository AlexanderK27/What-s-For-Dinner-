<template>
    <div class="window-wrapper">
        <AppBackdrop />
        <div class="window">
            <div class="message">
                <p>Changing password</p>
                <small>Use uppercase letters and special characters to strengthen the password</small>
                <div class="inputs">
                    <AppInput 
                        type="password"
                        name="oldPassword"
                        placeholder="Your old password"
                        :value="oldPassword"
                        :warning="oldPasswordWarning"
                        :showPasswordIcon="true"
                        @input-change="onOldPasswordInputChange"
                    />
                    <br>
                    <AppInput 
                        type="password"
                        name="newPassword"
                        placeholder="Your new password"
                        :value="newPassword"
                        :warning="newPasswordWarning"
                        :showPasswordIcon="true"
                        @input-change="onNewPasswordInputChange"
                    />
                </div>
            </div>
            <div class="buttons">
                <div class="button-wrap">
                    <AppButton 
                        title="Cancel" 
                        type="fluid neutral bblr-30" 
                        :disabled="disabled"
                        :onClick="closeWindow"
                    />
                </div>
                <div class="button-wrap">
                    <AppButton 
                        title="Change" 
                        type="fluid danger bbrr-30" 
                        :disabled='disabled'
                        :onClick="changePassword"    
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AppBackdrop from '../ui/AppBackdrop'
import AppButton from '../ui/AppButton'
import AppInput from '../ui/AppInput'
import { mapMutations, mapActions } from 'vuex'
export default {
    components: {
        AppBackdrop,
        AppButton,
        AppInput
    },
    data() {
        return {
            disabled: false,
            oldPassword: '',
            oldPasswordWarning: '',
            newPassword: '',
            newPasswordWarning: '',
            newPasswordTouched: false,
            newPasswordValid: false
        }
    },
    methods: {
        ...mapActions(['updatePassword']),
        ...mapMutations(['showChangePassWindow']),
        closeWindow() {
            this.showChangePassWindow(false)
        },
        onOldPasswordInputChange(value) {
            this.oldPassword = value
            if (this.oldPasswordWarning && this.oldPassword.trim()) {
                this.oldPasswordWarning = ''
            }
        },
        onNewPasswordInputChange(value) {
            this.newPassword = value
            this.newPasswordValid = false
            if (!this.newPasswordTouched && this.newPassword) {
                this.newPasswordTouched = true
            } else if (this.newPasswordTouched) {
                if (this.newPassword.trim() === '') {
                    this.newPasswordWarning = 'Please enter your password'
                } else if (this.newPassword.trim().length < 6) {
                    this.newPasswordWarning = 'Password must contain 6 symbols'
                } else if (this.newPasswordWarning) {
                    this.newPasswordWarning = ''
                    this.newPasswordValid = true
                } else if (!this.newPasswordValid) {
                    this.newPasswordValid = true
                }
            }
        },
        changePassword() {
            if (!this.oldPassword.trim()) {
                this.oldPasswordWarning = 'Please enter your old password'
            } else if (!this.newPasswordValid) {
                return null
            } else {
                this.disabled = true
                const noop = async () => {
                    await this.updatePassword({
                        oldPassword: this.oldPassword, 
                        newPassword: this.newPassword
                    })
                    this.disabled = false
                }
                noop()
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

            .inputs {
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