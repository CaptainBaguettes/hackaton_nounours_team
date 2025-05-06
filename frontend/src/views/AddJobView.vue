<template>
   <div class="add-job-view">
      <h1>Ajouter une offre</h1>
      <div class="form-container">
         <!-- Left Section: Description -->
         <div class="form-section">
            <h2>Description</h2>
            <div class="form-group">
               <label for="job-title">Intitulé de l'offre</label>
               <input
                  type="text"
                  id="job-title"
                  placeholder="Entrez l'intitulé de l'offre" />
            </div>
            <div class="form-group">
               <label for="mairie">Mairie</label>
               <input
                  type="text"
                  id="mairie"
                  placeholder="Entrez le nom de la mairie" />
            </div>
            <div class="form-group">
               <label for="description">Description</label>
               <textarea
                  id="description"
                  rows="5"
                  placeholder="Entrez la description de l'offre"></textarea>
               <div class="char-counter">0 / 500</div>
            </div>
            <div class="form-group">
               <label for="affluence">Affluence moyenne</label>
               <input
                  type="text"
                  id="affluence"
                  placeholder="Exemple : 40 personnes / jour" />
            </div>
         </div>

         <!-- Right Section: Localisation -->
         <div class="form-section">
            <h2>Localisation</h2>
            <div class="form-group">
               <label for="zone">Zone d'intervention</label>
               <input
                  type="text"
                  id="zone"
                  placeholder="Entrez la zone d'intervention" />
            </div>
            <div class="form-group-row">
               <div class="form-group small">
                  <label for="street-number">Numéro de voie</label>
                  <input
                     type="text"
                     id="street-number"
                     placeholder="Entrez le numéro de voie" />
               </div>
               <div class="form-group large">
                  <label for="street-name">Nom de la voie</label>
                  <input
                     type="text"
                     id="street-name"
                     placeholder="Entrez le nom de la voie" />
               </div>
            </div>
            <div class="form-group-row">
               <div class="form-group small">
                  <label for="postal-code">Code postal</label>
                  <input
                     type="text"
                     id="postal-code"
                     placeholder="Entrez le code postal" />
               </div>
               <div class="form-group large">
                  <label for="city">Nom de la commune</label>
                  <input
                     type="text"
                     id="city"
                     placeholder="Entrez le nom de la commune" />
               </div>
            </div>
         </div>
      </div>
      <RouterLink to="/jobs" class="submit-button">Publier</RouterLink>
   </div>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
   name: "AddJobView",
};
</script>

<style scoped>
.add-job-view {
   padding: 20px;
}

h1 {
   text-align: center;
   margin-bottom: 20px;
}

.form-container {
   display: flex;
   gap: 20px;
}

.form-section {
   flex: 1;
   border: 1px solid #ccc;
   padding: 20px;
   border-radius: 8px;
   background-color: #f9f9f9;
}

.form-group {
   margin-bottom: 15px;
}

.form-group-row {
   display: flex;
   gap: 10px;
}

.form-group.small {
   flex: 1;
}

.form-group.large {
   flex: 3;
}

label {
   display: block;
   margin-bottom: 5px;
   font-weight: bold;
}

input,
textarea {
   width: 100%;
   padding: 8px;
   border: 1px solid #ccc;
   border-radius: 4px;
}

textarea {
   resize: none;
}

.char-counter {
   text-align: right;
   font-size: 12px;
   color: #888;
}

.submit-button {
   display: block;
   margin: 20px auto;
   padding: 10px 20px;
   background-color: #007bff;
   color: white;
   border: none;
   border-radius: 4px;
   cursor: pointer;
   font-size: 16px;
   width: auto;
   min-width: 50px;
   max-width: 150px;
   text-align: center;
}

.submit-button:hover {
   background-color: #0056b3;
}
</style>
