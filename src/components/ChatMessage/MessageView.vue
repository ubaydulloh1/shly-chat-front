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
  },
  mounted() {
    if (!this.message.is_own_message && !this.message.is_seen) {
      this.$emit("seeMessage", this.message.id);
    }
  },
}
</script>

<template>
  <div class="message-container" :class="{
    'sent-message': chatObj.chat.type != 'CHANNEL' && message.is_own_message,
    'received-message': chatObj.chat.type != 'CHANNEL' && !message.is_own_message
  }" style="width: 100%;">

    <MessageMenuView :message="message" v-if="this.iSshowMessageMenu" @closeMenu="closeMenu" @editMessage="editMessage"
      @deleteMessage="deleteMessage" />

    <div class="is-flex">
      <div v-if="chatObj.chat.type === 'GROUP' && !message.is_own_message" class="pr-2">
        <figure class="image is-32x32">
          <img class="is-rounded" :src="message.sender.avatar ? message.sender.avatar : 'default_avatar.png'">
        </figure>
        <span class="is-size-7 is-italic">{{
          message.sender.first_name.substring(0, 10) }}</span>
      </div>

      <div v-if="chatObj.chat.type === 'PRIVATE' || chatObj.chat.type === 'GROUP'"
        class="message mb-3 has-text-dark has-text-left" :class="{
          'has-background-white-ter': !message.is_own_message,
          'has-background-primary-light': message.is_own_message
        }" @contextmenu.prevent="showMessageMenu(message.id)">
        <p class="py-2 px-3 has-text-left">
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
      <div v-else class="post-message message mb-3" @contextmenu.prevent="showMessageMenu(message.id)">
        <p class="py-2 px-3 has-text-left">
          {{ message.content }}
        </p>

        <div v-if="message.id" class="is-flex is-justify-content-end px-2 pb-2">
          <span v-if="message.is_reacted" class="px-3 pb-3 is-cursor-pointable">👍</span>
          <span class="is-size-7 px-1" v-if="message.is_edited">edited</span>
          <span class="is-size-7">1<i class="fa-solid fa-eye px-1"></i></span>
          <p class="px-1 is-size-7 has-text-right">{{ normalizeMsgDate(message.created_at) }}</p>
        </div>

        <div v-else class="is-flex is-justify-content-end px-2 pb-2">
          <i class="px-1 fa-regular fa-clock is-size-7"></i>
          <p class="px-1 is-size-7 has-text-right">{{ normalizeMsgDate(message.created_at) }}</p>
        </div>

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

.post-message {
  max-width: 1100px;
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
