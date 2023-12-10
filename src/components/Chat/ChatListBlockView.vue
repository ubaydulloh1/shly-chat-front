<script>
import { normalizeMsgDate } from '@/utils';

export default {
  name: 'ChatListBlockView',
  data() {
    return {}
  },
  props: ["chatObj", "myId"],
  methods: {
    normalizeMsgDate,
  },
}
</script>


<template>
  <div class="chat-block is-flex">
    <div class="chat-photo p-2">
      <figure class="image is-48x48">
        <img v-if="chatObj.chat.type == 'PRIVATE'" class="is-rounded"
          :src="chatObj.chat.user.avatar ? chatObj.chat.user.avatar : '/default_avatar.png'">
        <img v-else-if="chatObj.chat.type == 'GROUP'" class="is-rounded"
          :src="chatObj.chat.image ? chatObj.chat.image : '/default_group_avatar.svg'">
        <img v-else-if="chatObj.chat.type == 'CHANNEL'" class="is-rounded"
          :src="chatObj.chat.image ? chatObj.chat.image : '/channel_default_avatar.svg'">
      </figure>
    </div>

    <div class="chat-data is-flex is-justify-content-space-between p-2">
      <div style="width: 80%;">
        <h3 class="is-size-6 has-text-left">
          <i class="fa-solid is-size-7 pr-1" :class="{
            'fa-user': chatObj.chat.type === 'PRIVATE',
            'fa-user-group': chatObj.chat.type === 'GROUP',
            'fa-bullhorn': chatObj.chat.type === 'CHANNEL',
          }"></i>
          <span v-if="chatObj.chat.type == 'PRIVATE'">{{ chatObj.chat.user.full_name }}</span>
          <span v-else-if="chatObj.chat.type == 'GROUP' || chatObj.chat.type == 'CHANNEL'">{{ chatObj.chat.name }}</span>
        </h3>
        <p class="is-size-7 has-text-left">
          {{ chatObj.last_message_content }}
        </p>
      </div>
      <div class="is-flex is-flex-direction-column is-justify-content-space-between" style="width: 20%;">
        <p class="is-size-7">{{ normalizeMsgDate(chatObj.last_message_created_at) }}</p>

        <div class="is-flex is-justify-content-space-between">
          <p class="mr-1" v-if="chatObj.last_message_sender_id === myId">
            <i v-if="chatObj.last_message_is_seen" class="fa-solid fa-check-double has-text-success"></i>
            <i v-else class="fa-solid fa-check has-text-success"></i>
          </p>
          <p v-if="chatObj.unseen_messages_count">
            <span class="is-size-7 has-background-primary has-text-white unread-message-count py-1 px-2">{{
              chatObj.unseen_messages_count }}</span>
          </p>
        </div>

      </div>
    </div>
  </div>
</template>
  
<style scoped>
.chat-block {
  width: 100%;
  border-radius: 5px;
}

.chat-photo {
  width: 22%;
}

.chat-data {
  width: 78%;
  overflow-wrap: break-word;
}

.chat-block:hover {
  cursor: pointer;
  background: rgb(241, 241, 241) !important;
}

.image img {
  object-fit: cover !important;
  object-position: center;
  height: 100%;
  width: 100%;
}

.unread-message-count {
  border-radius: 20px;
}
</style>
