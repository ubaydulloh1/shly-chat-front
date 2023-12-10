<script>
import axios from 'axios'
import NavbarView from '@/components/Navbar/NavbarView.vue'
import ProfileModalView from '@/components/User/ProfileModalView.vue'
import AccountModalView from './components/Modals/AccountModalView.vue'
import GroupOrChannelCreateView from "@/components/Modals/GroupOrChannelCreateView.vue"

export default {
  name: "App",
  components: {
    NavbarView,
    AccountModalView,
    ProfileModalView,
    GroupOrChannelCreateView
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
      isAddGroupModalOpen: false,
      isAddChannelModalOpen: false,
    }
  },
  methods: {
    handleLoggedIn() {
      this.isUserLogged = true
      this.fetchMe()
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

            this.$store.commit("setUserInfo", this.userProfile);
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
    },
    toggleGroupAddModal() {
      this.isAddGroupModalOpen = !this.isAddGroupModalOpen;
    },
    toggleChannelAddModal() {
      this.isAddChannelModalOpen = !this.isAddChannelModalOpen;
    },

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
  <NavbarView :isUserLogged="isUserLogged" :showProfileHeaderModal="showProfileHeaderModal" :userProfile="userProfile" />

  <ProfileModalView v-if="$store.state.isUserProfileOpen" />

  <AccountModalView v-if="isUserAccountViewOpen" @close="toggleAccountView" />

  <GroupOrChannelCreateView v-if="isAddGroupModalOpen" title="Add Group" chat_type="GROUP"
    @close="isAddGroupModalOpen = !isAddGroupModalOpen" />
  <GroupOrChannelCreateView v-if="isAddChannelModalOpen" title="Add Channel" chat_type="CHANNEL"
    @close="isAddChannelModalOpen = !isAddChannelModalOpen" />

  <router-view class="router-view" :myId="userProfile.id" @loggedIn="handleLoggedIn" @openProfile="showUserProfile" />
</template>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
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

nav a.router-link-exact-active.nvbr-link {
  color: #42b983;
}

@media screen and (max-width: 768px) {
  .navbar-menu {
    box-shadow: none !important;
  }
}
</style>
