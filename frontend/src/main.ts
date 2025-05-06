import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from './views/HomeView.vue'
import JobsView from './views/JobsView.vue'
import AddJobView from './views/AddJobView.vue'
import Application from './views/Application.vue'

import vuetify from './plugins/vuetify'


const routes = [
  { path: '/', component: HomeView },
  { path: '/jobs', component: JobsView },
  { path: '/add_job', component: AddJobView },
  { path: '/application', component: Application }, // Candidatures
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')
