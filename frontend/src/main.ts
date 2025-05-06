import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from './views/HomeView.vue'
import JobsView from './views/JobsView.vue'
import AddJobView from './views/AddJobView.vue'
import LoginView from './views/LoginView.vue'
import { Path } from 'leaflet'
import { createWebHistory } from 'vue-router'

import CandidatureSpontaneeView from './views/CandidatureSpontaneeView.vue'
import Candidatures from './views/Candidatures.vue'


import vuetify from './plugins/vuetify'


const routes = [
  { path: '/', component: HomeView },
  { path: '/jobs', component: JobsView },
  { path: '/add_job', component: AddJobView },
  { path: '/candidature_spontanee', component: CandidatureSpontaneeView },
  { path: '/candidatures', component: Candidatures },

  { path: '/login', component: LoginView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')
