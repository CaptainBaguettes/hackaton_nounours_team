<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet.heat';
import { fetchCities } from '../api/getData.js';

// Reactive cities data
const cities = ref([]);
const boundariesVisible = ref(true); // Reactive variable to track boundary visibility

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
let departmentLayer: L.GeoJSON | null = null; // Store department boundaries layer
let communesLayer: L.GeoJSON | null = null; // Store communes boundaries layer

// Constants
const DEPARTMENT_CODE = '35';
const MAP_CENTER = [48.117266, -1.6777926];
const DEFAULT_ZOOM = 10;
const DEPARTMENT_GEOJSON_URL = 'https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements-version-simplifiee.geojson';
const COMMUNES_GEOJSON_URL = 'https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/communes-version-simplifiee.geojson';

/**
 * Generates data for the heatmap based on the population-per-doctor ratio
 */
const getHeatData = () => {
  return cities.value.map((city: any) => {
    let intensity;
    if (city.populationPerDoctor === null || city.populationPerDoctor >= 1000) {
      intensity = 0.1; // Red for cities with population per doctor >= 1000
    } else if (city.populationPerDoctor >= 500 && city.populationPerDoctor < 1000) {
      intensity = 0.4; // Yellow for cities with 2 doctors per 1000 citizens
    } else if (city.populationPerDoctor >= 333 && city.populationPerDoctor < 500) {
      intensity = 0.7; // Green for cities with 3 doctors per 1000 citizens
    } else {
      intensity = 1.0; // Blue for cities with 4+ doctors per 1000 citizens
    }
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
      .bindTooltip(
        `
        <b>${city.name}</b><br>
        Population: ${city.nb_population.toLocaleString()}<br>
        Doctors: ${city.nb_doctors}<br>
        Doctors per 1000 inhabitants: ${
          city.populationPerDoctor !== null
            ? (1000 / city.populationPerDoctor).toFixed(2)
            : 'N/A'
        }
      `,
        {
          permanent: false, // Tooltip only shows on hover
          direction: 'top', // Position the tooltip above the marker
          className: 'city-tooltip', // Custom class for styling
        }
      )
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

    div.innerHTML = '<h4>Medical Desert (x nb Doc/1000 hab)</h4>';
    const gradientBar = '<div style="width:300px; height:20px; background: linear-gradient(to right, #FF0000, #FFFF00, #00FF00, #0000FF);"></div>';
    div.innerHTML +=
      gradientBar +
      '<div style="display:flex; justify-content:space-between; margin-top:5px;">' +
      '<span>0 Doc/hab</span>' +
      '<span>1 Doc/hab</span>' +
      '<span>2 Doc/hab</span>' +
      '</div>';

    // Add toggle boundaries button
    const toggleButton = document.createElement('button');
    toggleButton.innerText = 'Toggle Boundaries';
    toggleButton.style.marginTop = '10px';
    toggleButton.style.padding = '5px 10px';
    toggleButton.style.border = '1px solid #ccc';
    toggleButton.style.borderRadius = '4px';
    toggleButton.style.backgroundColor = '#f9f9f9';
    toggleButton.style.cursor = 'pointer';

    toggleButton.addEventListener('click', () => {
      toggleBoundaries();
    });

    div.appendChild(toggleButton);

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

    departmentLayer = L.geoJSON(geojsonData, {
      filter: (feature) => feature.properties.code === DEPARTMENT_CODE,
      style: {
        weight: 2,
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
    const response = await fetch(COMMUNES_GEOJSON_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const geojsonData: GeoJsonData = await response.json();

    const filteredFeatures = geojsonData.features.filter(feature => {
      if (feature.properties?.code) {
        const deptCode = feature.properties.code.substring(0, 2);
        return deptCode === DEPARTMENT_CODE;
      }
      return false;
    });

    communesLayer = L.geoJSON(
      { type: 'FeatureCollection', features: filteredFeatures },
      {
        style: {
          weight: 1,
          fillOpacity: 0,
          opacity: 0.3,
        },
        onEachFeature: (feature, layer) => {
          if (feature.properties?.nom) {
            layer.bindPopup(`<b>${feature.properties.nom}</b>`);
          }
        },
      }
    ).addTo(map);
  } catch (error) {
    console.error('Error loading communes GeoJSON:', error);
    showErrorMessage(`Failed to load communes: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Fill areas without data
 */
const fillEmptyAreas = async () => {
  try {
    const response = await fetch(DEPARTMENT_GEOJSON_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const geojsonData: GeoJsonData = await response.json();

    // Get a set of city codes or names already in the data
    const existingCityCodes = new Set(cities.value.map((city: any) => city.code));

    // Filter to include only department 35 (Ille-et-Vilaine) and exclude existing cities
    const filteredFeatures = geojsonData.features.filter(
      (feature) =>
        feature.properties?.code === DEPARTMENT_CODE &&
        !existingCityCodes.has(feature.properties?.code)
    );

    if (filteredFeatures.length === 0) {
      console.warn(`No features found for department ${DEPARTMENT_CODE} after filtering.`);
      return;
    }

    // Add the GeoJSON layer with a style matching the "no doctors" color
    L.geoJSON(
      { type: 'FeatureCollection', features: filteredFeatures },
      {
        style: {
          color: '#FF0000', // Red color for areas with no doctors
          weight: 0,
          fillOpacity: 0.2,
        },
      }
    ).addTo(map);
  } catch (error) {
    console.error('Error loading GeoJSON for empty areas:', error);
  }
};

/**
 * Toggles the visibility of the boundaries
 */
const toggleBoundaries = () => {
  boundariesVisible.value = !boundariesVisible.value;

  if (departmentLayer) {
    if (boundariesVisible.value) {
      map.addLayer(departmentLayer);
    } else {
      map.removeLayer(departmentLayer);
    }
  }

  if (communesLayer) {
    if (boundariesVisible.value) {
      map.addLayer(communesLayer);
    } else {
      map.removeLayer(communesLayer);
    }
  }
};

/**
 * Initialize the map with all components
 */
const initializeMap = async () => {
  // Create base map with locked zoom level
  map = L.map('map', {
    center: MAP_CENTER,
    zoom: DEFAULT_ZOOM,
    minZoom: DEFAULT_ZOOM, // Lock minimum zoom level
    maxZoom: DEFAULT_ZOOM, // Lock maximum zoom level
    zoomControl: false,    // Optionally disable zoom controls
  });

  // Add tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
  }).addTo(map);

  // Fill areas without data for department 35
  await fillEmptyAreas();

  heatLayer = L.heatLayer(getHeatData(), {
    radius: 30,
    blur: 20,
    maxZoom: 11,
    max: 10,
    minOpacity: 0.5,
    gradient: {
      0.0: '#FF0000', // Red for population per doctor >= 1000
      0.3: '#FF0000', // Red for population per doctor >= 1000
      0.6: '#FFFF00', // Yellow for 2 doctors per 1000 citizens
      0.7: '#00FF00', // Green for 3 doctors per 1000 citizens
      1.0: '#0000FF', // Blue for 4+ doctors per 1000 citizens
    },
  }).addTo(map);

  // Add map components
  addCityLabels();
  addCityMarkers();
  addLegend();
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
        radius: 40, // Increased radius for smoother heatmap
        blur: 25,   // Increased blur for better blending
        maxZoom: 12, // Adjusted max zoom for better visibility
        max: 5,     // Maximum intensity value for normalization
        gradient: {
          0.0: '#FF0000', // Red for cities with no doctors
          0.33: '#FFFF00', // Yellow
          0.66: '#00FF00', // Green
          1.0: '#0000FF', // Blue
        },
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
  await loadCities();
  initializeMap();
  await loadDepartmentBoundaries();
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

.city-tooltip {
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px;
  font-size: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}
</style>
