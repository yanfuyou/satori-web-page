import {createApp} from 'vue'
import {createPinia} from "pinia";
import router from './router'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { ElMessage } from 'element-plus'
import * as ElementPLusIconsVue from '@element-plus/icons-vue'


import 'element-plus/theme-chalk/index.css'
const pinia = createPinia();


const app = createApp(App);
app.use(pinia)
app.use(router)
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPLusIconsVue)) {
    app.component(key, component)
}

app.config.globalProperties.showTost = function (showClose,type,message) {
    ElMessage({
        showClose: showClose,
        message: message,
        type: type,
    })
  };

app.mount('#app')
