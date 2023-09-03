<script>
import axios from 'axios'
import ProfileHeaderModalView from '@/components/Modals/ProfileHeaderModalView.vue'

export default {
  name: "App",
  components: {
    ProfileHeaderModalView,
  },
  data(){
    return {
      isUserLogged: false,
      showProfileHeaderModal: false,
      userProfile: {
        "id": null,
        "username": null,
        "avatar": "https://bulma.io/images/placeholders/128x128.png"
      }
    }
  },
  methods: {
    handleLogout(){
      this.$store.commit("removeAccess")
      this.$store.commit("removeRefresh")
      this.$router.push("/login")
    },
    toggleProfileHeader(){
      this.showProfileHeaderModal = !this.showProfileHeaderModal
    }
  },
  beforeCreate(){
    this.$store.commit("initializeStore")
    const access = this.$store.state.access

    if (access){
      axios.defaults.headers.common['Authorization'] = "Bearer " + access
    } else {
      axios.defaults.headers.common['Authorization'] = ""
    }
  },
  created(){
    const access = this.$store.state.access

    if (access){
      this.isUserLogged = true
    }
  },
  mounted(){
    if (this.isUserLogged){
      axios.get("/accounts/me/")
      .then(response => {
        if (response.status == 200){
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
      })
    }
  }
}
</script>


<template>
  <nav class="navbar py-0" role="navigation" aria-label="main navigation">

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item">
          <router-link to="/">Home</router-link>
        </a>
      </div>
      
      <div class="navbar-end" v-if="!isUserLogged">
        <div class="navbar-item">
          <router-link to="/login/">Login</router-link>
        </div>
        <div class="navbar-item">
          <router-link to="/register/">Register</router-link>
        </div>
      </div>

      <div class="navbar-end" v-else>
        <div class="is-flex py-2 px-5">
          <figure class="image is-32x32 is-cursor-pointable" @click="toggleProfileHeader">
            <img class="is-rounded" :src="userProfile.avatar">
          </figure>

          <ProfileHeaderModalView 
          v-if="showProfileHeaderModal" 
          :showProfileHeaderModal="showProfileHeaderModal" 
          @closeProfileHeaderModal="toggleProfileHeader"
          @logoutClick="handleLogout" 
          />

        </div>
      </div>
    </div>
  </nav>


  <router-view :myId="userProfile.id"/>


</template>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.navbar{
  top: 0;
  position: sticky !important;
  width: 100%;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
