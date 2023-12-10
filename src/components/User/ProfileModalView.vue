<script>
import axios from 'axios'
import { normalizeMsgDate } from '@/utils'

export default {
    name: "ProfileModalView",
    data() {
        return {
            user: Object,
            userError: '',
            error: ''
        }
    },
    props: [],
    methods: {
        startPrivateChat(userId) {
            const formData = {
                type: "PRIVATE",
                user: userId
            }
            axios.post(
                "chat/chatCreate/",
                formData
            )
                .then(response => {
                    if (response.status == 201) {
                        return response.data
                    }
                })
                .then(data => {
                    this.$store.commit("toggleUserProfile");
                    this.$router.push({ "name": "chatWindow", "params": { "id": data.id } });
                })
                .catch(error => {
                    console.log(error)
                    if (error.code == 'ERR_NETWORK') {
                        this.error = 'Internal server error occured!'
                    } else if (error.code == 'ERR_BAD_REQUEST') {
                        const data = error.response.data
                        this.userError = data.user ? data.user[0] : ''
                    } else {
                        console.log("EEEEEEEEEEEEEEEEEEEEEEE")
                    }
                })
        },
        close() {
            this.$store.commit("toggleUserProfile");
        },
        fetchUserProfile(userId) {
            axios.get("accounts/profile/" + userId + "/")
                .then(response => {
                    if (response.status == 200) {
                        return response.data
                    }
                })
                .then(data => {
                    this.user = data
                })
                .catch(err => {
                    console.log(err)
                })
        },
        handleESC(e) {
            if (e.keyCode === 27) {
                this.close()
            }
        },
        normalizeMsgDate
    },
    mounted() {
        if (this.$store.state.isUserProfileOpen && this.$store.state.openUserProfile) {
            this.fetchUserProfile(this.$store.state.openUserProfile);
        }
        window.addEventListener('keydown', this.handleESC);
    },
    beforeUnmount() {
        window.removeEventListener('keydown', this.handleESC);
    },
}
</script>

<template>
    <div class="modal is-active">
        <div class="modal-background" @click="close"></div>
        <div class="modal-content p-2">
            <div class="card has-background-white p-3">

                <div class="is-flex is-justify-content-space-between px-3 pb-5">
                    <div class="is-flex">
                        <div class="px-2">
                            <i @click="close" class="fa-solid fa-arrow-left is-cursor-pointable"></i>
                        </div>
                        <h3 class="px-2">User Profile</h3>
                    </div>
                    <div>
                        <div>
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                        </div>
                    </div>
                </div>

                <div class="is-flex mb-4">
                    <div class="mr-4">
                        <figure class="image is-64x64">
                            <img v-if="user.avatar" class="is-rounded" :src="user.avatar">
                            <img v-else class="is-rounded" src="../../assets/images/default_avatar.png">
                        </figure>
                    </div>
                    <div class="is-flex is-flex-direction-column is-justify-content-space-between p-2 has-text-left">
                        <h2 v-if="user">{{ user.first_name }} {{ user.last_name }}</h2>
                        <h2 v-else>Unknown</h2>
                        <p v-if="user" class="is-size-7">last seen at {{ normalizeMsgDate(user.last_seen_at) }}</p>
                        <p v-else class="is-size-7">last seen at recently</p>
                    </div>
                </div>

                <div class="p-4">
                    <div class="is-flex">
                        <div class="px-4">
                            <span class="is-flex is-justify-content-center is-rounded">
                                <i class="fa-solid fa-info"></i>
                            </span>
                        </div>
                        <ul class="has-text-left">
                            <!-- <li class="mb-4">
                                    <p>{{ user.phone }}</p>
                                    <p class="is-size-7">mobile</p>
                                </li> -->
                            <li class="mb-4">
                                <p v-if="user">@{{ user.username }}</p>
                                <p v-else>@username</p>
                                <p class="is-size-7">username</p>
                            </li>
                            <li class="mb-4">
                                <p v-if="user">{{ user.email }}</p>
                                <p v-else>user@email.com</p>
                                <p class="is-size-7">email</p>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="is-flex is-justify-content-center">
                    <button class="button is-success" @click="startPrivateChat(user.id)">
                        Start private chat
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.modal-background {
    background: rgba(0, 0, 0, 0.1) !important;
}

/* span.is-rounded{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid #222;
} */
</style>
