import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VCalendar from 'v-calendar'

// js file for registering the service worker 
import './assets/js/registerServiceWorker'

import VueSocketIOExt from 'vue-socket.io-extended';
import { io } from 'socket.io-client';

// import config file from
import config from '../config.json'

const socket = io(config.URL.domain);

// create app
const app = createApp(App)
app.use(VueSocketIOExt, socket)
app.use(router)

app.use(VCalendar, {})
app.mount('#app')