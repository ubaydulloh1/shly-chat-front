<script>
import MessageMenuView from '@/components/ChatMessage/MessageMenuView.vue';
import { normalizeMsgDate } from '@/utils'

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
    },
    deleteMessage() {
      this.$emit("deleteMessage", this.message.id)
      this.iSshowMessageMenu = false;
    },
    reactMessage() {
      console.log("DOUBLE CLICKED!");
    },
    normalizeMsgDate,
  }
}
</script>

<template>
  <div class="message-container" :class="{
    'sent-message': message.is_own_message,
    'received-message': !message.is_own_message
  }" style="width: 100%;">

    <MessageMenuView :message="message" v-if="this.iSshowMessageMenu" @closeMenu="closeMenu" @editMessage="editMessage"
      @deleteMessage="deleteMessage" />

    <div class="message my-2 has-text-dark" :class="{
      'has-background-white-ter': !message.is_own_message,
      'has-background-primary-light': message.is_own_message
    }" @contextmenu.prevent="showMessageMenu(message.id)">
      <p class="p-3 has-text-left">
        {{ message.content }}
      </p>

      <div v-if="message.id" class="is-flex is-justify-content-end px-2 pb-2">
        <span v-if="message.is_reacted" class="px-3 pb-3 is-cursor-pointable">👍</span>
        <span class="is-size-7 px-1" v-if="message.is_edited">edited</span>
        <p class="px-1 is-size-7 has-text-right">{{ normalizeMsgDate(message.created_at) }}</p>

        <p v-if="message.is_own_message" class="px-1">
          <span v-if="message.is_seen"><i class="fa-solid fa-check-double has-text-success"></i></span>
          <span v-else><i class="fa-solid fa-check has-text-success"></i></span>
        </p>

      </div>

      <div v-else class="is-flex is-justify-content-end px-2 pb-2">
        <p class="px-1 is-size-7 has-text-right">{{ normalizeMsgDate(message.created_at) }}</p>
        <i class="px-1 fa-regular fa-clock is-size-7"></i>
      </div>

    </div>
  </div>
</template>
  
<style scoped>
.message-container {
  display: flex;
  padding: 0 10px;
}

.message {
  display: block;
  max-width: 700px;
  min-width: 120px;
  overflow-wrap: break-word;
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
