<script>
import axios from 'axios';

export default {
    name: "AccountSettings",
    props: [],
    data() {
        return {
            userAccountSettings: {
                showLastSeen: false,
                showReadReceipts: false,
                allowGroupAdds: false,
                allowPrivateMessagesToAll: false,
                pushNotifications: false,
            },
            isAccountDataLoading: false
        }
    },
    methods: {
        fetchAccountSettings() {
            axios.get("/accounts/me/")
                .then(response => {
                    if (response.status == 200) {
                        return response.data
                    }
                })
                .then(data => {

                    this.userAccountSettings.id = data.id;
                    this.userAccountSettings.showLastSeen = data.account_settings.show_last_seen;
                    this.userAccountSettings.showReadReceipts = data.account_settings.show_read_receipts;
                    this.userAccountSettings.allowGroupAdds = data.account_settings.allow_to_add_groups;
                    this.userAccountSettings.allowPrivateMessagesToAll = data.account_settings.allow_private_messages_to_non_contacts;
                    this.userAccountSettings.pushNotifications = data.account_settings.push_notifications_enabled;
                    setTimeout(() => {
                        this.isAccountDataLoading = false;
                    }, 100)
                })
                .catch(error => {
                    console.log(error)
                    this.$router.push("/login")
                })
        }
    },
    beforeMount() {
        this.isAccountDataLoading = true;
        this.fetchAccountSettings();
    }
}
</script>

<template>
    <div class="account-body">
        <h1 class="is-size-5 has-text-left p-5">Settings</h1>
        <form class="form">

            <div class="control py-1">
                <div class="is-flex-desktop">
                    <h3 class="has-text-right has-text-weight-bold px-3">Show last seen</h3>
                    <input class="checkbox" type="checkbox" v-model="userAccountSettings.showLastSeen">
                </div>
            </div>

            <div class="control py-1">
                <div class="is-flex-desktop">
                    <h3 class="has-text-right has-text-weight-bold px-3">Show Read Receipts</h3>
                    <input class="checkbox" type="checkbox" v-model="userAccountSettings.showReadReceipts">
                </div>
            </div>

            <div class="control py-1">
                <div class="is-flex-desktop">
                    <h3 class="has-text-right has-text-weight-bold px-3">Allow to Add Groups</h3>
                    <input class="checkbox" type="checkbox" v-model="userAccountSettings.allowGroupAdds">
                </div>
            </div>

            <div class="control py-1">
                <div class="is-flex-desktop">
                    <h3 class="has-text-right has-text-weight-bold px-3">Allow Private Messages to all</h3>
                    <input class="checkbox" type="checkbox" v-model="userAccountSettings.allowPrivateMessagesToAll">
                </div>
            </div>

            <div class="control py-1">
                <div class="is-flex-desktop">
                    <h3 class="has-text-right has-text-weight-bold px-3">Push Notifications Enabled</h3>
                    <input class="checkbox" type="checkbox" v-model="userAccountSettings.pushNotifications">
                </div>
            </div>
            <div class="control py-5">
                <button type="submit" class="button is-success"
                    :class="{ 'is-loading': isAccountDataLoading }">Update</button>
            </div>
        </form>
    </div>
</template>

<style scoped>
@media screen and (max-width: 768px) {
    .account-body {
        width: 100%;
        padding: 0;
    }

    form .control h3,
    .avatar-block {
        width: 100%;
    }

    .avatar-upload {
        width: 100%;
    }
}

@media screen and (min-width: 769px) and (max-width: 1024px) {

    .account-body {
        width: 70%;
    }

    form .control h3,
    .avatar-block {
        width: 40%;
    }

    .avatar-upload {
        width: 60%;
    }
}

@media screen and (min-width: 1025px) {

    .account-body {
        width: 70%;
    }

    form .control h3,
    .avatar-block {
        width: 40%;
    }

    .avatar-upload {
        width: 60%;
    }
}
</style>
