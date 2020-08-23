<template>
	<div class="window-wrapper">
		<div class="window">
			<router-link to="/" replace class="close-icon">
				<i class="material-icons md-24">highlight_off</i>
			</router-link>
			<div class="controls">
				<div class="hat">
					<p>Sign in and save recipes!</p>
					<small
						>No need to search for the same recipe over and over
						again</small
					>
				</div>
				<form @submit.prevent="submitForm('login')">
					<div class="input-control">
						<AppInput
							:name="'username'"
							:label="'Username'"
							:type="'text'"
							:placeholder="'John or Master Cheff 42'"
							:value="username"
							:warning="usernameWarning"
							@input-change="onUsernameInputChange"
						/>
					</div>
					<div class="input-control">
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
					</div>
					<div class="buttons">
						<button
							type="submit"
							class="signin"
							:disabled="!usernameValid || !passwordValid"
						>
							Sign in
						</button>
						<button
							type="button"
							class="signup"
							:disabled="!usernameValid || !passwordValid"
							@click="submitForm('registrate')"
						>
							Create account
						</button>
					</div>
				</form>
				<div class="social-auth">
					<div class="alternative">
						<hr />
						<p>
							<span>or use an existning account</span>
						</p>
					</div>
					<a href="/api/auth/google">
						<div class="social google">
							<img
								src="../../assets/google-icon.jpg"
								alt="google icon"
							/>
							<p>Google</p>
						</div>
					</a>
					<a href="/api/auth/facebook">
						<div class="social facebook">
							<img
								src="../../assets/facebook-icon.png"
								alt="facebook icon"
							/>
							<p>Facebook</p>
						</div>
					</a>
				</div>
			</div>
			<div class="image"></div>
		</div>
	</div>
</template>

<script>
import AppInput from '../ui/AppInput'
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
		AppInput
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
				} else {
					this.login(userData)
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
.window {
	position: relative;
	max-width: 740px;
	min-height: 440px;

	.close-icon {
		position: absolute;
		top: 16px;
		right: 16px;
		z-index: 4000;
		color: @color_lightest;
		transition: 0.2s;

		&:hover {
			color: #2c7750;
		}

		i {
			font-size: 28px;
		}
	}

	.controls {
		width: 55%;
		min-width: 400px;

		a {
			text-decoration: none;
		}

		.hat {
			box-sizing: border-box;
			width: 100%;
			padding: 24px 24px 18px;
			text-align: left;
			background-color: @color_firm_quaternary;

			p {
				margin: 0;
				color: #2c7750;
				font-size: 24px;
				font-weight: bold;
			}
		}

		form {
			padding: 0px 24px 16px;

			.input-control {
				width: 100%;
				margin-top: 14px;
			}

			.buttons {
				width: 100%;
				margin: 18px 0 6px 0;
				text-align: right;

				button {
					padding: 8px 14px;
					font-size: 12px;
					text-transform: uppercase;
					border: none;
					border-radius: 4px;
					cursor: pointer;
					transition: 0.2s;

					&:disabled,
					&:hover {
						opacity: 0.7;
					}
				}

				.signup {
					color: @color_lightest;
					background-color: @color_firm_primary;
				}

				.signin {
					color: #2c7750;
					background-color: @color_lightest;
				}
			}
		}

		.alternative {
			position: relative;

			hr {
				height: 2px;
				border: none;
				background-color: @color_firm_tertiary;
			}

			p {
				position: absolute;
				top: -25px;
				left: 0;
				width: 100%;

				span {
					padding: 0 10px;
					font-size: 12px;
					font-variant: small-caps;
					background-color: @color_lightest;
				}
			}
		}

		.social {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 80%;
			border: 1px solid @color_grey_6;
			border-radius: 4px;
			opacity: 0.7;
			cursor: pointer;
			transition: 0.2s;

			&:hover {
				opacity: 1;
			}

			&.google {
				margin: 18px auto 4px;
				color: @color_grey_3;
			}

			&.facebook {
				margin: 0 auto 20px;
				color: @color_lightest;
				background-color: #325189;

				img {
					margin-top: -1px;
				}
			}

			img {
				width: 12px;
				height: 12px;
			}

			p {
				margin: 8px 4px;
				font-size: 14px;
				font-weight: bold;
			}
		}
	}

	.image {
		width: 45%;
		background-image: url('../../assets/auth-pic.jpg');
		opacity: 0.9;

		image {
			width: 100%;
			height: 100%;
		}
	}
}

@media screen and (max-width: 440px) {
	.window {
		.controls {
			width: 100%;
			min-width: 260px;
		}
		.image {
			display: none;
		}
	}
}
</style>
