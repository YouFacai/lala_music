import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/rem.js'
import { useUI } from '@/utils/useUI.js'
import { screenZoom } from '@/utils/index.js'


let app = createApp(App)
// 注册UI组件
useUI(app);
// 页面缩放监听
screenZoom(store)

if (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
    app.config.globalProperties.$env = 'phone'
} else {
    app.config.globalProperties.$env = 'pc'
}
app.use(store).use(router).mount('#app')
