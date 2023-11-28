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
                middleName: '',
            },
            isAccountDataLoading: false,
        }
    },
    methods: {
        fetchAccount() {
            // if (this.isUserLogged) {
            axios.get("/accounts/me/")
                .then(response => {
                    if (response.status == 200) {
                        return response.data
                    }
                })
                .then(data => {
                    this.userAccount.id = data.id;
                    this.userAccount.username = data.username;
                    this.userAccount.avatar = data.avatar ? data.avatar : this.userProfile.avatar;
                    this.userAccount.email = data.email;
                    this.userAccount.firstName = data.first_name;
                    this.userAccount.lastName = data.last_name;
                    this.userAccount.middleName = data.middle_name;

                    setTimeout(() => {
                        this.isAccountDataLoading = false;
                    }, 100)
                })
                .catch(error => {
                    console.log(error)
                    this.$router.push("/login")
                })
            // }
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
        <form class="form">
            <div class="control pt-1 pb-5">
                <div class="is-flex-desktop" style="width: 100%;">
                    <div class="avatar-block is-flex px-5 py-1">
                        <figure class="image is-64x64">
                            <img class="is-rounded" :src="userAccount.avatar ? userAccount.avatar : '/default_avatar.png'">
                        </figure>
                    </div>
                    <div class="avatar-upload file has-name is-success">
                        <label class="file-label">
                            <input class="file-input" type="file" name="resume">
                            <span class="file-cta">
                                <span class="file-icon">
                                    <i class="fas fa-upload"></i>
                                </span>
                                <span class="file-label">
                                    Choose a file…
                                </span>
                            </span>
                            <span class="file-name">
                                Screen Shot 2017-07-29 at 15.54.25.png
                            </span>
                        </label>
                    </div>

                </div>
            </div>
            <div class="control py-1">
                <div class="is-flex-desktop">
                    <h3 class="has-text-right has-text-weight-bold px-3">Username</h3>
                    <input class="input" type="text" placeholder="Username" v-model="userAccount.username" />
                </div>
            </div>
            <div class="control py-1">
                <div class="is-flex-desktop">
                    <h3 class="has-text-right has-text-weight-bold px-3">Email</h3>
                    <input class="input" type="email" placeholder="mail@example.com" v-model="userAccount.email" />
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
                <div class="is-flex-desktop">
                    <h3 class="has-text-right has-text-weight-bold px-3">Middle name</h3>
                    <input class="input" type="text" placeholder="Middle name" v-model="userAccount.middleName" />
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
