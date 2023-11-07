import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import jQuery from "jquery";
const $ = jQuery;
window.$ = $;

// All components
import CreateLandingHead from '@/components/CreateLandingHead.vue';
import FormTitle from '@/components/FormTitle.vue';
import FileUpload from '@/components/FileUpload.vue';
import FormInput from '@/components/FormInput.vue';
import Button from '@/components/Button.vue';
import ButtonRemove from '@/components/ButtonRemove.vue';
import ButtonAdd from '@/components/ButtonAdd.vue';
import ButtonBack from '@/components/ButtonBack.vue'
import Checkbox from '@/components/Checkbox.vue';
import ModalStyle from '@/components/ModalStyle.vue';
import SwitchCheckbox from '@/components/SwitchCheckbox.vue'
import Alert from '@/components/Alert.vue'
import CreateLandingShow from '@/components/CreateLandingShow.vue';

createApp(App)
    .component("CreateLandingHead", CreateLandingHead)
    .component("FileUpload", FileUpload)
    .component("FormInput", FormInput)
    .component("Button", Button)
    .component("ButtonRemove", ButtonRemove)
    .component("ButtonAdd", ButtonAdd)
    .component("ButtonBack", ButtonBack)
    .component("Checkbox", Checkbox)
    .component("ModalStyle", ModalStyle)
    .component("SwitchCheckbox", SwitchCheckbox)
    .component("FormTitle", FormTitle)
    .component("Alert", Alert)
    .component("CreateLandingShow", CreateLandingShow)
    .use($)
    .use(store)
    .use(router)
    .mount('#app')
