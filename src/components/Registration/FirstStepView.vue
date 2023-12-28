<script>
import axios from 'axios';


export default {
    name: "RegistrationFirstStepView",
    components: {
    },
    data() {
        return {
            email: '',
            password: '',
            emailError: '',
            error: '',
        }
    },
    props: [],
    methods: {
        submit() {
            const url = "accounts/register/"
            axios.post(url, {
                email: this.email,
                password: this.password,
            })
                .then((resp) => {
                    if (resp.status >= 500) {
                        this.error = "Server error occurred!"
                    } else if (resp.status >= 400) {
                        console.log("DATA: ", resp.data);
                        this.emailError = resp.data.email;
                    } else if (resp.status >= 200 && resp.status < 300) {
                        return resp.data
                    }
                })
                .then((data) => {
                    const registrationInfo = {
                        email: this.email,
                        token: data.token,
                    }
                    this.$store.commit("setRegistrationINFO", registrationInfo)
                    this.$router.push("/register/confirm/")
                }).catch(error => {

                    console.log("ERROR: ", error.response.status);
                    if (error.response.status >= 500) {
                        this.error = "Server error occurred!"
                    } else if (error.response.status >= 400) {
                        if (error.response.data.email) {
                            this.emailError = error.response.data.email[0];
                            setTimeout(() => {
                                this.emailError = "";
                            }, 5000)
                        }
                    }
                })
        },
    }
}
</script>


<template>
    <div class="">
        <h1 class="is-size-4">Sign Up</h1>
        <form class="form" @submit.prevent="submit">
            <div class="field has-text-left">
                <p class="control has-icons-left">
                    <input class="input" type="email" placeholder="Email" v-model="email">
                    <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                    </span>
                </p>
                <span v-if="emailError" class="is-size-6 has-text-danger">{{ emailError }}</span>
            </div>
            <div class="field">
                <p class="control has-icons-left">
                    <input class="input" type="password" placeholder="Password" v-model="password">
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p class="control">
                    <button class="button is-success">
                        Sign Up
                    </button>
                </p>
            </div>
        </form>

    </div>
</template>


<style scoped></style>
