<script>
export default {
    name: "ProfileView",
    data(){
        return {}
    },
    props: [],
    methods: {
        close(){
            this.$emit("close")
        }
    }
}
</script>

<template>
    <div class="modal is-active">
        <div class="modal-background" @click="close"></div>
        <div class="modal-content">
            <div class="card has-background-white p-3">
                
                <div class="is-flex is-justify-content-space-between px-3 pb-5">
                    <div class="is-flex">
                        <div class="px-2">
                            <i @click="close" class="fa-solid fa-arrow-left is-cursor-pointable"></i>
                        </div>
                        <h3 class="px-2">User Profile</h3>
                    </div>
                    <div>
                        <div>
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                        </div>
                    </div>
                </div>
                
                <div class="is-flex mb-4">
                    <div class="mr-4">
                        <figure class="image is-64x64">
                            <img class="is-rounded" src="https://bulma.io/images/placeholders/128x128.png">
                        </figure>
                    </div>
                    <div class="is-flex is-flex-direction-column is-justify-content-space-between p-2 has-text-left">
                        <h2>Nodirbek Biloliddinov</h2>
                        <p class="is-size-7">last seen at 17:43</p>
                    </div>
                </div>

                <div class="p-4">
                    <div class="is-flex">
                        <div class="px-4">
                            <span class="is-flex is-justify-content-center is-rounded">
                                <i class="fa-solid fa-info"></i>
                            </span>
                        </div>
                        <ul class="has-text-left">
                            <li class="mb-4">
                                <p>+99893 0088802</p>
                                <p class="is-size-7">mobile</p>
                            </li>
                            <li class="mb-4">
                                <p>@root</p>
                                <p class="is-size-7">username</p>
                            </li>
                            <li class="mb-4">
                                <p>ubaydulloh1000@gmail.com</p>
                                <p class="is-size-7">email</p>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="is-flex is-justify-content-center">
                    <button class="button is-success">Send Message</button>
                </div>
            </div>
        </div>
        </div>
</template>

<style>
.modal-background {
    background: rgba(0, 255, 0, 0.1);
}
/* span.is-rounded{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid #222;
} */
</style>
