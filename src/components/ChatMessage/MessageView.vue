<script>

export default {
  name: 'MessageView',
  data(){
    return {}
  },
  
  props: {
    chatObj: Object,
    message: Object,
    created_at: String
  },

  components: {}
}
</script>


<template>
    
    <div v-if="message.recipient.id == chatObj.chat.user.id" class="message-container sent-message" style="width: 100%;">
        <div class="message my-2 has-background-primary-light">

            <p class="p-3 has-text-left">{{ message.content }}</p>
            
            <div class="is-flex is-justify-content-end">
                <span v-if="message.is_reacted" class="px-3 pb-3 is-cursor-pointable">👍</span>

                <span v-if="message.is_seen"><i class="fa-solid fa-check-double has-text-success"></i></span>
                <span v-else><i class="fa-solid fa-check has-text-success"></i></span>

                <p class="px-3 pb-2 is-size-7 has-text-right">{{ created_at }}</p>
            </div>
        </div>
    </div>

    <div v-else-if="message.sender.id == chatObj.chat.user.id" class="message-container received-message">
        <div class="message received-message my-2">
            <p class="p-3 has-text-left">{{ message.content }}</p>
            <div class="is-flex is-justify-content-end">
                <span v-if="message.is_reacted" class="px-3 pb-3 is-cursor-pointable">👍</span>
                <p class="px-3 pb-2 is-size-7 has-text-right">{{ created_at }}</p>
            </div>
        </div>
    </div>


</template>
  
<style scoped>

.message-container {
  display: flex;
}

.message{
  display: block;
  max-width: 700px;
  min-width: 120px;
}
.sent-message{
  justify-content: right;
}
.received-message{
  justify-content: left;
}
.sent-message .message{
  border-radius: 10px 0px 10px 10px;
}
.received-message .message{
  border-radius: 0px 10px 10px 10px;
}
</style>
  