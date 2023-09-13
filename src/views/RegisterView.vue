<script>
import axios from 'axios'

export default {
    name: "RegisterView",
    data(){
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
            isUsernameCheckLoading: false,
            usernameAvailable: false,
            error: '',
            usernameError: '',
            passwordError: '',
        }
    },
    methods: {
        handleSubmit(){
            if (this.user.password !== this.user.passwordConfirm){
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
                if (response.status == 201){
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
        checkUsername(){
            console.log("========")
            
            if (this.user.username.length <= 3){
                this.usernameAvailable = false
                return
            }
            
            this.isUsernameCheckLoading = true
            setTimeout(
                ()=>{
                    axios.get(
                        "/accounts/check-username-available",
                        {
                            params: {
                                username: this.user.username
                            }
                        }
                    )
                    .then(response => {
                        if (response.status == 200){
                            return response.data
                        }
                    })
                    .then(data => {
                        this.usernameAvailable = data.is_available
                        if (this.usernameAvailable){
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
        }
    },
    beforeMount(){
        const access = this.$store.state.access

        if (access){
            this.$router.push("/")
        }
    }
}
</script>

<template>
    <div class="container">
        <div class="block is-flex is-justify-content-center is-align-content-center">
            <form action="" @submit.prevent="handleSubmit">
                <div class="field">
                    <h2 class="is-size-5">shly.uz | Register</h2>
                </div>

                <div class="field">
                    <p class="control has-icons-left has-icons-right">
                        <input class="input is-success" type="text" placeholder="Enter your username" autocomplete="off" v-model="user.username" @input="checkUsername">
                        <span class="icon is-small is-left">
                            <i class="fas fa-at"></i>
                        </span>
                        <span class="icon is-small is-right is-loading">
                            <div v-if="isUsernameCheckLoading" class="load-more">
                                <i class="fa-solid fa-spinner"></i>
                            </div>
                            <i class="fas fa-check has-text-success" v-else-if="usernameAvailable"></i>
                            <i class="fa-solid fa-xmark has-text-danger" v-else></i>
                        </span>
                    </p>
                    <p class="help has-text-danger has-text-left" v-if="usernameError">{{ usernameError }}</p>

                </div>

                <div class="field">
                    <p class="control has-icons-left has-icons-right">
                        <input class="input is-success" type="email" placeholder="Enter your email" autocomplete="off" v-model="user.email">
                        <span class="icon is-small is-left">
                            <i class="fa-regular fa-envelope"></i>
                        </span>
                        <span class="icon is-small is-right">
                            <i class="fas fa-check"></i>
                        </span>
                    </p>
                </div>

                <div class="field">
                    <p class="control has-icons-left">
                        <input class="input is-success" type="text" placeholder="Enter your firstname" autocomplete="off" v-model="user.firstName">
                        <span class="icon is-small is-left">
                        <i class="fas fa-at"></i>
                        </span>
                    </p>
                </div>

                <div class="field">
                    <p class="control has-icons-left">
                        <input class="input is-success" type="text" placeholder="Enter your lastname" autocomplete="off" v-model="user.lastName">
                        <span class="icon is-small is-left">
                        <i class="fas fa-at"></i>
                        </span>
                    </p>
                </div>

                <div class="field">
                    <p class="control has-icons-left has-icons-right">
                        <input class="input is-success" v-if="!showPassword" type="password" placeholder="Enter your password" v-model="user.password">
                        <input class="input is-success" v-else type="text" placeholder="Enter your password" v-model="user.password">

                        <span class="icon is-small is-left">
                            <i class="fas fa-lock"></i>
                        </span>
                        <span type="button" @click.prevent="showPassword = !showPassword" class="icon showpassword-icon is-small is-right" style="z-index: 20; cursor: pointer;">
                            <i v-if="showPassword" class="fas fa-eye"></i>
                            <i v-else class="fas fa-eye-slash"></i>
                        </span>
                    </p>
                    <p class="help has-text-left has-text-danger" v-if="passwordError">{{ passwordError }}</p>
                </div>

                <div class="field">
                    <p class="control has-icons-left has-icons-right">
                        <input class="input is-success" v-if="!showPassword" type="password" placeholder="Confirm your password" v-model="user.passwordConfirm">
                        <input class="input is-success" v-else type="text" placeholder="Enter your password" v-model="user.passwordConfirm">

                        <span class="icon is-small is-left">
                            <i class="fas fa-lock"></i>
                        </span>
                        <span type="button" @click.prevent="showPassword = !showPassword" class="icon showpassword-icon is-small is-right" style="z-index: 20; cursor: pointer;">
                            <i v-if="showPassword" class="fas fa-eye"></i>
                            <i v-else class="fas fa-eye-slash"></i>
                        </span>
                    </p>
                    <p class="help has-text-left has-text-danger" v-if="passwordError">{{ passwordError }}</p>
                </div>

                <div class="field">
                    <p class="control">
                        <button class="button is-success" type="submit">
                            Register
                        </button>
                    </p>
                </div>

                <p v-if="error" class="help is-danger">{{ error }}</p>
                <div class="block">
                    <p class="is-size-6">
                        Already have an account? <router-link :to="{name:'Login' }"> Sign in.</router-link>
                    </p>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
.control .showpassword-icon {
    pointer-events: initial !important;
}
.control .showpassword-icon:hover {
    color: #444 !important;
}
</style>
