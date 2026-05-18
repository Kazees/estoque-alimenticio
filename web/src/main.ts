import './assets/main.css'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import App from './App.vue'
import router from './router'
import AuthService from './scripts/services/AuthService'

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'dark',
    }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

AuthService.init();

app.mount('#app')
