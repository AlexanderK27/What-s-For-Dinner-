<template>
    <div class="wrapper">
        <AppBackdrop />
        <div class="window">
            <router-link to="/" replace>	
                <i class="material-icons md-24">clear</i>
            </router-link>
            <p>Authorize and save recipes!</p>
            <form @submit.prevent="submitForm('login')">
                <AppInput 
                    :name="'username'"
                    :label="'Your username'"
                    :type="'text'"
                    :placeholder="'John or Master Cheff 42'"
                    :value="username"
                    :warning="usernameWarning"
                    @input-change="onUsernameInputChange"
                />
                <AppInput 
                    :name="'password'"
                    :label="'Password'"
                    :type="'password'"
                    :placeholder="'Six or more symbols long'"
                    :value="password"
                    :warning="passwordWarning"
                    :showPasswordIcon="true"
                    @input-change="onPasswordInputChange"
                />
                <div class="buttons">
                    <button 
                        type="button" 
                        :disabled="!usernameValid || !passwordValid"
                        @click="submitForm('registrate')"
                    >Registrate</button>
                    <button 
                        type="submit" 
                        :disabled="!usernameValid || !passwordValid"
                    >Log in</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import AppInput from '../ui/AppInput'
import AppBackdrop from '../ui/AppBackdrop'
import { mapActions, mapGetters } from 'vuex'
export default {
    data() {
        return {
            showPassword: false,
            username: '',
            usernameTouched: false,
            usernameWarning: '',
            usernameValid: false,
            password: '',
            passwordTouched: false,
            passwordWarning: '',
            passwordValid: false
        }
    },
    computed: mapGetters(['token']),
    components: {
        AppInput,
        AppBackdrop
    },
    methods: {
        ...mapActions(['registrateNewUser', 'login']),
        onUsernameInputChange(value) {
            this.username = value
            this.usernameValid = false
            if (!this.usernameTouched && this.username) {
                this.usernameTouched = true
            } else if (this.usernameTouched) {
                if (this.username.trim() === '') {
                    this.usernameWarning = 'Please enter your username'
                } else if (this.username.trim().length < 3) {
                    this.usernameWarning = 'Minimum 3 symbols'
                } else if (this.usernameWarning) {
                    this.usernameWarning = ''
                    this.usernameValid = true
                } else if (!this.usernameValid) {
                    this.usernameValid = true
                }
            }
        },
        onPasswordInputChange(value) {
            this.password = value
            this.passwordValid = false
            if (!this.passwordTouched && this.password) {
                this.passwordTouched = true
            } else if (this.passwordTouched) {
                if (this.password.trim() === '') {
                    this.passwordWarning = 'Please enter your password'
                } else if (this.password.trim().length < 6) {
                    this.passwordWarning = 'Minimum 6 symbols'
                } else if (this.passwordWarning) {
                    this.passwordWarning = ''
                    this.passwordValid = true
                } else if (!this.passwordValid) {
                    this.passwordValid = true
                }
            }
        },
        submitForm(type) {
            if (this.usernameValid && this.passwordValid) {
                const userData = {
                    username: this.username,
                    password: this.password
                }
                if (type === 'registrate') {
                    this.registrateNewUser(userData)
                    console.log('registrate', userData)
                } else {
                    this.login(userData)
                    console.log('login', userData)
                }
                
                this.username = ''
                this.password = ''
                this.usernameValid = false
                this.passwordValid = false
                this.usernameTouched = false
                this.passwordTouched = false
            }
        }
    }
}
</script>

<style lang="less" scoped>
.wrapper {
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
        width: 90%;
        max-width: 600px;
        min-height: 300px;
        margin: auto;
        padding: 30px 16px;
        background-color: linen;
        z-index: 3000;
    }
}
</style>