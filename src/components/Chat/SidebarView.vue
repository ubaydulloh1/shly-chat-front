<script>
import axios from 'axios';
import ChatListBlockView from '@/components/Chat/ChatListBlockView.vue'


export default {
  name: 'SidebarView',
  data(){
    return {
      isArchivedOpen: false,
      selectedChatId: 0,
      chats: [],
    }
  },
  props: {},
  components: {
    ChatListBlockView,
  },
  methods: {
    toggleArchived(){
      this.isArchivedOpen = !this.isArchivedOpen;
      this.fetchChats();
    },
    chatSelected(chatId){
      this.selectedChatId = chatId
      this.$emit("selectedChat", chatId)
    },
    fetchChats(){
      axios.get(
      "chat/chatList/",
      {
        params: {
          limit: 10,
          offset: 0,
          is_archived: this.isArchivedOpen,
        }
      }
    )
    .then(response => {
      if (response.status == 200){
        return response.data
      }
    })
    .then(data => {
      this.chats = data.results
    })
    .catch(error => {
      console.log("ERROR: ", error)
    })
    }
  },
  mounted(){
    this.fetchChats();
  }
}
</script>


<template>
  <div>
    <h2 class="is-size-4 is-size-6-mobile px-2 pb-2 has-text-left">Chats</h2>
    <div class="field px-1">
      <p class="control has-icons-left is-size-6-mobile">
        <input class="input is-success is-size-6-mobile" type="text" placeholder="Search"/>
        <span class="icon is-small is-left">
          <i class="fa-solid fa-magnifying-glass"></i>
        </span>
      </p>
    </div>

    <div class="chats-container">
      
      <div @click="toggleArchived" v-if="!isArchivedOpen" class="archived-chat has-background-grey-light has-text-white p-2" onselectstart="return false" onpaste="return false;" onCopy="return false" onCut="return false" onDrag="return false" onDrop="return false">
        <div class="is-flex">
            <div class="px-4 is-flex is-justify-content-center">
              <div class="is-size-7-mobile has-background-light has-text-grey is-flex is-justify-content-center is-align-items-center" style="width: 30px; height: 30px; border-radius: 50%;">
                <i class="fa-solid fa-box-archive"></i>
              </div>
            </div>
            <div class="is-size-7-mobile">
              <p class="has-text-center">Archived conversations</p>
              <p class="has-text-center">2 conversations</p>
            </div>
        </div>
      </div>

      <div @click="toggleArchived" v-else class="close-archived-chat has-background-danger p-4" onselectstart="return false" onpaste="return false;" onCopy="return false" onCut="return false" onDrag="return false" onDrop="return false">
          <p class="is-size-6 is-size-7-mobile"><i class="fa-solid fa-xmark"></i> close</p>
      </div>

      <div id="chat-list" class=""> <!-- has-background-white-ter -->
          <ChatListBlockView v-for="chat in chats" :key="chat.chat.id" :chatObj="chat" @chatSelected="chatSelected(chat.chat.id)" :isSelected="selectedChatId == chat.chat.id"/>
          <div v-if="!chats.length" class="p-5">No chats</div>
      </div>

    </div>
  </div>
  </template>
  
  <style scoped>
  .archived-chat{
    border-radius: 5px;
  }
  .archived-chat:hover{
    cursor: pointer;
  }
  .close-archived-chat{
    border-radius: 5px;
    color: white;
  }
  .close-archived-chat:hover{
    cursor: pointer;
  }

  #chat-list{
    border-radius: 5px;
    max-height: 750px;
    overflow-y: auto;
    scrollbar-width: thin !important;
    scrollbar-color: blue orange;   /* scroll thumb and track */ 
  }
  </style>
  