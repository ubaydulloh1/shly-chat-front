<script>
export default {
    name: "ProfileHeaderModalView",
    props: [
        "showProfileHeaderModal"
    ],
    data() { },
    methods: {
        closeModal() {
            this.$emit("closeProfileHeaderModal")
        },
        logout() {
            this.$emit("closeProfileHeaderModal")
            this.$emit("logoutClick")
        },
        changePassword() {
            this.$emit("closeProfileHeaderModal")
            this.$router.push("/reset-password")
        },
        openAccountView() {
            this.$emit("openAccountView")
        }
    }
}
</script>

<template>
    <div class="profile-header" :class="{ 'is-active': showProfileHeaderModal }">
        <div class="card">
            <ul class="">
                <div class="is-flex py-2 px-5 is-cursor-pointable">
                    <span class="pr-2">
                        <i class="fa-regular fa-user is-size-6"></i>
                    </span>
                    <li class="" @click="openAccountView">Profile information</li>
                </div>

                <div class="is-flex py-2 px-5 is-cursor-pointable">
                    <span class="pr-2">
                        <i class="fa-solid fa-arrows-spin is-size-6"></i>
                    </span>
                    <li class="" @click="changePassword">Change password</li>
                </div>
                <div class="is-flex has-text-danger py-2 px-5 is-cursor-pointable" @click="logout">
                    <span class="pr-2">
                        <i class="fa-solid fa-right-from-bracket is-size-6"></i>
                    </span>
                    <li class="">Logout</li>
                </div>

            </ul>
        </div>
    </div>
</template>

<style scoped>
.profile-header {
    position: absolute;
    right: 20px;
    top: 50px;
}

.is-cursor-pointable:hover {
    background: rgba(0, 0, 0, 0.02);
}
</style>
