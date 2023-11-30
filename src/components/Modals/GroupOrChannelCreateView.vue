<script>
import axios from 'axios';

export default {
    name: "GroupOrChannelCreateView",
    props: ["title", "chat_type"],
    data() {
        return {
            chatName: '',
            isLoading: false
        }
    },
    methods: {
        close() {
            this.$emit("close");
        },
        handleKeyDown(event) {
            if (event.keyCode === 27) {
                this.close()
            }
        },
        submitForm() {
            let endpoint = ''
            if (this.chat_type === "GROUP") {
                endpoint = "/chat/groupCreate/"
            } else if (this.chat_type === "CHANNEL") {
                endpoint = "/chat/channelCreate/"
            }

            axios.post(
                endpoint,
                {
                    name: this.chatName
                }
            ).then(response => {
                if (response.status == 201) {
                    return response.data
                }
            }
            ).then(data => {
                console.log(data)
                this.close()
            }
            ).catch(error => {
                console.log(error)
                this.$router.push("/login")
            }
            )
        },
    },
    mounted() {
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
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">{{ title }}</p>
            </header>
            <section class="modal-card-body">
                <form class="form" @submit.prevent="console.log('SUBMIT')">
                    <div class="control my-5">
                        <label class="is-size-6 mb-3">Name</label>

                        <input type="text" class="input" placeholder="Add name" v-model="chatName" />
                    </div>

                    <div class="buttons">
                        <button class="button is-light" @click="close">Cancel</button>
                        <button class="button is-success" :class="{ 'is-loading': isLoading }"
                            @click="submitForm">Create</button>
                    </div>

                </form>
            </section>
        </div>
    </div>
</template>

<style scoped></style>
