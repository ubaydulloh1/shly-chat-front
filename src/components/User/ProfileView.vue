<script>
import axios from 'axios'
import { normalizeDate } from '@/utils'

export default {
    name: "ProfileView",
    data(){
        return {
            user: Object,
            userError: '',
            error: ''
        }
    },
    props: ["userId"],
    methods: {
        startPrivateChat(userId){
            console.log("SEND MESSAGE WORKED! ", userId)
            const formData = {
                type: "PRIVATE",
                user: userId
            }
            axios.post(
                "chat/chatCreate/",
                formData
            )
            .then(response => {
                if (response.status == 201){
                    return response.data
                }
            })
            .then(data => {
                this.$emit("chatSelected", data.id)
            })
            .catch(error => {
                console.log(error)
                if (error.code == 'ERR_NETWORK'){
                    this.error = 'Internal server error occured!'
                } else if (error.code == 'ERR_BAD_REQUEST') {
                    const data = error.response.data
                    this.userError = data.user ? data.user[0]: ''
                } else {
                    console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
                }
            })
        },
        close(){
            this.$emit("close")
        },
        fetchUserProfile(userId){
            axios.get("accounts/profile/" + userId + "/")
            .then(response => {
                if (response.status == 200){
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
        normalizeDate
    },
    mounted(){
        this.fetchUserProfile(this.userId)
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
                            <img class="is-rounded" :src="user.avatar">
                        </figure>
                    </div>
                    <div class="is-flex is-flex-direction-column is-justify-content-space-between p-2 has-text-left">
                        <h2>{{ user.first_name }} {{ user.last_name }}</h2>
                        <p class="is-size-7">last seen at {{ normalizeDate(user.last_seen_at) }}</p>
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
                                <p>@{{ user.username }}</p>
                                <p class="is-size-7">username</p>
                            </li>
                            <li class="mb-4">
                                <p>{{ user.email }}</p>
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
