import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import jQuery from "jquery";
const $ = jQuery;
window.$ = $;

createApp(App).use($).use(store).use(router).mount('#app')
