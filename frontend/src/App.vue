<script setup lang="ts">
import { ref } from 'vue'
import MapView from './components/MapView.vue'
import Dashboard from './components/Dashboard.vue'
</script>

<template>
  <div class="h-screen w-screen flex">
    <Dashboard class="w-96 bg-white shadow-lg h-full" />
    <MapView class="flex-1" />
  </div>
</template>