<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet.heat';
import { fetchCities } from '../api/getData.js'

// Reactive cities data
const cities = ref([]);

// Type definitions
interface GeoJsonFeature {
  type: string;
  properties: {
    nom?: string;
    code?: string;
    [key: string]: any;
  };
  geometry: any;
}

interface GeoJsonData {
  type: string;
  features: GeoJsonFeature[];
}

// Map-related variables
let map: L.Map;
let heatLayer: any;
let cityMarkers: L.Marker[] = [];

// Constants
const DEPARTMENT_CODE = '35';
const MAP_CENTER = [48.117266, -1.6777926];
const DEFAULT_ZOOM = 9;
const DEPARTMENT_GEOJSON_URL = 'https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements-version-simplifiee.geojson';
const COMMUNES_GEOJSON_URL = 'https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/communes-version-simplifiee.geojson';

/**
 * Generates data for the heatmap based on city population
 */
const getHeatData = () => {
  return cities.value.map((city: any) => {
    const intensity = Math.log10(city.nb_population) * 0.8;
    return [city.latitude, city.longitude, intensity];
  });
};

/**
 * Adds labels for major cities
 */
const addCityLabels = () => {
  cities.value.forEach((city: any) => {
    if (city.nb_population > 15000) {
      const marker = L.marker([city.latitude, city.longitude], {
        opacity: 0.01,
      })
        .bindTooltip(city.name, {
          permanent: true,
          direction: 'center',
          className: 'city-label',
        })
        .addTo(map);

      cityMarkers.push(marker);
    }
  });
};

/**
 * Creates and adds markers for all cities with population info
 */
const addCityMarkers = () => {
  cities.value.forEach((city: any) => {
    L.marker([city.latitude, city.longitude], { opacity: 0 })
      .bindPopup(`
        <b>${city.name}</b><br>
        Population: ${city.nb_population.toLocaleString()}<br>
        Doctors: ${city.nb_doctors}
      `)
      .addTo(map);
  });
};

/**
 * Creates and adds a legend to the map
 */
const addLegend = () => {
  const legend = L.control({ position: 'bottomright' });
  
  legend.onAdd = () => {
    const div = L.DomUtil.create('div', 'info legend');
    div.style.backgroundColor = 'white';
    div.style.padding = '8px';
    div.style.borderRadius = '4px';
    div.style.border = '1px solid #ccc';

    // Create gradient legend
    div.innerHTML = '<h4>Population Density</h4>';

    // Add gradient bar
    const gradientBar = '<div style="width:100%; height:20px; background: linear-gradient(to right, #00f, #0f0, #ff0, #f00);"></div>';

    // Add labels
    div.innerHTML +=
      gradientBar +
      '<div style="display:flex; justify-content:space-between; margin-top:5px;">' +
      '<span>Low</span>' +
      '<span>Medium</span>' +
      '<span>High</span>' +
      '</div>';
    
    return div;
  };
  
  legend.addTo(map);
};

/**
 * Displays an error message on the map
 */
const showErrorMessage = (message: string) => {
  const errorDiv = document.createElement('div');
  errorDiv.style.position = 'absolute';
  errorDiv.style.top = '10px';
  errorDiv.style.right = '10px';
  errorDiv.style.backgroundColor = 'white';
  errorDiv.style.padding = '10px';
  errorDiv.style.border = '1px solid red';
  errorDiv.style.borderRadius = '4px';
  errorDiv.style.zIndex = '1000';
  errorDiv.innerHTML = message;
  
  const mapElement = document.querySelector('#map');
  if (mapElement) {
    mapElement.appendChild(errorDiv);
  }
  
  // Remove error message after 5 seconds
  setTimeout(() => {
    errorDiv.remove();
  }, 5000);
};

/**
 * Loads and displays department boundaries
 */
const loadDepartmentBoundaries = async () => {
  try {
    const response = await fetch(DEPARTMENT_GEOJSON_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const geojsonData: GeoJsonData = await response.json();
    
    L.geoJSON(geojsonData, {
      filter: (feature) => feature.properties.code === DEPARTMENT_CODE,
      style: {
        color: 'rgba(255, 123, 255, 0.2)',
        weight: 5,
        fillOpacity: 0,
      },
    }).addTo(map);

    // Load communes after department boundary is loaded
    await loadCommunesGeoJSON();
  } catch (error) {
    console.error('Error loading department boundaries:', error);
    showErrorMessage(`Failed to load department boundaries: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Loads and displays commune boundaries for Ille-et-Vilaine
 */
const loadCommunesGeoJSON = async () => {
  try {
    console.log('Loading communes GeoJSON...');
    
    const response = await fetch(COMMUNES_GEOJSON_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const geojsonData: GeoJsonData = await response.json();
    console.log('GeoJSON loaded, processing...');
    
    // Filter communes in department 35 (Ille-et-Vilaine)
    const filteredFeatures = geojsonData.features.filter(feature => {
      if (feature.properties?.code) {
        const deptCode = feature.properties.code.substring(0, 2);
        return deptCode === DEPARTMENT_CODE;
      }
      return false;
    });
    
    console.log(`Found ${filteredFeatures.length} communes in department ${DEPARTMENT_CODE}`);
    
    if (filteredFeatures.length === 0) {
      console.warn(`No communes found for department ${DEPARTMENT_CODE}`);
      return;
    }
    
    // Add the filtered communes to the map
    L.geoJSON(
      { type: 'FeatureCollection', features: filteredFeatures },
      {
        style: {
          color: 'rgba(255, 123, 255, 0.5)',
          weight: 1,
          fillOpacity: 0.2,
        },
        onEachFeature: (feature, layer) => {
          if (feature.properties?.nom) {
            layer.bindPopup(`<b>${feature.properties.nom}</b>`);
          }
        },
      }
    ).addTo(map);
    
    console.log('Communes GeoJSON added to map');
  } catch (error) {
    console.error('Error loading communes GeoJSON:', error);
    showErrorMessage(`Failed to load communes: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Initialize the map with all components
 */
const initializeMap = () => {
  // Create base map
  map = L.map('map').setView(MAP_CENTER, DEFAULT_ZOOM);

  // Add tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
  }).addTo(map);

  // Add heatmap layer
  heatLayer = L.heatLayer(getHeatData(), {
    radius: 30,
    blur: 15,
    maxZoom: 10,
    max: 7,
  }).addTo(map);

  // Add map components
  addCityLabels();
  addCityMarkers();
};

/**
 * Fetch cities data from the API and update the map
 */
const loadCities = async () => {
  try {
    const fetchedCities = await fetchCities();
    cities.value = fetchedCities;

    // Reinitialize the map with the new data
    if (map) {
      if (heatLayer) map.removeLayer(heatLayer);
      cityMarkers.forEach((marker) => marker.remove());
      heatLayer = L.heatLayer(getHeatData(), {
        radius: 40,
        blur: 15,
        maxZoom: 10,
        max: 5,
      }).addTo(map);
      addCityLabels();
      addCityMarkers();
    }
  } catch (error) {
    console.error('Error loading cities:', error);
  }
};

// Lifecycle hooks
onMounted(async () => {
  await loadCities(); // Load cities data before initializing the map
  initializeMap();
});

onUnmounted(() => {
  if (map) {
    if (heatLayer) map.removeLayer(heatLayer);
    cityMarkers.forEach((marker) => marker.remove());
    map.remove();
  }
});
</script>

<template>
  <div id="map" class="h-full w-full"></div>
</template>

<style>
@import 'leaflet/dist/leaflet.css';

.city-label {
  background: transparent;
  border: none;
  box-shadow: none;
  font-weight: bold;
  font-size: 12px;
  text-shadow: 1px 1px 1px white, -1px -1px 1px white, 1px -1px 1px white,
    -1px 1px 1px white;
}
</style>
