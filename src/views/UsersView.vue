<script>
import axios from 'axios';
import { normalizeDate } from '@/utils';

export default {
    name: "UsersView",
    data() {
        return {
            users: [],
            limit: 100,
            offset: 0
        }
    },
    methods: {
        fetchUsers() {
            axios.get("/accounts/list/?limit=" + this.limit + "&offset=" + this.offset)
                .then(response => {
                    if (response.status == 200) {
                        return response.data
                    }
                })
                .then(data => {
                    this.users = data.results
                })
                .catch(error => {
                    console.log(error)
                })
        },
        openUserProfile(userId) {
            this.$emit("openProfile", userId)
        },
        normalizeDate
    },
    created() {
        const access = this.$store.state.access

        if (!access) {
            this.$router.push("/login")
        }
    },
    mounted() {
        this.fetchUsers()
    },
}
</script>

<template>
    <div class="container not-found py-6 px-4">
        <div class="columns is-multiline">

            <div v-for="user in users" :key="user.id" class="column is-3-desktop is-6-tablet is-12-mobile">
                <div class="card is-inline-block is-cursor-pointable" @click="openUserProfile(user.id)">
                    <div class="card-image">
                        <figure class="image is-4by3">
                            <img v-if="user.avatar" :src="user.avatar" alt="Placeholder image">
                            <img v-else src="../assets/images/default_avatar.png" alt="Placeholder image">
                        </figure>
                    </div>
                    <div class="card-content">
                        <div class="media">
                            <div class="media-content">
                                <p class="title is-4">{{ user.first_name }} {{ user.last_name }}</p>
                                <p class="subtitle is-6">@{{ user.username }}</p>
                            </div>
                        </div>

                        <div class="content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Phasellus nec iaculis mauris.
                        </div>
                        <time datetime="2016-1-1">last seen at {{ normalizeDate(user.last_seen_at) }}</time>

                    </div>
                </div>
            </div>

        </div>

    </div>
</template>
