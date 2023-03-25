import {createApp, reactive} from 'vue'
import App from './App.vue'
import router from './router'

import './assets/app.scss'

import {category, presetData} from "./presetData";
import {appData} from "./utils";

const app = createApp(App)

app.use(router);
app.config.globalProperties.appData = appData;

app.mount('#app')
