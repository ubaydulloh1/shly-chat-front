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

            const registrationInfo = JSON.parse(window.localStorage.getItem("registrationINFO"));
            axios.post(
                url,
                {
                    "token": registrationInfo.token,
                    "otp": otp.join("")
                }
            ).then(resp => {
                return resp.data
            }).then(data => {
                console.log(data);
                this.$router.push("/login/");
            }).catch(err => {
                const respData = err.response.data;

                if (respData) {
                    if (respData.token) {
                        this.otpError = respData.token[0];
                    }
                    if (respData.otp) {
                        this.otpError = respData.otp[0];
                    }
                }
            })
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
