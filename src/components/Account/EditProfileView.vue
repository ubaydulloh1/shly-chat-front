<script>
import axios from 'axios';

export default {
    name: "EditProfileView",
    props: [],
    data() {
        return {
            userAccount: {
                id: null,
                username: '',
                email: '',
                avatar: null,
                firstName: '',
                lastName: '',
            },
            tempAvatarInputFile: null,
            isAccountDataLoading: false,
        }
    },
    methods: {
        fetchAccount() {
            axios.get("/accounts/me/")
                .then(response => {
                    if (response.status == 200) {
                        return response.data
                    }
                })
                .then(data => {
                    this.userAccount.id = data.id;
                    this.userAccount.username = data.username;
                    this.userAccount.avatar = data.avatar ? data.avatar : this.userAccount.avatar;
                    this.userAccount.email = data.email;
                    this.userAccount.firstName = data.first_name;
                    this.userAccount.lastName = data.last_name;

                    setTimeout(() => {
                        this.isAccountDataLoading = false;
                    }, 100)
                })
                .catch(error => {
                    console.log(error)
                    this.$router.push("/login")
                })
        },
        onAvatarChange(event) {
            this.tempAvatarInputFile = event.target.files[0];
        },
        updateAccount() {
            let formData = new FormData();
            formData.append("first_name", this.userAccount.firstName)
            formData.append("last_name", this.userAccount.lastName)

            if (this.tempAvatarInputFile) {
                formData.append("avatar", this.tempAvatarInputFile)
            }

            this.isAccountDataLoading = true
            axios.patch(
                "/accounts/me/",
                formData,
                {
                    "headers": {
                        "Content-Type": "multipart/form-data"
                    }
                }
            ).then(resp => {
                if (resp.status == 200) {
                    return resp.data
                }
            }).then(data => {
                this.userAccount.firstName = data.first_name
                this.userAccount.lastName = data.last_name
                this.userAccount.avatar = data.avatar
                this.isAccountDataLoading = false
            }).catch(err => {
                console.log(err)
            })
        }
    },
    beforeMount() {
        this.isAccountDataLoading = true;
        this.fetchAccount();
    }
}
</script>

<template>
    <div class="account-body">
        <h1 class="is-size-5 has-text-left p-5">Edit Profile</h1>
        <form class="form" @submit.prevent="updateAccount">
            <div class="control pt-1 pb-5">
                <div class="is-flex-desktop" style="width: 100%;">
                    <div class="avatar-block is-flex px-5 py-1">
                        <figure class="image is-64x64">
                            <img class="is-rounded" :src="userAccount.avatar ? userAccount.avatar : '/default_avatar.png'">
                        </figure>
                    </div>
                    <div class="avatar-upload file has-name is-success">
                        <label class="file-label">
                            <input class="file-input" type="file" name="resume" accept="image/*" @change="onAvatarChange">
                            <span class="file-cta">
                                <span class="file-icon">
                                    <i class="fas fa-upload"></i>
                                </span>
                                <span class="file-label">
                                    Choose avatar
                                </span>
                            </span>
                            <span v-if="tempAvatarInputFile" class="file-name">
                                {{ tempAvatarInputFile.name }}
                            </span>
                            <span v-else class="file-name">
                                No file chosen
                            </span>
                        </label>
                    </div>

                </div>
            </div>
            <div class="control py-1">
                <div class="is-flex-desktop">
                    <h3 class="has-text-right has-text-weight-bold px-3">Username</h3>
                    <input class="input" type="text" placeholder="Username" v-model="userAccount.username" disabled />
                </div>
            </div>
            <div class="control py-1">
                <div class="is-flex-desktop">
                    <h3 class="has-text-right has-text-weight-bold px-3">Email</h3>
                    <input class="input" type="email" placeholder="mail@example.com" v-model="userAccount.email" disabled />
                </div>
            </div>
            <div class="control py-1">
                <div class="is-flex-desktop">
                    <h3 class="has-text-right has-text-weight-bold px-3">First name</h3>
                    <input class="input" type="text" placeholder="First name" v-model="userAccount.firstName" />
                </div>
            </div>
            <div class="control py-1">
                <div class="is-flex-desktop">
                    <h3 class="has-text-right has-text-weight-bold px-3">Last name</h3>
                    <input class="input" type="text" placeholder="Last name" v-model="userAccount.lastName" />
                </div>
            </div>

            <div class="control py-1">
                <button type="submit" class="button is-success"
                    :class="{ 'is-loading': isAccountDataLoading }">Update</button>
            </div>
        </form>
    </div>
</template>

<style scoped>
@media screen and (max-width: 768px) {
    .account-body {
        width: 100%;
        padding: 0;
    }

    form .control h3,
    .avatar-block {
        width: 100%;
    }

    .avatar-upload {
        width: 100%;
    }
}

@media screen and (min-width: 769px) and (max-width: 1024px) {

    .account-body {
        width: 70%;
    }

    form .control h3,
    .avatar-block {
        width: 30%;
    }

    .avatar-upload {
        width: 70%;
    }
}

@media screen and (min-width: 1025px) {

    .account-body {
        width: 70%;
    }

    form .control h3,
    .avatar-block {
        width: 30%;
    }

    .avatar-upload {
        width: 70%;
    }
}
</style>
