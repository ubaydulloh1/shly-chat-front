<script>
import axios from 'axios'

export default {
    name: "LoginPageView",
    data() {
        return {
            autocompleteValue: "off",
            showPassword: false,
            user: {
                username: "",
                password: ""
            },
            data: '',
            error: '',
        }
    },
    methods: {
        handleLoginSubmit() {
            if (!this.user.username || !this.user.password) {
                this.error = 'username and password are required!'
                return
            }
            const formData = {
                username: this.user.username,
                password: this.user.password
            }

            this.$store.state.access = ''

            axios.post(
                "/accounts/login/",
                formData
            )
                .then(response => {
                    if (response.status == 200) {
                        return response.data
                    }
                })
                .then(data => {
                    const access = data.access
                    const refresh = data.refresh

                    this.$store.commit("setAccess", access)
                    this.$store.commit("setRefresh", refresh)
                    axios.defaults.headers.common["Authorization"] = "Bearer " + access
                    this.$emit("loggedIn")
                    this.$router.push("/")
                })
                .catch(error => {
                    if (error.code == 'ERR_NETWORK') {
                        this.error = 'Internal server error occured!'
                    } else {
                        this.error = error.response.data.detail
                    }
                })
        }
    }
}
</script>

<template>
    <div class="login">
        <div class="block is-flex is-justify-content-center is-align-content-center">
            <form action="" @submit.prevent="handleLoginSubmit">
                <div class="field">
                    <h2 class="is-size-5">shly.uz | Login</h2>
                </div>

                <div class="field">
                    <p class="control has-icons-left has-icons-right">
                        <input class="input is-success" type="text" placeholder="Enter your username" autocomplete="off"
                            v-model="user.username" ref="usernameInput" required>
                        <span class="icon is-small is-left">
                            <i class="fas fa-at"></i>
                        </span>
                        <span class="icon is-small is-right">
                            <i class="fas fa-check"></i>
                        </span>
                    </p>
                </div>
                <div class="field">
                    <p class="control has-icons-left has-icons-right">
                        <input class="input is-success" v-if="!showPassword" type="password"
                            placeholder="Enter your password" v-model="user.password" ref="passwordInput" required>
                        <input class="input is-success" v-else type="text" placeholder="Enter your password"
                            v-model="user.password">

                        <span class="icon is-small is-left">
                            <i class="fas fa-lock"></i>
                        </span>
                        <span type="button" @click.prevent="showPassword = !showPassword"
                            class="icon showpassword-icon is-small is-right" style="z-index: 20; cursor: pointer;">
                            <i v-if="showPassword" class="fas fa-eye"></i>
                            <i v-else class="fas fa-eye-slash"></i>
                        </span>
                    </p>
                    <p class="help has-text-left"><router-link :to="{ name: 'ResetPassword' }">Forgot?</router-link></p>
                </div>
                <div class="block">
                    <p class="help is-danger has-text-left">{{ error }}</p>
                </div>

                <div class="field">
                    <p class="control">
                        <button class="button is-success" type="submit">
                            Login
                        </button>
                    </p>
                </div>
                <div class="block">
                    <p class="is-size-6">
                        Don't have an account? <router-link :to="{ name: 'Register' }"> Sign up.</router-link>
                    </p>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
.login{
    margin-top: 10%;
}
.control .showpassword-icon {
    pointer-events: initial !important;
}

.control .showpassword-icon:hover {
    color: #444 !important;
}
</style>
