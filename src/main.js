import Vue from 'vue'
import App from './App.vue'
import { createApp } from 'vue'


createApp(App).mount('#app')


/* custom route file */
/* router (export const variable array) */
// import {router} from "./routers/router"


/* production setting */
Vue.config.productionTip = false


/* Vue framework */
new Vue({
  render: h => h(App),
  // export const variable array
  // router: router
}).$mount('#app')

