<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet.heat';

// Extended data for cities in Ille-et-Vilaine
const cities = [
  // Major cities
  {
    name: 'Rennes',
    lat: 48.117266,
    lng: -1.6777926,
    population: 215366,
    type: 'city',
  },
  {
    name: 'Saint-Malo',
    lat: 48.649337,
    lng: -2.025674,
    population: 46097,
    type: 'city',
  },
  {
    name: 'Fougères',
    lat: 48.351067,
    lng: -1.204567,
    population: 20189,
    type: 'city',
  },
  {
    name: 'Vitré',
    lat: 48.123889,
    lng: -1.215278,
    population: 17677,
    type: 'city',
  },
  // Medium towns
  { name: 'Redon', lat: 47.65, lng: -2.083333, population: 8867, type: 'town' },
  {
    name: 'Dinard',
    lat: 48.633333,
    lng: -2.05,
    population: 9916,
    type: 'town',
  },
  {
    name: 'Bruz',
    lat: 48.023333,
    lng: -1.744444,
    population: 18364,
    type: 'town',
  },
  {
    name: 'Cesson-Sévigné',
    lat: 48.119722,
    lng: -1.604444,
    population: 17843,
    type: 'town',
  },
  // Additional municipalities
  {
    name: 'Saint-Grégoire',
    lat: 48.14,
    lng: -1.6883,
    population: 9600,
    type: 'town',
  },
  {
    name: 'Betton',
    lat: 48.1786,
    lng: -1.6442,
    population: 11200,
    type: 'town',
  },
  {
    name: 'Chantepie',
    lat: 48.0908,
    lng: -1.5986,
    population: 10500,
    type: 'town',
  },
  {
    name: 'Chartres-de-Bretagne',
    lat: 48.0464,
    lng: -1.7189,
    population: 7800,
    type: 'town',
  },
  { name: 'Pacé', lat: 48.1331, lng: -1.7756, population: 11300, type: 'town' },
  {
    name: 'Saint-Jacques-de-la-Lande',
    lat: 48.0872,
    lng: -1.71,
    population: 8900,
    type: 'town',
  },
  {
    name: 'Vern-sur-Seiche',
    lat: 48.0497,
    lng: -1.5794,
    population: 8000,
    type: 'town',
  },
  {
    name: 'Acigné',
    lat: 48.1394,
    lng: -1.5294,
    population: 7000,
    type: 'town',
  },
  {
    name: 'Mordelles',
    lat: 48.0725,
    lng: -1.8517,
    population: 7200,
    type: 'town',
  },
  {
    name: 'Noyal-sur-Vilaine',
    lat: 48.1194,
    lng: -1.5275,
    population: 5700,
    type: 'town',
  },
  { name: 'Janzé', lat: 47.9592, lng: -1.4903, population: 8300, type: 'town' },
  {
    name: 'Bain-de-Bretagne',
    lat: 47.8414,
    lng: -1.6839,
    population: 7700,
    type: 'town',
  },
  {
    name: 'Guichen',
    lat: 47.9886,
    lng: -1.8047,
    population: 8300,
    type: 'town',
  },
  {
    name: 'Liffré',
    lat: 48.2103,
    lng: -1.5064,
    population: 7500,
    type: 'town',
  },
  {
    name: 'Châteaubourg',
    lat: 48.1106,
    lng: -1.4053,
    population: 6400,
    type: 'town',
  },
  {
    name: 'La Guerche-de-Bretagne',
    lat: 47.9422,
    lng: -1.2306,
    population: 4300,
    type: 'town',
  },
  {
    name: 'Dol-de-Bretagne',
    lat: 48.5483,
    lng: -1.7497,
    population: 5600,
    type: 'town',
  },
  {
    name: 'Combourg',
    lat: 48.4097,
    lng: -1.75,
    population: 5800,
    type: 'town',
  },
  {
    name: 'Melesse',
    lat: 48.2203,
    lng: -1.6586,
    population: 6600,
    type: 'town',
  },
  // Additional smaller towns and villages
  {
    name: 'Saint-Aubin-du-Cormier',
    lat: 48.2587,
    lng: -1.3992,
    population: 3800,
    type: 'small town',
  },
  {
    name: 'Pleurtuit',
    lat: 48.5819,
    lng: -2.0428,
    population: 6200,
    type: 'town',
  },
  {
    name: 'Cancale',
    lat: 48.6781,
    lng: -1.8528,
    population: 5300,
    type: 'town',
  },
  {
    name: 'Saint-Méen-le-Grand',
    lat: 48.1883,
    lng: -2.1931,
    population: 4200,
    type: 'town',
  },
  {
    name: 'Montauban-de-Bretagne',
    lat: 48.1958,
    lng: -2.0503,
    population: 5100,
    type: 'town',
  },
  {
    name: 'Montfort-sur-Meu',
    lat: 48.1383,
    lng: -1.9542,
    population: 6700,
    type: 'town',
  },
  {
    name: 'Argentré-du-Plessis',
    lat: 48.0575,
    lng: -1.1569,
    population: 4400,
    type: 'town',
  },
  {
    name: 'Retiers',
    lat: 47.9167,
    lng: -1.3833,
    population: 4200,
    type: 'town',
  },
  {
    name: 'Pipriac',
    lat: 47.8294,
    lng: -1.9444,
    population: 3700,
    type: 'small town',
  },
  {
    name: 'Maure-de-Bretagne',
    lat: 47.9263,
    lng: -2.0098,
    population: 3300,
    type: 'small town',
  },
  {
    name: 'Tinténiac',
    lat: 48.3087,
    lng: -1.8412,
    population: 3500,
    type: 'small town',
  },
  {
    name: "Saint-Aubin-d'Aubigné",
    lat: 48.2352,
    lng: -1.571,
    population: 3600,
    type: 'small town',
  },
];

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
  return cities.map((city) => {
    const intensity = Math.log10(city.population) * 0.8;
    return [city.lat, city.lng, intensity];
  });
};

/**
 * Adds labels for major cities
 */
const addCityLabels = () => {
  cities.forEach((city) => {
    if (city.population > 15000) {
      const marker = L.marker([city.lat, city.lng], {
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
  cities.forEach((city) => {
    L.marker([city.lat, city.lng], { opacity: 0 })
      .bindPopup(`
        <b>${city.name}</b><br>
        Population: ${city.population.toLocaleString()}<br>
        Type: ${city.type}
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
    radius: 40,
    blur: 15,
    maxZoom: 10,
    max: 5,
  }).addTo(map);

  // Add map components
  addCityLabels();
  addCityMarkers();
  addLegend();
  
  // Load GeoJSON data
  loadDepartmentBoundaries();
};

// Lifecycle hooks
onMounted(() => {
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
