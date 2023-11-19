<script>
import MessageMenuView from '@/components/ChatMessage/MessageMenuView.vue';

export default {
  name: 'MessageView',
  data() {
    return {
      iSshowMessageMenu: false,
    }
  },

  props: {
    chatObj: Object,
    message: Object,
    created_at: String
  },

  components: {
    MessageMenuView,
  },
  methods: {
    showMessageMenu(msgId) {
      this.iSshowMessageMenu = true
      console.log("MENU CONTEXT CLICKED!", msgId)
    },
    closeMenu() {
      this.iSshowMessageMenu = false
    },
    editMessage(newMsgContent) {
      this.$emit("editMessage", this.message.id, newMsgContent)
      this.iSshowMessageMenu = false;
    }
  }
}
</script>

<template>
  <div v-if="message.recipient.id == chatObj.chat.user.id" class="message-container sent-message" style="width: 100%;">

    <MessageMenuView :message="message" v-if="this.iSshowMessageMenu" @closeMenu="closeMenu" @editMessage="editMessage" />

    <div class="message my-2 has-background-primary-light" @contextmenu.prevent="showMessageMenu(message.id)">
      <p class="p-3 has-text-left">{{ message.content }}</p>
      <div class="is-flex is-justify-content-end">
        <span v-if="!message.is_reacted" class="px-3 pb-3 is-cursor-pointable">👍</span>
        <span v-if="message.is_seen"><i class="fa-solid fa-check-double has-text-success"></i></span>
        <span v-else><i class="fa-solid fa-check has-text-success"></i></span>
        <p class="px-3 pb-2 is-size-7 has-text-right">{{ created_at }}</p><span class="is-size-7"
          v-if="message.is_edited">edited</span>
      </div>
    </div>
  </div>

  <div v-else-if="message.sender.id == chatObj.chat.user.id" class="message-container received-message">
    <MessageMenuView :message="message" v-if="this.isShowMessageMenu" @closeMenu="closeMenu" @editMessage="editMessage" />
    <div class="message received-message my-2" @contextmenu.prevent="showMessageMenu(message.id)">
      <p class="p-3 has-text-left">{{ message.content }}</p>
      <div class="is-flex is-justify-content-end">
        <span v-if="!message.is_reacted" class="px-3 pb-3 is-cursor-pointable">👍</span>
        <p class="px-3 pb-2 is-size-7 has-text-right">{{ created_at }}</p><span class="is-size-7"
          v-if="message.is_edited">edited</span>
      </div>
    </div>
  </div>
</template>
  
<style scoped>
.message-container {
  display: flex;
}

.message {
  display: block;
  max-width: 700px;
  min-width: 120px;
}

.sent-message {
  justify-content: right;
}

.received-message {
  justify-content: left;
}

.sent-message .message {
  border-radius: 10px 0px 10px 10px;
}

.received-message .message {
  border-radius: 0px 10px 10px 10px;
}
</style>
