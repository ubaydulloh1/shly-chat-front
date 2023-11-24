<script>
import SidebarView from '@/components/Chat/SidebarView.vue'
import ChatWindowView from '@/components/ChatMessage/ChatWindowView.vue'

export default {
  name: 'HomeView',
  components: {
    SidebarView,
    ChatWindowView,
  },
  props: ["myId"],
  data() {
    return {
      isMobile: false,
      isChatSelected: false,
      selectedChatId: null
    }
  },
  methods: {
    chatSelected(chatId) {
      this.selectedChatId = chatId
      this.isChatSelected = true
      this.$store.commit("setSelectedChatId", chatId)
    },
    backToChats() {
      this.isChatSelected = false
      this.selectedChatId = null
      this.$store.commit("removeSelectedChatId")
    },
    updateIsMobile() {
      this.isMobile = window.innerWidth <= 768
    },
  },
  created() {
    const selectedChatId = this.$store.state.selectedChatId
    this.isMobile = window.innerWidth <= 768
    if (selectedChatId) {
      this.isChatSelected = true
      this.selectedChatId = selectedChatId
    }
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
    <div v-if="!isChatSelected | !isMobile" class="chat-sidebar">
      <SidebarView @selectedChat="chatSelected" :myId="myId" />
    </div>

    <div class="chat-window" v-if="isChatSelected">
      <ChatWindowView :chatId="selectedChatId" :myId="myId" @backToChats="backToChats"
        @openProfile="(userId) => { this.$emit('openProfile', userId) }" />
    </div>

    <div class="chat-window" v-else-if="!isChatSelected && !isMobile">
      <dev class="">
        <p>Please select chat to message.</p>
      </dev>
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
