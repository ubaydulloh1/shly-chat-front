<script>
import SidebarView from '@/components/Chat/SidebarView.vue'

export default {
  name: 'HomePageView',
  components: {
    SidebarView,
  },
  props: ["myId"],
  data() {
    return {
      isMobile: false,
    }
  },
  methods: {
    updateIsMobile() {
      this.isMobile = window.innerWidth <= 768
    },
  },
  created() {
    this.isMobile = window.innerWidth <= 768
    window.addEventListener("resize", this.updateIsMobile)
  },
  beforeMount() {
    const access = this.$store.state.access
    if (!access) {
      this.$router.push("/login")
    }
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateIsMobile)
  }
}
</script>

<template>
  <div class="home is-flex-tablet" ref="homeRef">
    <div v-if="!isMobile || !$route.params.id" class="chat-sidebar">
      <SidebarView :myId="myId" />
    </div>

    <div class="chat-window">
      <router-view class="chatWindow"></router-view>
    </div>

  </div>
</template>

<style scoped>
.chat-window {
  height: 100%;
  width: 100%;
}

@media screen and (max-width: 768px) {
  .home {
    width: 100%;
    padding: 0 2px;
  }

  .home .chat-sidebar {
    width: 100% !important;
    height: 100% !important;
  }
}

@media screen and (min-width: 769px) and (max-width: 1324px) {
  .home {
    width: 100%;
    display: flex;
    padding: 0 50px;
  }

  .home .chat-sidebar {
    width: 30% !important;
  }

  .home .chat-window {
    width: 70% !important;
  }
}

@media screen and (min-width: 1325px) {
  .home {
    width: 100%;
    display: flex;
    padding: 0 100px;
  }

  .home .chat-sidebar {
    width: 25% !important;
  }

  .home .chat-window {
    width: 70% !important;
  }
}
</style>
