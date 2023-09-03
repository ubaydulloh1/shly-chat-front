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
      isChatSelected: false,
      selectedChatId: null
    }
  },
  methods: {
    chatSelected(chatId){
      this.selectedChatId = chatId
      this.isChatSelected = true
    }
  },
  beforeMount(){
    const access = this.$store.state.access
    if (!access){
      this.$router.push("/login")
    }
  }
}
</script>

<template>
  <div class="home">
    <div class="columns">
      <div class="column is-3">
        <SidebarView @selectedChat="chatSelected"/>
      </div>
      <div class="column is-9">
        <ChatWindowView v-if="isChatSelected" :chatId="selectedChatId" :myId="myId" />
        <dev v-else class="">
          <p>Please select chat to message.</p>
        </dev>
      </div>
      
    </div>
  </div>
</template>

<style scoped>

@media screen and (min-width: 480px) {
  .home{
    padding: 0 10px;
  }  
}
@media screen and (min-width: 768px) {
  .home{
    padding: 0 50px;
  }  
}

@media screen and (min-width: 1324px) {
  .home{
    padding: 0 100px;
  }  
}

</style>
