<script>
import axios from 'axios';
import { normalizeMsgDate } from '@/utils';

export default {
    name: "UsersView",
    data() {
        return {
            users: [],
            allUserCount: null,
            limit: 15,
            offset: 0,
            isUserLoading: false,
            searchValue: '',
        }
    },
    methods: {
        fetchUsers(loadMore = false) {
            axios.get(
                "/accounts/list/",
                {
                    params: {
                        limit: this.limit,
                        offset: this.offset,
                        search: this.searchValue
                    }
                }
            )
                .then(response => {
                    if (response.status == 200) {
                        return response.data
                    }
                })
                .then(data => {
                    if (loadMore) {
                        this.users.push(...data.results);
                    } else {
                        this.users = data.results;
                    }
                    this.allUserCount = data.count;
                    this.isUserLoading = false;
                })
                .catch(error => {
                    console.log(error)
                })
        },
        openUserProfile(userId) {
            this.$store.commit("toggleUserProfile", userId);
        },
        searchUsers() {
            this.offset = 0;
            this.fetchUsers(false);
        },
        loadMoreUsers() {
            let scrlTop = document.documentElement.scrollTop;
            let wndwInnerHeight = window.innerHeight;

            let userContainerHeight = null
            if (this.$refs.usersContainerRef) {
                userContainerHeight = this.$refs.usersContainerRef.offsetHeight
            }

            if (scrlTop + wndwInnerHeight > userContainerHeight) {
                if (!this.isUserLoading && this.offset < this.allUserCount) {
                    this.isUserLoading = true;
                    this.offset += this.limit;
                    this.fetchUsers(true);
                }
            }
        },

        normalizeMsgDate,
    },
    created() {
        const access = this.$store.state.access

        if (!access) {
            this.$router.push("/login")
        }
    },
    beforeMount() {
        this.fetchUsers(true);
    },
    mounted() {
        window.onscroll = this.loadMoreUsers;
    },
}
</script>

<template>
    <div class="users p-2">
        <div class="block">
            <div class="control">
                <input class="input" type="text" placeholder="Search users ..." v-model="searchValue"
                    @input="searchUsers" />
            </div>
        </div>
        <div class="columns is-multiline" ref="usersContainerRef" @scroll="loadMoreUsers">

            <div v-for="user in users" :key="user.id" class="column is-3-desktop is-6-tablet is-12-mobile">
                <div class="card is-inline-block is-cursor-pointable" @click="openUserProfile(user.id)">
                    <div class="card-image">
                        <figure class="image is-4by3">
                            <img v-if="user.avatar" :src="user.avatar" alt="Placeholder image">
                            <img v-else src="/default_avatar.png" alt="Placeholder image">
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
                        <time datetime="2016-1-1">last seen at {{ normalizeMsgDate(user.last_seen_at) }}</time>

                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<style scoped>
.users {
    margin-top: 54px;
}
</style>
