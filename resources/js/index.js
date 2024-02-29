import {createApp} from "vue";
import "./assets/css/main.css";
import store from "./store";
import router from "./router";
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Index from  "./component/page/Index.vue";
import  "./utils/calcAppMinHeight";
import { library } from "@fortawesome/fontawesome-svg-core"
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome"
import {fas} from "@fortawesome/free-solid-svg-icons"
import 'primeicons/primeicons.css'

library.add(fas)



import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: "mt1",
    wsHost: "localhost",
    wsPort: 6001,
    enabledTransports: ['ws'],
    forceTLS: false
});

console.log(
    import.meta.env
)
createApp(Index )
    .use(router)
    .use(store)
    .use(PrimeVue)
    .use(ToastService)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app');

