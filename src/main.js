import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import 'bulma/css/bulma.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import '@/assets/public.css'

axios.defaults.baseURL = process.env.VUE_APP_BASE_API_URL

createApp(App).use(store).use(router, axios).mount('#app')
