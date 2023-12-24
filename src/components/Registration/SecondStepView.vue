<script>
import axios from 'axios';
import OTPView from '@/components/Form/OTPView.vue'

export default {
    name: "RegistrationSecondStepView",
    components: {
        OTPView,
    },
    data() {
        return {
            otpError: '',
        }
    },
    props: [],
    methods: {
        submitOTP(otp) {
            const url = "accounts/register/confirm/"
            axios.post(
                url,
                {
                    "token": "",
                    "otp": otp
                }
            )
        }
    }
}
</script>


<template>
    <div>
        <h1 class="is-size-4">Confirm</h1>
        <div class="control">
            <OTPView :count="5" :error="otpError" @submitOTP="submitOTP" />
        </div>
    </div>
</template>


<style scoped></style>
