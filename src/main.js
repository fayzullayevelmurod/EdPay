import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import jQuery from "jquery";
import components from '@/components/UI/index.js';
const $ = jQuery;
window.$ = $;


const app = createApp(App);

components.forEach(component => {
    app.component(component.name, component)
})

app.use($)
    .use(store)
    .use(router)
    .mount('#app')
