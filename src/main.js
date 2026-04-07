import { createApp } from 'vue'
import { createPinia } from 'pinia'   // 1. Importamos el creador de Pinia
import router from './router'          // 2. Importamos el router

import App from './App.vue'
import './assets/main.css'

const app = createApp(App)

app.use(createPinia())  // Pinia ANTES que el router
app.use(router)         // Ahora el router puede usar stores de Pinia
app.mount('#app')