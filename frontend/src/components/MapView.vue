<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Sample data for cities in Ille-et-Vilaine
const cities = [
  { name: 'Rennes', lat: 48.117266, lng: -1.6777926, population: 215366, type: 'city' },
  { name: 'Saint-Malo', lat: 48.649337, lng: -2.025674, population: 46097, type: 'city' },
  { name: 'Fougères', lat: 48.351067, lng: -1.204567, population: 20189, type: 'city' },
  { name: 'Vitré', lat: 48.123889, lng: -1.215278, population: 17677, type: 'city' },
  { name: 'Redon', lat: 47.650000, lng: -2.083333, population: 8867, type: 'town' },
  { name: 'Dinard', lat: 48.633333, lng: -2.050000, population: 9916, type: 'town' },
  { name: 'Bruz', lat: 48.023333, lng: -1.744444, population: 18364, type: 'town' },
  { name: 'Cesson-Sévigné', lat: 48.119722, lng: -1.604444, population: 17843, type: 'town' }
]

let map: L.Map
let markers: L.Marker[] = []

onMounted(() => {
  // Initialize map centered on Ille-et-Vilaine
  map = L.map('map').setView([48.117266, -1.6777926], 9)
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map)

  // Add circle markers for each city
  cities.forEach(city => {
    // Use circleMarker instead of marker
    const marker = L.circleMarker([city.lat, city.lng], {
      radius: city.type === 'city' ? 8 : 5, // Larger points for cities
      fillColor: city.type === 'city' ? '#3388ff' : '#33cc33',
      color: '#fff',
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    })
      .bindPopup(`
        <b>${city.name}</b><br>
        Population: ${city.population.toLocaleString()}<br>
        Type: ${city.type}
      `)
      .addTo(map)
    markers.push(marker)
  })
})

onUnmounted(() => {
  if (map) {
    markers.forEach(marker => marker.remove())
    map.remove()
  }
})
</script>

<template>
  <div id="map" class="h-full w-full"></div>
</template>

<style>
@import 'leaflet/dist/leaflet.css';
</style>