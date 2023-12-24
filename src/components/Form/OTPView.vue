<script>
export default {
    name: "OTPView",
    components: {
    },
    props: ["count", "error"],
    data() {
        return {
            ConfirmationCode: []
        }
    },
    methods: {
        handleInput(index) {

            const maxLength = 1;
            const inputVal = this.ConfirmationCode[index]

            if (index >= this.ConfirmationCode.length - 1) {
                if (inputVal.length > 1) {
                    this.ConfirmationCode[index] = inputVal[1];
                } else {
                    this.ConfirmationCode[index] = inputVal[0];
                }
                return
            }

            if (inputVal.length > maxLength) {

                this.ConfirmationCode[index] = inputVal[0];

                for (let i = 1; i < inputVal.length; i++) {
                    const nextIndex = index + i;
                    this.ConfirmationCode[nextIndex] = inputVal[i];

                    if (nextIndex < this.ConfirmationCode.length) {
                        this.$refs.otpInput[nextIndex].focus();
                    }
                }

            }
        },
        keyDown(index) {
            if (event.key === "ArrowUp" || event.key === "ArrowLeft") {

                if (index > 0) {
                    this.$refs.otpInput[index - 1].focus();
                }
            } else if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                if (index < this.ConfirmationCode.length - 1) {
                    this.$refs.otpInput[index + 1].focus();
                }
            }

            if (event.key == 'Backspace') {
                if (index > 0 && !this.ConfirmationCode[index]) {
                    this.$refs.otpInput[index - 1].focus();
                }
            }


            if (event.key === "Enter") {
                console.log("CONFIRMED!");
            }
        },
        submitConfirmationCode() {
            this.$emit("submitOTP", this.ConfirmationCode);
        },
    },
    mounted() {
        for (let i = 0; i < this.count; i++) {
            this.ConfirmationCode.push('');
        }
        if (this.ConfirmationCode.length > 1) {
            this.$refs.otpInput[0].focus();
        }
    },
}
</script>


<template>
    <div class="">
        <input v-for="(i, index) in count" :key="i" v-model="ConfirmationCode[index]" class="input" :maxlength="count"
            type="text" inputmode="numeric" @input="handleInput(index)" @keydown="keyDown(index)" ref="otpInput" />
    </div>

    <p v-if="error">{{ error }}</p>
    <div>
        <button @click="submitConfirmationCode" class="button is-success">Confirm</button>
    </div>
</template>


<style scoped>
.input {
    display: inline-block;
    width: 40px;
    height: 40px;
    text-align: center;
}
</style>
