import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VCalendar from 'v-calendar'
import './assets/js/registerServiceWorker'   // js file for registering the service worker 

// ===================== SOCKET.io ============================
import VueSocketIOExt from 'vue-socket.io-extended'
import { io } from 'socket.io-client'
import config from '../config.json'

const socket = io(config.URL.domain);
// =============================================================

// ===================== CREATE VUE app ============================
const app = createApp(App)
app.use(VueSocketIOExt, socket)
app.use(router)
app.use(VCalendar, {})
app.mount('#app')