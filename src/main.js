import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css' // import bootstrap
import router from './components/router' // Import router

createApp(App).use(router).mount('#app')
