<script>
import axios from 'axios'
import EmojiPicker from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'

import MessageView from '@/components/ChatMessage/MessageView.vue'
import { normalizeMsgDate } from '@/utils'


export default {
  name: 'ChatWindowView',
  data() {
    return {
      inputMessageValue: '',
      chatObj: null,
      isInterlocutorOnline: false,
      isInterlocutorTyping: false,

      webSocket: null,

      allMessageCount: 0,
      messageLimit: 15,
      messageOffset: 0,
      isMessageLoading: false,
      isFetchingMessages: false,
      msgLstDiv: null,
      messages: [],

      amITyping: false,
      typingTimeOut: null,
      showEmojiPicker: false,
    }
  },
  props: ["chatId", "myId"],
  components: {
    MessageView,
    EmojiPicker,
  },
  methods: {
    handleSendMessage(event) {
      event.preventDefault();
      if (this.inputMessageValue.trim() === '') return;
      if (this.chatObj.chat.type === "PRIVATE") {
        this.handlePrivateChatMessage()
      } else if (this.chatObj.chat.type === "GROUP") {
        // TODO handle group message
        console.log()
      } else if (this.chatObj.chat.type === "CHANNEL") {
        // TODO handle channel message
        console.log()
      } else return

      this.$refs.messageInput.focus()
      this.inputMessageValue = ''
    },
    handlePrivateChatMessage() {

      let now = new Date()
      var msg = {
        "id": 0,
        "content": this.inputMessageValue,
        "is_own_message": true,
        "created_at": now.toLocaleDateString("uz", { year: "numeric", month: "numeric", day: "2-digit" }) + " " + now.toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      }
      this.messages.unshift(msg)

      const message = {
        EVENT_TYPE: "private_chat_send_message",
        receiver_id: this.chatObj.chat.user.id,
        message_type: "TEXT",
        message_text: this.inputMessageValue
      }

      if (this.webSocket.readyState == WebSocket.OPEN) {
        this.webSocket.send(JSON.stringify(message))
      }
    },
    createWebsocketConnection(chatId) {
      const access = this.$store.state.access
      const socketUrl = process.env.VUE_APP_BASE_WEBSOCKET_URL + "/chat/" + chatId + "/?token=" + access
      this.webSocket = new WebSocket(socketUrl)

      this.webSocket.addEventListener("open", this.handleSocketOpen)
      this.webSocket.addEventListener("message", this.handleSocketMessage)
      this.webSocket.addEventListener("close", this.handleSocketClose)
      this.webSocket.addEventListener("error", this.handleSocketError)
    },
    closeOldConnection(oldId) {
      console.log(oldId)
      this.webSocket.close()
      this.webSocket = null
    },
    checkUserOnlineStatus(userId) {
      const message = {
        EVENT_TYPE: "check_private_chat_user_online",
        user_id: userId,
      }
      if (this.webSocket.readyState == WebSocket.OPEN) {
        this.webSocket.send(JSON.stringify(message))
      }
    },
    NotifyUserTypingStatus() { },
    handleSocketOpen() {
      if (this.chatObj && this.chatObj.chat.type === 'PRIVATE') {
        this.checkUserOnlineStatus(this.chatObj.chat.user.id)
      }
    },
    handleSocketMessage(event) {

      try {
        const event_data = JSON.parse(event.data)
        const event_type = event_data.EVENT_TYPE

        if (event_type == "private_chat_online_status") {
          const user_id = event_data.user_id

          if (user_id == this.chatObj.chat.user.id) {
            this.isInterlocutorOnline = event_data.is_online
          }
        } else if (event_type == "private_chat_send_message") {
          const message = event_data.message

          for (let i = 0; i < this.messages.length; i++) {
            if (!this.messages[i].id && this.messages[i].content === message.content) {
              this.messages[i] = message;
              break;
            }
          }

          this.scrollToLastMessage()

          if (event_data.message.sender.id === this.myId) {
            // this.$refs.messageAudio.play()
            console.log()
          } else {
            // this.$refs.messageReceiveAudio.play()
            console.log()
          }
        } else if (event_type == "private_chat_user_typing_status") {
          if (event_data.user_id !== this.myId) {
            this.isInterlocutorTyping = event_data.is_typing
          }
        } else if (event_type == "private_chat_edit_message") {
          for (let i = 0; i < this.messages.length; i++) {
            if (this.messages[i].id === event_data.message.id) {
              this.messages[i] = event_data.message;
              break;
            }
          }
        } else if (event_type == "private_chat_message_delete") {
          this.messages = this.messages.filter(message => message.id !== event_data.msg_id)
        }
      } catch {
        console.log("ERROR PARSING WEBSOCKET MESSAGE!")
      }

    },
    handleSocketClose(event) {
      console.log(event)
    },
    handleSocketError(event) {
      console.log(event)
    },
    fetchChat(chatId) {
      axios.get(
        "chat/chatDetail/" + chatId + "/"
      )
        .then(response => {
          if (response.status == 200) {
            return response.data
          }
        })
        .then(data => {
          this.chatObj = data
        })
        .catch(error => {
          console.log(error)
        })
    },
    fetchMessages(chatId) {
      axios.get(
        "/chat/" + chatId + "/messages/?limit=" + this.messageLimit + "&offset=" + this.messageOffset,
      )
        .then(response => {
          if (response.status === 200) {
            return response.data
          }
        })
        .then(data => {
          this.messages.push(...data.results)
          this.allMessageCount = data.count
        })
        .catch(error => {
          console.log(error)
        })
    },
    normalizeMsgDate,
    handleTyping(e) {
      e.preventDefault();
      this.startTyping()

      if (this.typingTimeOut) {
        clearTimeout(this.typingTimeOut)
      }
      this.typingTimeOut = setTimeout(() => {
        this.stopTyping()
      }, 1000)  // 1s
    },
    startTyping() {
      if (this.amITyping) return

      const message = {
        EVENT_TYPE: "private_chat_user_typing_status",
        user_id: this.myId,
        is_typing: true
      }
      if (this.webSocket.readyState == WebSocket.OPEN) {
        this.webSocket.send(JSON.stringify(message))
      }
      this.amITyping = true
    },
    stopTyping() {
      this.amITyping = false
      const message = {
        EVENT_TYPE: "private_chat_user_typing_status",
        user_id: this.myId,
        is_typing: false,
      }
      if (this.webSocket.readyState == WebSocket.OPEN) {
        this.webSocket.send(JSON.stringify(message))
      }
    },
    loadMore(msgLst) {
      if (-msgLst.scrollTop + msgLst.clientHeight + 1 >= msgLst.scrollHeight) {
        if (this.isFetchingMessages) {
          return
        } else {
          this.messageOffset = this.messageOffset + this.messageLimit
          if (this.messageOffset >= this.allMessageCount) {
            return
          }
        }
        this.isFetchingMessages = true

        this.isMessageLoading = true
        setTimeout(() => {
          this.fetchMessages(this.chatId)
          this.isMessageLoading = false
          this.isFetchingMessages = false
        }, 1000)

      }
    },
    handleBackToChats() {
      this.$emit('backToChats')
    },
    scrollToLastMessage() {
      this.$refs.msgLstDiv.scrollTop = this.$refs.msgLstDiv.scrollHeight
    },
    openUserProfile() {
      this.$emit("openProfile", this.chatObj.chat.user.id)
    },
    editMessage(msgId, newMessageContent) {
      const message = {
        EVENT_TYPE: "private_chat_edit_message",
        message_id: msgId,
        message_text: newMessageContent,
      }

      if (this.webSocket.readyState == WebSocket.OPEN) {
        this.webSocket.send(JSON.stringify(message))
      }
    },
    deleteMessage(msgId) {
      const message = {
        EVENT_TYPE: "private_chat_message_delete",
        message_id: msgId,
      }

      if (this.webSocket.readyState == WebSocket.OPEN) {
        this.webSocket.send(JSON.stringify(message))
      }
    },
    onSelectEmoji(emoji) {
      this.inputMessageValue = this.inputMessageValue + emoji.i
      this.$refs.messageInput.focus()
    },
    toggleEmojiPicker() {
      this.showEmojiPicker = !this.showEmojiPicker;
    }
  },
  watch: {
    chatId(newId, oldId) {
      this.fetchChat(newId)
      this.messageOffset = 0
      this.allMessageCount = 0
      this.messages = []
      this.fetchMessages(this.chatId)
      this.closeOldConnection(oldId)
      this.isInterlocutorOnline = false
      this.isInterlocutorTyping = false

      this.createWebsocketConnection(newId)
    },
  },
  mounted() {
    this.fetchChat(this.chatId)
    this.fetchMessages(this.chatId)
    this.createWebsocketConnection(this.chatId)

    setTimeout(() => {
      const msgLst = this.$refs.msgLstDiv
      if (msgLst) {
        msgLst.addEventListener("scroll", () => this.loadMore(msgLst))
      }
    }, 1000)
  },
  beforeUnmount() {
    this.webSocket.close();
  }
}
</script>


<template>
  <div id="chat-area" class="is-flex is-flex-direction-column" v-if="chatObj">

    <div v-if="chatObj.chat.type == 'PRIVATE'" class="chat-profile-header is-flex px-3">
      <div class="is-flex is-justify-content-space-between" style="width: 100%">

        <div class="is-flex">
          <div class="is-flex">
            <div class="p-3 mr-2">
              <i @click="handleBackToChats" class="fa-solid fa-arrow-left is-cursor-pointable"></i>
            </div>
            <figure class="image is-48x48 is-cursor-pointable" @click="openUserProfile">
              <img v-if="chatObj.chat.type == 'PRIVATE' && chatObj.chat.user.avatar" class="is-rounded"
                :src="chatObj.chat.user.avatar">
              <img v-else class="is-rounded" src="../../assets/images/default_avatar.png">
            </figure>

          </div>

          <div class="has-text-left px-4">
            <h4 class="is-size-6 is-cursor-pointable" v-if="chatObj.chat.type == 'PRIVATE'" @click="openUserProfile">
              {{ chatObj.chat.user.first_name }} {{ chatObj.chat.user.last_name }}
            </h4>

            <h4 class="is-size-6 is-cursor-pointable" v-else>
              {{ chatObj.chat.name }}
            </h4>

            <p class="is-size-7 has-text-info typing-text" v-if="isInterlocutorOnline && isInterlocutorTyping">typing ...
            </p>
            <p class="is-size-7 has-text-success" v-else-if="isInterlocutorOnline">online</p>
            <p class="is-size-7" v-else>last seen at {{ normalizeMsgDate(chatObj.chat.user.last_seen_at) }}</p>

          </div>
        </div>

        <div class="is-flex">
          <div class="py-2 px-3">
            <i class="fas fa-search is-cursor-pointable"></i>
          </div>
          <div class="py-2 px-3">
            <i class="fa-solid fa-ellipsis-vertical is-cursor-pointable"></i>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="chatObj.chat.type == 'GROUP'" class="chat-profile-header is-flex px-3">
      <div class="is-flex is-justify-content-space-between" style="width: 100%">
        <div class="is-flex">
          <figure class="image is-48x48 is-cursor-pointable">
            <img class="is-rounded" :src="chatObj.chat.image">
          </figure>

          <div class="has-text-left px-4">
            <h4 class="is-size-6 is-cursor-pointable">
              {{ chatObj.chat.name }}
            </h4>

            <!-- <p class="is-size-7" v-if="isInterlocutorOnline && isInterlocutorTyping">typing ...</p>
              <p class="is-size-7" v-else-if="isInterlocutorOnline">online</p> -->
            <p class="is-size-7">3219 members</p>
          </div>

        </div>
        <div class="is-flex">
          <div class="py-2 px-3">
            <i class="fas fa-search is-cursor-pointable"></i>
          </div>
          <div class="py-2 px-3">
            <i class="fa-solid fa-ellipsis-vertical is-cursor-pointable"></i>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="chatObj.chat.type == 'CHANNEL'" class="chat-profile-header is-flex px-3">
      <div class="is-flex is-justify-content-space-between" style="width: 100%">
        <div class="is-flex">
          <figure class="image is-48x48 is-cursor-pointable">
            <img class="is-rounded" :src="chatObj.chat.image">
          </figure>

          <div class="has-text-left px-4">
            <h4 class="is-size-6 is-cursor-pointable">
              {{ chatObj.chat.name }}
            </h4>

            <p class="is-size-7">3219 subscribers</p>
          </div>

        </div>
        <div class="is-flex">
          <div class="py-2 px-3">
            <i class="fas fa-search is-cursor-pointable"></i>
          </div>
          <div class="py-2 px-3">
            <i class="fa-solid fa-ellipsis-vertical is-cursor-pointable"></i>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="chat-profile-header is-flex px-3">ELSE!</div>

    <div class="chat-container is-flex is-flex-direction-column is-justify-content-space-between">
      <div class="chat-body is-relative">
        <div v-if="isMessageLoading" class="load-more">
          <i class="fa-solid fa-spinner"></i>
        </div>

        <div id="msgLstDiv" class="message-list is-flex is-flex-direction-column-reverse" ref="msgLstDiv">
          <MessageView v-for="(message, index) in messages" :key="index" :message="message" :chatObj="chatObj"
            @editMessage="editMessage" @deleteMessage="deleteMessage" />
        </div>
      </div>

      <div class="message-input-container is-flex is-flex-direction-column">
        <form @submit.prevent="handleSendMessage">

          <div class="is-flex">
            <div class="control emoji-container">
              <i class="far fa-smile is-size-5 is-size-6-mobile" @click="toggleEmojiPicker"></i>
              <EmojiPicker v-if="showEmojiPicker" class="emoji-picker" :native="true" @select="onSelectEmoji" />
            </div>
            <div class="control has-icons-left">
              <input ref="messageInput" class="input is-medium" type="text" spellcheck="false"
                placeholder="Send message ..." v-model="inputMessageValue" @input="handleTyping" />
              <span class="messageIcon icon is-small is-left">
                <i class="far fa-smile is-size-5 is-size-6-mobile" @click="toggleEmojiPicker"></i>
              </span>
              <audio hidden="true" ref="messageAudio">
                <source src="../../assets/audio/notification-sound-7062-pixabay.mp3" type="audio/mpeg">
              </audio>
              <audio hidden="true" ref="messageReceiveAudio">
                <source src="../../assets/audio/whatsapp_message_sent.mp3" type="audio/mpeg">
              </audio>
            </div>
            <div class="control">
              <button class="button is-success is-medium" @click="handleSendMessage">
                <i class="far fa-paper-plane is-size-5 is-size-6-mobile"></i>
              </button>
            </div>
            <!-- </div> -->
          </div>

        </form>

      </div>

    </div>
  </div>
</template>

<style>
#chat-area {
  height: 100%;
}

.chat-container {
  height: calc(100% - 48px);
}

.chat-body {
  flex: 1;
  height: calc(100% - 74px);
}

#msgLstDiv {
  height: 100%;
  overflow-y: scroll;
}

::-webkit-scrollbar {
  width: 0px !important;
}

@keyframes typingAnimation {
  0% {
    color: red;
  }

  33% {
    color: aqua;
  }

  66% {
    color: blue;
  }

  100% {
    color: yellowgreen;

  }
}

form {
  position: sticky;
  bottom: 0;
}

.emoji-picker {
  position: absolute;
  bottom: 4em;
}

.messageIcon {
  color: dark !important;
  z-index: 200;
}

.messageIcon:hover {
  cursor: pointer;
}
</style>
