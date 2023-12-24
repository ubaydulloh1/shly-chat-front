<script>
import axios from 'axios'

export default {
    name: "RegisterPageView",
    components: {
    },
    data() {
        return {
            autocompleteValue: "off",
            showPassword: false,
            user: {
                username: "",
                email: "",
                firstName: "",
                lastName: "",
                password: "",
                passwordConfirm: "",
            },
            currentStep: 1,
            registerToken: '',

            isUsernameCheckLoading: false,
            usernameAvailable: false,
            error: '',
            usernameError: '',
            passwordError: '',
        }
    },
    methods: {
        handleSubmit() {
            if (this.user.password !== this.user.passwordConfirm) {
                this.passwordError = "Password didn't match!"
                return
            }
            const formData = {
                username: this.user.username,
                email: this.user.email,
                first_name: this.user.firstName,
                last_name: this.user.lastName,
                password: this.user.password,
            }

            axios.post(
                "/accounts/register/",
                formData
            )
                .then(response => {
                    if (response.status == 201) {
                        return response.data
                    }
                })
                .then(() => {
                    this.$router.push("/login")
                })
                .catch(error => {
                    console.log(error)

                    if (error.response) {
                        if (error.response.status === 500) {
                            this.error = 'Internal server error occurred!';
                        } else if (error.response.status === 400) {
                            const data = error.response.data
                            this.usernameError = data.username ? data.username[0] : ''
                            this.passwordError = data.password ? data.password[0] : ''
                        }
                    } else if (error.request) {
                        this.error = 'Network error occurred!';
                    } else {
                        this.error = 'An error occurred while processing your request.';
                    }
                })

        },
        checkUsername() {
            console.log("========")

            if (this.user.username.length <= 3) {
                this.usernameAvailable = false
                return
            }

            this.isUsernameCheckLoading = true
            setTimeout(
                () => {
                    axios.get(
                        "/accounts/check-username-available",
                        {
                            params: {
                                username: this.user.username
                            }
                        }
                    )
                        .then(response => {
                            if (response.status == 200) {
                                return response.data
                            }
                        })
                        .then(data => {
                            this.usernameAvailable = data.is_available
                            if (this.usernameAvailable) {
                                this.usernameError = ''
                            } else {
                                this.usernameError = 'This username is not available.'
                            }
                        })
                        .catch(error => {
                            console.log(error)
                        })
                    this.isUsernameCheckLoading = false
                }, 400
            )
        },
        secondStep(registerToken) {
            console.log("TOKEN: ", registerToken);
            this.currentStep = 2;
        },
    },
    beforeMount() {
        const access = this.$store.state.access

        if (access) {
            this.$router.push("/")
        }
    }
}
</script>

<template>
    <div class="register is-flex is-justify-content-center">

        <div class="px-6">
            <router-view></router-view>
        </div>

    </div>
</template>

<style scoped>
.register {
    margin-top: 10%;
}

.control .showpassword-icon {
    pointer-events: initial !important;
}

.control .showpassword-icon:hover {
    color: #444 !important;
}
</style>
