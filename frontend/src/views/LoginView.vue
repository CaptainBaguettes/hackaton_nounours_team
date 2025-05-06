<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const activeTab = ref<'login' | 'register'>('login')

const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const firstname = ref('')
const lastname = ref('')
const accountType = ref('')
const selectedMairie = ref('')
const mail = ref('')

const mairiesList = ref<string[]>([])  // Liste des mairies récupérées

// Fonction d'inscription
const register = () => {
  if (password.value !== confirmPassword.value) {
    alert("Les mots de passe ne correspondent pas.")
    return
  }
  axios.post('http://localhost:3000/api/signup', {
    username: username.value,
    password: password.value,
    first_name: firstname.value,
    last_name: lastname.value,
    accountType: accountType.value,
    city: selectedMairie.value,
    mail: mail.value
  }).then(response => {
    console.log('Inscription réussie:', response.data)
    activeTab.value = 'login'
    // Réinitialiser les champs
    username.value = ''
    password.value = ''
    confirmPassword.value = ''
    firstname.value = ''
    lastname.value = ''
    accountType.value = ''
    selectedMairie.value = ''
    mail.value = ''
  }).catch(error => {
    console.log('Erreur lors de l\'inscription:', error)
    alert("Une erreur s'est produite lors de l'inscription.")
  })
}

// Fonction de connexion
const login = () => {
  axios.post('http://localhost:3000/api/login', {
    mail: mail.value,
    password: password.value
  }).then(response => {
    console.log('Connexion réussie:', response.data)
    // Stocker le token dans le localStorage
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('first_name', response.data.first_name)
    localStorage.setItem('last_name', response.data.last_name)
    router.push('/')
  }).catch(error => {
    console.log('Erreur lors de la connexion:', error)
    alert("Une erreur s'est produite lors de la connexion.")
  })
}

// Fonction pour récupérer les mairies
const mairies = () => {
  axios.get('http://localhost:3000/api/datas/cities/names').then(response => {
    console.log('Mairies:', response.data)
    mairiesList.value = response.data  // Mettre à jour la liste des mairies
  }).catch(error => {
    console.log('Erreur lors de la récupération des mairies:', error)
  })
}

// Observer le changement de `accountType` et appeler `mairies` quand nécessaire
watch(accountType, (newVal) => {
  if (newVal === 'candidate') {
    mairies()
  }
})
</script>



<template>
  <div class="min-h-screen flex items-center justify-center bg-white">
    <div class="w-full max-w-md p-8 space-y-6">
      <h2 class="text-center text-2xl font-semibold text-black">
        {{ activeTab === 'login' ? 'Connexion' : 'Inscription' }}
      </h2>

      <!-- Onglets -->
      <div class="flex rounded-full overflow-hidden mt-4 border border-gray-300">
        <button
          class="w-1/2 py-2 font-semibold transition-colors duration-200"
          :class="activeTab === 'login' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'"
          @click="activeTab = 'login'"
        >
          Se connecter
        </button>
        <button
          class="w-1/2 py-2 font-semibold transition-colors duration-200"
          :class="activeTab === 'register' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'"
          @click="activeTab = 'register'"
        >
          S’inscrire
        </button>
      </div>

      <!-- Formulaire de connexion -->
      <div v-if="activeTab === 'login'" class="space-y-4">
        <div>
            <label class="block text-sm text-gray-600">Email</label>
            <input
              v-model="mail"
              type="email"
              placeholder="Email"
              class="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
        </div>
        <div>
          <label class="block text-sm text-gray-600">Mot de passe</label>
          <input
            v-model="password"
            type="password"
            placeholder="Mot de passe"
            class="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button @click="login"
          class="w-full mt-4 py-2 rounded-lg bg-white border border-blue-600 text-blue-600 font-bold hover:bg-blue-50 transition">
          Se connecter
        </button>
      </div>

      <!-- Formulaire d’inscription -->
      <div v-else>
        <div class="flex space-x-4">
          <div class="w-1/2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
            <input
              v-model="firstname"
              type="text"
              placeholder="Prénom"
              class="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div class="w-1/2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Nom</label>
            <input
              v-model="lastname"
              type="text"
              placeholder="Nom"
              class="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
        <div>
            <label class="block text-sm text-gray-600">Email</label>
            <input
              v-model="mail"
              type="email"
              placeholder="Email"
              class="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
        </div>

        <div class="mt-4">
          <label class="block text-sm text-gray-600">Type de compte</label>
          <select v-model="accountType" class="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400">
            <option disabled value="">-- Sélectionnez un type --</option>
            <option value="candidate">Mairie</option>
            <option value="recruiter">Médecin</option>
          </select>
        </div>
        <div v-if="accountType === 'candidate'" class="mt-4">
          <label class="block text-sm text-gray-600">Choisissez votre mairie</label>
          <select v-model="selectedMairie" class="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400">
            <option disabled value="">-- Sélectionnez une mairie --</option>
            <option v-for="mairie in mairiesList" :key="mairie" :value="mairie">{{ mairie }}</option>
          </select>
        </div>

        <div class="mt-4">
          <label class="block text-sm text-gray-600">Mot de passe</label>
          <input
            v-model="password"
            type="password"
            placeholder="Mot de passe"
            class="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label class="block text-sm text-gray-600">Confirmez votre mot de passe</label>
          <input
            v-model="confirmPassword"
            type="password"
            placeholder="Confirmez le mot de passe"
            class="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          @click="register"
          class="w-full mt-4 py-2 rounded-lg bg-white border border-blue-600 text-blue-600 font-bold hover:bg-blue-50 transition"
        >
          S'inscrire
        </button>
      </div>
    </div>
  </div>
</template>
