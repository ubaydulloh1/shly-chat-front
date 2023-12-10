<script>
export default {
    name: "ImageModalView",
    data() {
        return {}
    },
    props: ["image"]
}
</script>

<template>
    <div class="image-modal modal is-active">
        <div class="modal-background" @click="$emit('close')"></div>
        <div class="modal-content">
            <p class="image is-4by3">
                <img :src="image" alt="no image">
            </p>
        </div>
    </div>
</template>

<style scoped></style>
