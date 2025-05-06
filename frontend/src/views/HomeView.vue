<script setup lang="ts">
import MapView from "../components/MapView.vue";
</script>

<template>
   <div class="home-view">
      <div class="content">
         <div class="left-section">
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

            <MapView class="map-view" />
         </div>

         <div class="right-section">
            <div class="info-card">
               <h2>Camion itinérant</h2>
               <p>Maire : Nathalie Appéré</p>
               <p>Commune : Rennes</p>
            </div>
            <div class="info-card">
               <h2>Permanence Pharmacie</h2>
               <p>Maire : Nathalie Appéré</p>
               <p>Commune : Rennes</p>
            </div>
            <div class="info-card">
               <h2>Maison de santé</h2>
               <p>Maire : Nathalie Appéré</p>
               <p>Commune : Rennes</p>
            </div>
            <div class="button-container">
               <RouterLink to="/add_job" class="propose-button">
                  Proposer vos services
               </RouterLink>
            </div>
         </div>
      </div>
   </div>
</template>

<style scoped>
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
   overflow: hidden;
}

.navbar {
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 10px 20px;
   background-color: #2d3748;
   color: white;
}

h2 {
   font-size: 1.5rem;
   font-weight: bold;
   color: #2d3748;
   margin-bottom: 10px;
}

h3 {
   font-size: 1.2rem;
   font-weight: bold;
   color: #2d3748;
   margin-bottom: 5px;
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
   overflow: hidden;
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
