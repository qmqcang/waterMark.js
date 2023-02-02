import { createApp } from 'vue'
import App from './App.vue'

import directives from './directives/index'

createApp(App).use(directives).mount('#app')
