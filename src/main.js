import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import locale from 'element-plus/dist/locale/zh-cn'
import echarts from './common/js/echarts.js'

const app = createApp(App)

app.config.globalProperties.$elyasApi = 'http://localhost:7007/'
app.config.globalProperties.$echarts = echarts;

//文本编辑器
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

app.use(VueQuillEditor, /* { default global options } */)

app.use(ElementPlus,{locale})
app.use(router)
app.use(store)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

import 'virtual:windi.css'

import './permission'
app.mount('#app')
