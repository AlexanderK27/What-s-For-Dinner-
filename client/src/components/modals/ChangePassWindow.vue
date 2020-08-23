<template>
    <div class="window-wrapper">
        <div class="window window-sm">
            <div class="window-message">
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
                    <br />
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
            <div class="window-buttons">
                <div class="button-wrap">
                    <AppButton
                        title="Cancel"
                        type="btn-fluid btn-neutral btn-left"
                        :disabled="disabled"
                        :onClick="closeWindow"
                    />
                </div>
                <div class="button-wrap">
                    <AppButton
                        title="Change"
                        type="btn-fluid btn-danger btn-right"
                        :disabled="disabled"
                        :onClick="changePassword"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AppButton from "../ui/AppButton";
import AppInput from "../ui/AppInput";
import { mapMutations, mapActions } from "vuex";
export default {
    components: {
        AppButton,
        AppInput,
    },
    data() {
        return {
            disabled: false,
            oldPassword: "",
            oldPasswordWarning: "",
            newPassword: "",
            newPasswordWarning: "",
            newPasswordTouched: false,
            newPasswordValid: false,
        };
    },
    methods: {
        ...mapActions(["updatePassword"]),
        ...mapMutations(["showChangePassWindow"]),
        closeWindow() {
            this.showChangePassWindow(false);
        },
        onOldPasswordInputChange(value) {
            this.oldPassword = value;
            if (this.oldPasswordWarning && this.oldPassword.trim()) {
                this.oldPasswordWarning = "";
            }
        },
        onNewPasswordInputChange(value) {
            this.newPassword = value;
            this.newPasswordValid = false;
            if (!this.newPasswordTouched && this.newPassword) {
                this.newPasswordTouched = true;
            } else if (this.newPasswordTouched) {
                if (this.newPassword.trim() === "") {
                    this.newPasswordWarning = "Please enter your password";
                } else if (this.newPassword.trim().length < 6) {
                    this.newPasswordWarning = "Password must contain 6 symbols";
                } else if (this.newPasswordWarning) {
                    this.newPasswordWarning = "";
                    this.newPasswordValid = true;
                } else if (!this.newPasswordValid) {
                    this.newPasswordValid = true;
                }
            }
        },
        changePassword() {
            if (!this.oldPassword.trim()) {
                this.oldPasswordWarning = "Please enter your old password";
            } else if (!this.newPasswordValid) {
                return null;
            } else {
                this.disabled = true;
                const noop = async () => {
                    await this.updatePassword({
                        oldPassword: this.oldPassword,
                        newPassword: this.newPassword,
                    });
                    this.disabled = false;
                };
                noop();
            }
        },
    },
};
</script>