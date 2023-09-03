
<script>
export default {
  name: 'ChatListBlockView',
  data(){
    return {}
  },
  props: ["chatObj", "isSelected"],
  methods: {
    chatSelected(){
      this.$emit("chatSelected")
    }
  },
}
</script>


<template>
    <div @click="chatSelected" class="chat-block p-3" :class="{'isSelected': isSelected}">

          <div class="is-flex" v-if="chatObj.chat.type == 'PRIVATE'">
              <div class="p-2">
                  <figure class="image is-48x48">

                    <img v-if="chatObj.chat.user.avatar" class="is-rounded" :src="chatObj.chat.user.avatar">
                    <img v-else class="is-rounded" src="https://bulma.io/images/placeholders/128x128.png">

                  </figure>
              </div>
              <div class="p-2">
                  <h3 class="is-size-6 has-text-left">
                    <i class="fa-solid fa-user is-size-7"></i>
                      {{ chatObj.chat.user.full_name }}
                  </h3>
                  <p class="is-size-7 has-text-left">
                      Lorem ipsum dolor sit amet consectetur.
                  </p>
              </div>
          </div>

          <div class="is-flex" v-else-if="chatObj.chat.type == 'GROUP'">
              <div class="p-2">
                  <figure class="image is-48x48">
                      <img v-if="chatObj.chat.image" class="is-rounded" :src="chatObj.chat.image">
                      <img v-else class="is-rounded" src="https://bulma.io/images/placeholders/128x128.png">
                  </figure>
              </div>
              <div class="p-2">
                  <h3 class="is-size-6 has-text-left">
                    <i class="fa-solid fa-user-group is-size-7"></i>
                      {{ chatObj.chat.name }}
                  </h3>
                  <p class="is-size-7 has-text-left">
                      Lorem ipsum dolor sit amet consectetur.
                  </p>
              </div>
          </div>

          <div class="is-flex" v-else-if="chatObj.chat.type == 'CHANNEL'">
              <div class="p-2">
                  <figure class="image is-48x48">
                      <img v-if="chatObj.chat.image" class="is-rounded" :src="chatObj.chat.image">
                      <img v-else class="is-rounded" src="https://bulma.io/images/placeholders/128x128.png">
                  </figure>
              </div>
              <div class="p-2">
                  <h3 class="is-size-6 has-text-left">
                    <i class="fa-solid fa-bullhorn is-size-7"></i>
                     {{ chatObj.chat.name }}
                  </h3>
                  <p class="is-size-7 has-text-left">
                      Lorem ipsum dolor sit amet consectetur.
                  </p>
              </div>
          </div>

    </div>
</template>
  
  <style scoped>
  .chat-block {
    border-radius: 5px;
  }
  .chat-block:hover{
    cursor: pointer;
    background: rgb(241, 241, 241) !important;
  }
  .image img{
    object-fit: cover !important;
    object-position: center;
    height: 100%;
    width: 100%;
  }
  .isSelected{
    background: rgb(226, 225, 225) !important;
  }
  </style>
  