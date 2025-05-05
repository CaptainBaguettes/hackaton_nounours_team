<script setup lang="ts">
import { ref } from 'vue'
import MapView from './components/MapView.vue'
import Dashboard from './components/Dashboard.vue'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <Navbar />
  <main>
    <RouterView />
  </main>
</template>