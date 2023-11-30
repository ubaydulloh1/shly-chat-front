<script>


export default {
    name: "AccountView",
    props: [],
    components: {
    },
    data() {
        return {
        }
    },
    methods: {}
}
</script>

<template>
    <div class="account is-flex is-justify-content-center">
        <div class="account-container is-flex-desktop is-justify-content-center">
            <div class="account-sidebar">
                <router-link :to="{ name: 'EditProfile' }">
                    <div class="box is-shadowless is-clickable m-0">
                        <p>Account</p>
                    </div>
                </router-link>

                <router-link :to="{ name: 'AccountSettings' }">
                    <div class="box is-shadowless is-clickable m-0">
                        <p>Settings</p>
                    </div>
                </router-link>

                <router-link :to="{ name: 'AccountChangePassword' }">
                    <div class="box is-shadowless is-clickable m-0">
                        <p>Change Password</p>
                    </div>
                </router-link>

            </div>
            <router-view></router-view>
        </div>
    </div>
</template>

<style>
.account {
    margin-top: 52px;
    width: 100% !important;
}

.account .account-container {
    width: 100%;
}

.account-sidebar a.router-link-exact-active .box {
    background: rgba(0, 0, 0, 0.1);
}

@media screen and (max-width: 768px) {
    .account {
        padding: 1em;
    }

    .account-sidebar {
        width: 100%;
    }

}

@media screen and (min-width: 769px) and (max-width: 1024px) {
    .account {
        padding: 2em;
    }

    .account-sidebar {
        width: 30%;
    }

}

@media screen and (min-width: 1025px) {
    .account {
        padding: 7em;
    }

    .account-sidebar {
        width: 30%;
    }

    .account .account-container {
        max-width: 1000px;
    }

}
</style>
