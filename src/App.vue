<script>
import axios from 'axios'
import ProfileHeaderModalView from '@/components/Modals/ProfileHeaderModalView.vue'
import ProfileView from '@/components/User/ProfileView.vue'
import AccountModalView from './components/Modals/AccountModalView.vue'

export default {
  name: "App",
  components: {
    AccountModalView,
    ProfileHeaderModalView,
    ProfileView,
  },
  data() {
    return {
      isUserLogged: false,
      showNavbarMenu: false,
      showProfileHeaderModal: false,
      userProfile: {
        "id": null,
        "username": null,
        "avatar": process.env.BASE_URL + 'default_avatar.png'
      },
      isUserProfileOpen: false,
      openProfileUserId: null,
      isUserAccountViewOpen: false,
    }
  },
  methods: {
    handleLoggedIn() {
      this.isUserLogged = true
      this.fetchMe()
    },
    handleLogout() {
      this.$store.commit("cleanStorage")
      this.isUserLogged = false
      this.$router.push("/login")
    },
    toggleProfileHeader() {
      this.showProfileHeaderModal = !this.showProfileHeaderModal
    },
    fetchMe() {
      if (this.isUserLogged) {
        axios.get("/accounts/me/")
          .then(response => {
            if (response.status == 200) {
              return response.data
            }
          })
          .then(data => {
            this.userProfile.id = data.id
            this.userProfile.username = data.username
            this.userProfile.avatar = data.avatar ? data.avatar : this.userProfile.avatar
          })
          .catch(error => {
            console.log(error)
            this.$router.push("/login")
          })
      }
    },
    showUserProfile(userId) {
      this.openProfileUserId = userId
      this.isUserProfileOpen = true
    },
    closeUserProfile() {
      this.isUserProfileOpen = false,
        this.openProfileUserId = null
    },
    chatSelected(chatId) {
      this.$store.commit("setSelectedChatId", chatId)
      this.closeUserProfile()
      this.$router.push("/")
    },
    toggleAccountView() {
      this.isUserAccountViewOpen = !this.isUserAccountViewOpen;
    }
  },
  beforeCreate() {
    this.$store.commit("initializeStore")
    const access = this.$store.state.access

    if (access) {
      axios.defaults.headers.common['Authorization'] = "Bearer " + access
    } else {
      axios.defaults.headers.common['Authorization'] = ""
    }
  },
  created() {
    const access = this.$store.state.access

    if (access) {
      this.isUserLogged = true
    }
  },
  mounted() {
    this.fetchMe()
  },
}
</script>


<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">

    <div id="navbarBasicExample"
      class="navbar-menu is-active is-flex-mobile is-flex-tablet is-justify-content-space-between py-0">
      <div class="navbar-start is-flex">
        <a class="navbar-item">
          <router-link to="/">Home</router-link>
        </a>
        <a class="navbar-item">
          <router-link to="/users">Explore</router-link>
        </a>
      </div>

      <div class="navbar-end is-flex-mobile" v-if="!isUserLogged">
        <div class="navbar-item">
          <router-link to="/login/">Sign in</router-link>
        </div>
      </div>

      <div class="navbar-end is-flex" v-else>
        <div class="is-flex py-2 px-5">
          <figure class="image is-32x32 is-cursor-pointable" @click="toggleProfileHeader">
            <img class="is-rounded" :src="userProfile.avatar">
          </figure>

          <ProfileHeaderModalView v-if="showProfileHeaderModal" :showProfileHeaderModal="showProfileHeaderModal"
            @closeProfileHeaderModal="toggleProfileHeader" @logoutClick="handleLogout" @openAccountView="toggleAccountView"/>

        </div>
      </div>
    </div>
  </nav>

  <ProfileView v-if="isUserProfileOpen" @close="closeUserProfile" :user-id="openProfileUserId"
    @chatSelected="chatSelected" />
  <AccountModalView v-if="isUserAccountViewOpen" @close="toggleAccountView" />

  <router-view class="router-view" ref="routerViewRef" :myId="userProfile.id" @loggedIn="handleLoggedIn"
    @openProfile="showUserProfile" />
</template>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
  /* overflow-y: auto; */
}

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

nav a.router-link-exact-active {
  color: #42b983;
}

@media screen and (max-width: 768px) {
  .navbar-menu {
    box-shadow: none !important;
  }
}
</style>
