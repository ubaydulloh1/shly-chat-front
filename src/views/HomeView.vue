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
  data(){
    return {
      isMobile: false,
      isChatSelected: false,
      selectedChatId: null
    }
  },
  methods: {
    chatSelected(chatId){
      this.selectedChatId = chatId
      this.isChatSelected = true
    },
    backToChats(){
      this.isChatSelected = false
      this.selectedChatId = null
      console.log("IS CHAT SELECTED: ", this.isChatSelected)
    },
    updateIsMobile(){
      this.isMobile = window.innerWidth <= 768
    },
  },
  created(){
    this.isMobile = window.innerWidth <= 768

    window.addEventListener("resize", this.updateIsMobile)
  },
  beforeMount(){
    const access = this.$store.state.access
    if (!access){
      this.$router.push("/login")
    }
  },
  beforeUnmount(){
    window.removeEventListener('resize', this.updateIsMobile)
  }
}
</script>

<template>
  <div class="home is-flex-desktop is-flex-tablet">
    <div v-if="!isChatSelected | !isMobile" class="chat-sidebar">
      <SidebarView @selectedChat="chatSelected"/>
    </div>
    
    <div class="chat-window" v-if="isChatSelected">
      <ChatWindowView :chatId="selectedChatId" :myId="myId" @backToChats="backToChats"/>
    </div>

    <div class="chat-window" v-else-if="!isChatSelected && !isMobile">
      <dev class="">
        <p>Please select chat to message.</p>
      </dev>
    </div>

  </div>
</template>

<style scoped>

.chat-window{
  height: 100%;
  width: 100%;
}

@media screen and (max-width: 768px) {
  .home{
    padding: 0 0px;
  }
}
@media screen and (min-width: 769px) and (max-width: 1324px) {
  .home{
    padding: 0 50px;
  }
}

@media screen and (min-width: 1325px) {
  .home{
    padding: 0 100px;
  }
}

</style>
