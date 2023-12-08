<script>
import axios from 'axios'

export default {
    name: "AccountModalView",
    props: [],
    data() {
        return {
            userAccount: {
                id: null,
                avatar: null,
                username: '',
                email: '',
                firstName: "",
                lastName: "",
                middleName: ""
            },
            isSaveLoading: false
        }
    },
    methods: {
        close() {
            this.$emit("close");
        },
        handleKeyDown(event) {
            if (event.keyCode === 27) {
                this.close()
            }
        },
        submitForm() {
            this.isSaveLoading = true;
            setTimeout(() => {
                this.isSaveLoading = false;
            }, 500)
        },
        fetchMe() {
            axios.get("/accounts/me/")
                .then(response => {
                    if (response.status == 200) {
                        return response.data
                    }
                })
                .then(data => {
                    this.userAccount.id = data.id
                    this.userAccount.username = data.username
                    this.userAccount.avatar = data.avatar
                    this.userAccount.email = data.email
                    this.userAccount.firstName = data.first_name
                    this.userAccount.lastName = data.last_name
                    this.userAccount.middleName = data.middle_name
                })
                .catch(error => {
                    console.log(error)
                    this.$router.push("/login")
                })
        }
    },
    mounted() {
        window.addEventListener('keydown', this.handleKeyDown);
        this.fetchMe()
    },
    beforeUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    },
}
</script>

<template>
    <div class="modal is-active">
        <div class="modal-background" @click="close"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Account Settings</p>
            </header>
            <section class="modal-card-body">
                <form class="form" @submit.prevent="submitForm">
                    <div class="is-flex py-2">
                        <div class="px-3 py-1">
                            <figure class="account-photo image is-64x64">
                                <img v-if="userAccount.avatar" class="is-rounded" :src="userAccount.avatar">
                                <img v-else class="is-rounded" src="../../assets/images/default_avatar.png">
                            </figure>
                        </div>
                    </div>
                    <div class="py-2 is-flex">
                        <div class="px-3 py-1">
                            <p><b>Username:</b></p>
                        </div>
                        <div class="control">
                            <input type="text" class="input is-light" v-model="userAccount.username" />
                        </div>
                    </div>

                    <div class="py-2 is-flex">
                        <div class="px-3 py-1">
                            <p><b>Email:</b></p>
                        </div>
                        <div class="control">
                            <input type="email" class="input is-light" v-model="userAccount.email" />
                        </div>
                    </div>

                    <div class="py-2 is-flex">
                        <div class="px-3 py-1">
                            <p><b>First Name:</b></p>
                        </div>
                        <div class="control">
                            <input type="text" class="input is-light" v-model="userAccount.firstName" />
                        </div>
                    </div>

                    <div class="py-2 is-flex">
                        <div class="px-3 py-1">
                            <p><b>Last Name:</b></p>
                        </div>
                        <div class="control">
                            <input type="text" class="input is-light" v-model="userAccount.lastName" />
                        </div>
                    </div>

                    <div class="py-2 is-flex">
                        <div class="px-3 py-1">
                            <p><b>Middle Name:</b></p>
                        </div>
                        <div class="control">
                            <input type="text" class="input is-light" v-model="userAccount.middleName" />
                        </div>
                    </div>

                    <div class="buttons">
                        <button class="button is-light" @click="close">cancel</button>
                        <button class="button is-success" :class="{ 'is-loading': isSaveLoading }"
                            @click="submitForm">save</button>
                    </div>

                </form>
            </section>
        </div>
    </div>
</template>

<style scoped>
.account-photo img:hover {
    cursor: pointer;
}
</style>
