import { createApp } from 'vue'
import home from './home-page.vue'
import chat from './chat-page.vue'
import App from './App.vue'
import Talk from './TalkInChat.vue'
import Admin from './Admin.vue';

import Echo from "laravel-echo";
import { createRouter, createWebHistory } from 'vue-router';

window.Pusher= require("pusher-js");
window.Echo = new Echo({
    broadcaster: "pusher",
    cluster: "mt1",
    key: process.env.VUE_APP_WEBSOCKETS_KEY,
    wssPort: process.env.VUE_APP_WEBSOCKETS_PORT,
    wsHost: process.env.VUE_APP_WEBSOCKETS_SERVER,
    forceTLS: false,
    disableStats: true,
})

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/',name: "Home", component: home },
        { path: '/admin',name: "Admin", component: Admin },
        { path: '/chat/:name/:codigo',name: "Chat", component: chat, props: true },
        { path: '/talk/:room',name: "Talk", component: Talk },
    ]
});
//

const app = createApp(App)
app.use(router)
app.mount('#app')
