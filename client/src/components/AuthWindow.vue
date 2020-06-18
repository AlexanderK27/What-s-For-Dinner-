<template>
    <div class="wrapper">
        <Backdrop />
        <div class="window">
            <router-link to="/" replace>	
                <i class="material-icons md-24">clear</i>
            </router-link>
            <p>Authorize and save recipes!</p>
            <form @submit.prevent="submitForm('login')">
                <div class="auth-input">
                    <label for="username">Your username</label>
                    <input 
                        type="text" 
                        id="username" 
                        placeholder="John or Master Cheff 42"
                        v-model="username"
                        @input="onUsernameInputChange"
                        @blur="onUsernameInputChange"
                    />
                    <small v-if="usernameWarning">{{usernameWarning}}</small>
                </div>
                <div class="auth-input">
                    <label for="password">Password</label>
                    <input 
                        :type="showPassword ? 'text' : 'password'" 
                        id="password"
                        placeholder="Six or more symbols long"
                        v-model="password"
                        @input="onPasswordInputChange"
                        @blur="onPasswordInputChange"
                    />
                    <i class="material-icons md-18" @click="showAndHidePassword">
                        {{showPassword ? 'visibility_off' : 'visibility'}}
                    </i>
                    <small v-if="passwordWarning">{{passwordWarning}}</small>
                </div>
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
import Backdrop from '../ui/Backdrop'
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
        Backdrop
    },
    methods: {
        ...mapActions(['registrateNewUser', 'login']),
        showAndHidePassword() {
            this.showPassword = !this.showPassword
        },
        onUsernameInputChange() {
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
        onPasswordInputChange() {
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

        .auth-input {
            display: flex;
            flex-direction: column;
        }
    }
}
</style>