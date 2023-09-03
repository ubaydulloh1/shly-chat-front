<script>
export default {
    name: "ResetPasswordView",
    data(){
        return {
            autocompleteValue: "off",
            showPassword: false,
            user: {
                username: "",
                password: ""
            }
        }
    },
    methods: {
        handleLoginSubmit(e){
            console.log(e)
            console.log(this.user)
        }
    }
}
</script>

<template>
    <div>
        <p>Reset Password page.</p>
    </div>
</template>

<style scoped>
</style>
