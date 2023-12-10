<script>
import ProfileHeaderModalView from '@/components/Modals/ProfileHeaderModalView.vue'

export default {
    name: "NavbarView",
    components: {
        ProfileHeaderModalView,
    },
    data() {
        return {
            showProfileHeaderModal: false,
        }
    },
    props: ["isUserLogged", "userProfile"],
    methods: {
        toggleProfileHeader() {
            this.showProfileHeaderModal = !this.showProfileHeaderModal
        },
        toggleAccountView() {
            this.isUserAccountViewOpen = !this.isUserAccountViewOpen;
        },
        toggleGroupAddModal() {
            this.isAddGroupModalOpen = !this.isAddGroupModalOpen;
        },
        toggleChannelAddModal() {
            this.isAddChannelModalOpen = !this.isAddChannelModalOpen;
        },
        handleLogout() {
            this.$store.commit("cleanStorage")
            // this.isUserLogged = false
            this.$router.push("/login")
        },
    }
}
</script>


<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">

        <div id="navbarBasicExample"
            class="navbar-menu is-active is-flex-mobile is-flex-tablet is-justify-content-space-between py-0">
            <div class="navbar-start is-flex">
                <a class="navbar-item">
                    <router-link class="nvbr-link" to="/">Home</router-link>
                </a>
                <a class="navbar-item">
                    <router-link class="nvbr-link" to="/users">Explore</router-link>
                </a>
            </div>

            <div class="navbar-end is-flex-mobile" v-if="!isUserLogged">
                <div class="navbar-item">
                    <router-link class="nvbr-link" to="/login/">Sign in</router-link>
                </div>
            </div>

            <div class="navbar-end is-flex" v-else>
                <div class="is-flex py-2 px-5">
                    <figure class="image is-32x32 is-cursor-pointable" @click="toggleProfileHeader">
                        <img class="is-rounded" :src="userProfile.avatar">
                    </figure>

                    <ProfileHeaderModalView v-if="showProfileHeaderModal" :showProfileHeaderModal="showProfileHeaderModal"
                        @closeProfileHeaderModal="toggleProfileHeader" @logoutClick="handleLogout"
                        @openAccountView="toggleAccountView" @openGroupAddModal="toggleGroupAddModal"
                        @openChannelAddModal="toggleChannelAddModal" />

                </div>
            </div>
        </div>
    </nav>
</template>


<style>
.navbar {
    height: 50px;
    top: 0;
    position: sticky !important;
    width: 100%;
}

.router-view {
    height: calc(100% - 52px);
}

nav a {
    font-weight: bold;
    color: #2c3e50;
}

nav a.router-link-exact-active.nvbr-link {
    color: #42b983;
}

@media screen and (max-width: 768px) {
    .navbar-menu {
        box-shadow: none !important;
    }
}
</style>
