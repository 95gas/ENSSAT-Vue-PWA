import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VCalendar from 'v-calendar';

// js file for registering the service worker 
import './assets/js/registerServiceWorker'

// create app
const app = createApp(App)
app.use(router)
app.use(VCalendar, {})
app.mount('#app')