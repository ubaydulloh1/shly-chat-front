<script>

export default {
    name: "AccountChangePassword",
    props: [],
    data() {
        return {
        }
    },
    methods: {}
}
</script>

<template>
    <div class="account-body">
        <h1 class="is-size-5 has-text-left p-5">Change Password</h1>
        <form class="form">

            <div class="control py-1 has-icons-right">
                <div class="is-flex-desktop">
                    <h3 class="has-text-right has-text-weight-bold px-3">Old Password <span class="has-text-danger">*</span>
                    </h3>
                    <input class="input" type="password" placeholder="Old Password" required />
                    <span class="icon is-right">
                        <i class="fas fa-eye"></i>
                    </span>
                </div>
            </div>
            <div class="control py-1 has-icons-right">
                <div class="is-flex-desktop">
                    <h3 class="has-text-right has-text-weight-bold px-3">New Password <span class="has-text-danger">*</span>
                    </h3>
                    <input class="input" type="password" placeholder="New Password" required />
                    <span class="icon is-right">
                        <i class="fas fa-eye"></i>
                    </span>
                </div>
            </div>
            <div class="control py-1 has-icons-right">
                <div class="is-flex-desktop">
                    <h3 class="has-text-right has-text-weight-bold px-3">New password confirmation <span
                            class="has-text-danger">*</span></h3>
                    <input class="input" type="password" placeholder="New password confirmation" required />
                    <span class="icon is-right">
                        <i class="fas fa-eye"></i>
                    </span>
                </div>
            </div>

            <div class="control py-4">
                <button type="submit" class="button is-success">Change</button>
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
        width: 50%;
    }

    .avatar-upload {
        width: 50%;
    }
}

@media screen and (min-width: 1025px) {

    .account-body {
        width: 70%;
    }

    form .control h3,
    .avatar-block {
        width: 50%;
    }

    .avatar-upload {
        width: 50%;
    }
}
</style>
