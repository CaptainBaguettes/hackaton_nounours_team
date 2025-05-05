<script setup lang="ts">
import { ref } from 'vue'

const settings = ref({
  mapCenter: { lat: 48.117266, lng: -1.6777926 }, // Centered on Rennes
  zoomLevel: 9,
  showMarkers: true,
  filters: {
    population: {
      min: 0,
      max: 500000
    },
    type: 'all' // 'all', 'city', 'town'
  }
})
</script>

<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Dashboard</h2>
    
    <button
      class="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"
    >
      Expand Dashboard
    </button>

    <div class="space-y-4">
      <div class="bg-gray-50 p-4 rounded-lg">
        <h3 class="font-semibold mb-2">Map Settings</h3>
        <div class="space-y-2">
        </div>
      </div>

      <div class="bg-gray-50 p-4 rounded-lg">
        <h3 class="font-semibold mb-2">Filters</h3>
        <div class="space-y-2">
        </div>
      </div>
    </div>
  </div>
</template>