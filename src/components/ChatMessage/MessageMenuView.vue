<script>

export default {
    name: 'MessageMenuView',
    data() {
        return {
            messageContent: ''
        }
    },

    props: {
        msgId: Number,
        message: Object,
    },

    components: {},
    methods: {
        close() {
            this.$emit("closeMenu")
        },
        saveAndEdit() {
            if (!this.messageContent) {
                return
            }
            this.$emit("editMessage", this.messageContent)
        },
        deleteMessage() {
            this.$emit("deleteMessage");
        },
        handleKeyDown(event) {
            if (event.keyCode === 27) {
                this.close()
            }
        }
    },
    mounted() {
        this.messageContent = this.message.content
        window.addEventListener('keydown', this.handleKeyDown);
    },
    beforeUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    },
}
</script>

<template>
    <div class="modal is-active">
        <div class="modal-background" @click="close"></div>
        <div class="modal-content is-flex is-justify-content-center">
            <div class="has-background-white py-2 px-3">
                <form @submit.prevent="saveAndEdit">
                    <p class="p-3">
                        <textarea class="textarea" type="text" v-model="messageContent" required spellcheck="false">
                        </textarea>
                    </p>
                    <ul>
                        <li type="submit" class="button m-1 is-block is-success" @click="saveAndEdit">save & edit</li>
                        <li class="button m-1 is-block">👍</li>
                        <li class="button is-danger is-block m-1" @click="deleteMessage">delete</li>
                    </ul>
                </form>

            </div>

        </div>
    </div>
</template>
  
<style scoped></style>
