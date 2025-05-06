<template>
   <div class="offres-mairie">
      <div class="left-section">
         <h2>Liste des mairies</h2>
         <div
            class="mairie-card"
            v-for="mairie in filteredMairies"
            :key="mairie.id">
            <p>
               <strong>{{ mairie.name }}</strong>
            </p>
            <p>Affluence : {{ mairie.affluence }} personnes/jour</p>
            <button class="consult-button">Consulter</button>
         </div>
      </div>
      <div class="right-section">
         <h2>Recherche</h2>
         <div class="form-group">
            <label for="name">Nom</label>
            <input
               type="text"
               id="name"
               v-model="searchCriteria.name"
               placeholder="Exemple : Rennes" />
         </div>
         <div class="form-group-row">
            <div class="form-group small">
               <label for="min-affluence">Affluence min</label>
               <input
                  type="number"
                  id="min-affluence"
                  v-model.number="searchCriteria.minAffluence"
                  placeholder="10" />
            </div>
            <div class="form-group small">
               <label for="max-affluence">Affluence max</label>
               <input
                  type="number"
                  id="max-affluence"
                  v-model.number="searchCriteria.maxAffluence"
                  placeholder="50" />
            </div>
         </div>
         <button class="search-button" @click="filterMairies">
            Rechercher
         </button>
         <h3>Tri</h3>
         <div class="sort-options">
            <button
               :class="{
                  active:
                     sortCriteria === 'name-asc' ||
                     sortCriteria === 'name-desc',
               }"
               @click="toggleSort('name-asc')">
               Nom : Alphabétique
            </button>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   name: "OffresMairie",
   data() {
      return {
         mairies: [
            {
               id: 1,
               name: "Saint-Malo",
               affluence: 30,
            },
            {
               id: 2,
               name: "Rennes",
               affluence: 50,
            },
            {
               id: 3,
               name: "Fougères",
               affluence: 40,
            },
            {
               id: 4,
               name: "Redon",
               affluence: 20,
            },
         ],
         searchCriteria: {
            name: "",
            minAffluence: null,
            maxAffluence: null,
         },
         filteredMairies: [],
         sortCriteria: null,
      };
   },
   methods: {
      toggleSort(criteria) {
         if (this.sortCriteria === criteria) {
            // Si le tri est déjà actif, inverser l'ordre
            this.sortCriteria =
               criteria === "name-asc" ? "name-desc" : "name-asc";
         } else {
            // Activer le tri
            this.sortCriteria = criteria;
         }
         this.sortMairies();
      },
      sortMairies() {
         if (this.sortCriteria === "name-asc") {
            this.filteredMairies.sort((a, b) => a.name.localeCompare(b.name));
         } else if (this.sortCriteria === "name-desc") {
            this.filteredMairies.sort((a, b) => b.name.localeCompare(a.name));
         }
      },
      filterMairies() {
         if (
            !this.searchCriteria.name &&
            this.searchCriteria.minAffluence === null &&
            this.searchCriteria.maxAffluence === null
         ) {
            this.filteredMairies = [...this.mairies];
            this.sortMairies();
            return;
         }

         this.filteredMairies = this.mairies.filter((mairie) => {
            const matchesName =
               !this.searchCriteria.name ||
               mairie.name
                  .toLowerCase()
                  .includes(this.searchCriteria.name.toLowerCase());
            const matchesMinAffluence =
               this.searchCriteria.minAffluence === null ||
               mairie.affluence >= this.searchCriteria.minAffluence;
            const matchesMaxAffluence =
               this.searchCriteria.maxAffluence === null ||
               mairie.affluence <= this.searchCriteria.maxAffluence;

            return matchesName && matchesMinAffluence && matchesMaxAffluence;
         });

         this.sortMairies();
      },
   },
   mounted() {
      this.filteredMairies = this.mairies;
   },
};
</script>

<style scoped>
.offres-mairie {
   display: flex;
   gap: 20px;
   padding: 20px;
}

.left-section {
   flex: 2;
}

.right-section {
   flex: 1;
}

h2 {
   font-size: 2rem;
   font-weight: bold;
   text-align: left;
   color: #333;
   margin-bottom: 20px;
   letter-spacing: 1px;
}

h3 {
   font-size: 1.5rem;
   font-weight: bold;
   text-align: left;
   color: #333;
   margin-bottom: 20px;
   letter-spacing: 1px;
}

.mairie-card {
   display: flex;
   justify-content: space-between;
   align-items: center;
   gap: 10px;
   padding: 30px 10px;
   margin-bottom: 10px;
   border: 1px solid #ccc;
   border-radius: 8px;
   background-color: #f9f9f9;
}

.consult-button {
   padding: 5px 15px;
   background-color: #007bff;
   color: white;
   border: none;
   border-radius: 4px;
   cursor: pointer;
   font-size: 0.9rem;
   white-space: nowrap;
}

.consult-button:hover {
   background-color: #0056b3;
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

label {
   display: block;
   margin-bottom: 5px;
   font-weight: bold;
}

input {
   width: 100%;
   padding: 8px;
   border: 1px solid #ccc;
   border-radius: 4px;
}

.search-button {
   display: block;
   margin: 20px auto;
   padding: 10px 20px;
   background-color: #007bff;
   color: white;
   border: none;
   border-radius: 4px;
   cursor: pointer;
   font-size: 16px;
}

.search-button:hover {
   background-color: #0056b3;
}

.sort-options {
   display: flex;
   flex-direction: column;
   gap: 10px;
   margin-top: 10px;
}

.sort-options button {
   background: none;
   border: none;
   color: #007bff;
   cursor: pointer;
   font-size: 1rem;
   text-align: left;
}

.sort-options button.active {
   font-weight: bold;
   color: #0056b3;
}

.sort-options button:hover {
   text-decoration: underline;
}
</style>
