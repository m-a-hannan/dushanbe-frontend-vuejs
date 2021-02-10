import { createApp } from 'vue'
import App from './App.vue'
import router from "./routers/router";


// configure
createApp(App).use(router).mount('#app')
