import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from './views/HomeView.vue'
import JobView from './views/JobView.vue'
import AddJobView from './views/AddJobView.vue'


const routes = [
  { path: '/', component: HomeView },
  { path: '/jobs', component: JobView },
  { path: '/add_job', component: AddJobView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

createApp(App)
  .use(router)
  .mount('#app')
