import '@/assets/css/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mavonEditor from 'mavon-editor'
import { createPinia } from 'pinia'
import 'mavon-editor/dist/css/index.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

app.use(router)
app.use(pinia)
app.use(mavonEditor)
app.mount('#app')
