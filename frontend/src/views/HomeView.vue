<script setup lang="ts">
import MapView from "../components/MapView.vue";
</script>

<template>
   <div class="home-view">
      <!-- Content -->
      <div class="content">
         <!-- Left Section -->
         <div class="left-section">
            <!-- Boxes -->
            <div class="boxes">
               <div class="box">
                  <h3>Besoin médical</h3>
                  <p>Déficit médical</p>
               </div>
               <div class="box">
                  <h3>Commune</h3>
                  <p>Saint-Malo</p>
               </div>
               <div class="box">
                  <h3>Population</h3>
                  <p>10 000 habitants</p>
               </div>
            </div>

            <!-- Map -->
            <MapView class="map-view" />
         </div>

         <!-- Right Section -->
         <div class="right-section">
            <div class="info-card">
               <h3>Camion itinérant</h3>
               <p>Maire : Nathalie Appéré</p>
               <p>Commune : Rennes</p>
            </div>
            <div class="info-card">
               <h3>Permanence Pharmacie</h3>
               <p>Maire : Nathalie Appéré</p>
               <p>Commune : Rennes</p>
            </div>
            <div class="info-card">
               <h3>Maison de santé</h3>
               <p>Maire : Nathalie Appéré</p>
               <p>Commune : Rennes</p>
            </div>
            <div class="button-container">
               <RouterLink to="/propose-service" class="propose-button">
                  Proposer vos services
               </RouterLink>
            </div>
         </div>
      </div>
   </div>
</template>

<style scoped>
/* Empêche le scroll global */
html,
body {
   margin: 0;
   padding: 0;
   overflow: hidden;
   height: 100%;
}

.home-view {
   height: 90vh;
   display: flex;
   flex-direction: column;
   overflow: hidden; /* Empêche le scroll dans le composant */
}

.navbar {
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 10px 20px;
   background-color: #2d3748;
   color: white;
}

.navbar-left button {
   margin-right: 10px;
   background: none;
   border: none;
   color: white;
   cursor: pointer;
   font-size: 16px;
}

.navbar-right {
   display: flex;
   align-items: center;
}

.profile-pic {
   width: 40px;
   height: 40px;
   border-radius: 50%;
   margin-left: 10px;
}

.content {
   flex: 1;
   display: flex;
   overflow: hidden; /* Empêche le scroll dans le contenu */
}

.left-section {
   flex: 3;
   display: flex;
   flex-direction: column;
   padding: 20px;
}

.boxes {
   display: flex;
   justify-content: space-between;
   margin-bottom: 20px;
}

.box {
   flex: 1;
   background-color: #f7fafc;
   border: 1px solid #e2e8f0;
   border-radius: 8px;
   padding: 15px;
   margin-right: 10px;
   text-align: center;
}

.box:last-child {
   margin-right: 0;
}

.map-view {
   flex: 1;
   background-color: #cbd5e0;
   border-radius: 8px;
   height: 100%;
   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.right-section {
   flex: 1;
   display: flex;
   flex-direction: column;
   padding: 20px;
}

.info-card {
   background-color: #f7fafc;
   border: 1px solid #e2e8f0;
   border-radius: 8px;
   padding: 15px;
   margin-bottom: 10px;
}

.button-container {
   margin-top: auto;
   text-align: center;
}

.propose-button {
   display: inline-block;
   padding: 10px 20px;
   background-color: #4299e1;
   color: white;
   text-decoration: none;
   border-radius: 8px;
   font-weight: bold;
   transition: background-color 0.2s;
}

.propose-button:hover {
   background-color: #3182ce;
}
</style>
