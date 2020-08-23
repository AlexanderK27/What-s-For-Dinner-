<template>
    <div class="window-wrapper">
        <div class="window window-sm">
            <div class="window-message">
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
                        v-if="!agree"
                        title="Yes"
                        type="btn-fluid btn-danger btn-right"
                        :disabled="disabled"
                        :onClick="onUserAgree"
                    />
                    <AppButton
                        v-else
                        title="Delete"
                        type="btn-fluid btn-danger btn-right"
                        :disabled="disabled"
                        :onClick="onDelete"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import AppButton from "../ui/AppButton";
import AppInput from "../ui/AppInput";
export default {
    components: {
        AppButton,
        AppInput,
    },
    data() {
        return {
            agree: false,
            disabled: false,
            password: "",
            passwordWarning: "",
        };
    },
    methods: {
        ...mapActions(["deleteAccount"]),
        ...mapMutations(["showDeleteAccWindow"]),
        onUserAgree() {
            this.agree = true;
        },
        closeWindow() {
            this.showDeleteAccWindow(false);
        },
        onPasswordInputChange(value) {
            this.password = value;
            if (this.passwordWarning && this.password.trim()) {
                this.passwordWarning = "";
            }
        },
        onDelete() {
            if (this.password.trim()) {
                this.disabled = true;
                const noop = async () => {
                    await this.deleteAccount(this.password);
                    this.disabled = false;
                };
                noop();
            } else {
                this.passwordWarning = "Please enter your password";
            }
        },
    },
};
</script>

<style lang="less" scoped>
.confirm {
    width: 80%;
    margin: 10px auto 0px;
}
</style>