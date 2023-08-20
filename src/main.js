import {createApp} from 'vue'
import {createPinia} from "pinia";
import router from './router'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import * as ElementPLusIconsVue from '@element-plus/icons-vue'

import JwChat from 'jwchat'

import 'element-plus/theme-chalk/index.css'
const pinia = createPinia();


const app = createApp(App);
app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.use(JwChat)
for (const [key, component] of Object.entries(ElementPLusIconsVue)) {
    app.component(key, component)
}


app.mount('#app')
