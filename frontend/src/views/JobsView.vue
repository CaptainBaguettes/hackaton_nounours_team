<template>
  <v-container class="job-view-template pa-4" fluid>
    <v-row no-gutters class="d-flex flex-nowrap">
      <!-- Liste des offres -->
      <v-col cols="8">
        <h1>Offres d'emploi</h1>
        <v-data-table
          :items="filteredJobs"
          :headers="headers"
          class="mb-4"
        >
          <template #item.dateCreated="{ item }">
            {{ new Date(item.dateCreated).toLocaleDateString() }}
          </template>
          
          <!-- Ajouter un template pour les header tooltips -->
          <template #header.title="{ column }">
            <v-tooltip location="top" max-width="300">
              <template v-slot:activator="{ props }">
                <span v-bind="props">{{ column.title }}</span>
              </template>
              <span>Titre de l'offre d'emploi</span>
            </v-tooltip>
          </template>
          
          <template #header.description="{ column }">
            <v-tooltip location="top" max-width="300">
              <template v-slot:activator="{ props }">
                <span v-bind="props">{{ column.title }}</span>
              </template>
              <span>Description détaillée du poste proposé</span>
            </v-tooltip>
          </template>
          
          <template #header.city="{ column }">
            <v-tooltip location="top" max-width="300">
              <template v-slot:activator="{ props }">
                <span v-bind="props">{{ column.title }}</span>
              </template>
              <span>Ville où se situe l'offre d'emploi</span>
            </v-tooltip>
          </template>
          
          <template #header.dailyAssignment="{ column }">
            <v-tooltip location="top" max-width="300">
              <template v-slot:activator="{ props }">
                <span v-bind="props">{{ column.title }}</span>
              </template>
              <span>Affluence de patients par jour</span>
            </v-tooltip>
          </template>
          
          <template #header.dateCreated="{ column }">
            <v-tooltip location="top" max-width="300">
              <template v-slot:activator="{ props }">
                <span v-bind="props">{{ column.title }}</span>
              </template>
              <span>Date de publication de l'offre</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-col>

      <!-- Filtres -->
      <v-col cols="4">
        <h1>Filtres</h1>
        <v-select
          v-model="sortOrder"
          :items="sortOptions"
          item-title="label"
          item-value="value"
          label="Trier par date"
          clearable
        />
        <router-link to="/add_job">
          <v-btn color="primary" class="mt-4" block>
            Ajouter une offre
          </v-btn>
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { JobOffer } from "../models/JobOffer";

export default {
  name: "JobsView",
  data() {
    const job1 = new JobOffer(1, "Médecin", "Médecin généraliste", "Rennes", 10, new Date("2024-04-01"));
    const job2 = new JobOffer(2, "Kiné", "Kinésithérapeute", "Bain-de-Bretagne", 5, new Date("2024-05-01"));

    return {
      jobs: [
      job1,
      job2,
      new JobOffer(3, "Médecin généraliste", "Consultations générales", "Rennes", 15, new Date("2024-06-01")),
      new JobOffer(4, "Permanence Pharmacie", "Assistance en pharmacie", "Crevin", 8, new Date("2024-06-05")),
      new JobOffer(5, "Permanence cabinet", "Accueil et gestion des patients", "Cesson-Sévigné", 10, new Date("2024-06-10")),
      new JobOffer(6, "Médecin généraliste", "Consultations générales", "Fougères", 12, new Date("2024-06-15")),
      new JobOffer(7, "Permanence Pharmacie", "Assistance en pharmacie", "Vitré", 7, new Date("2024-06-20")),
      new JobOffer(8, "Permanence cabinet", "Accueil et gestion des patients", "Saint-Malo", 9, new Date("2024-06-25")),
      new JobOffer(9, "Médecin généraliste", "Consultations générales", "Redon", 14, new Date("2024-07-01")),
      new JobOffer(10, "Permanence Pharmacie", "Assistance en pharmacie", "Dinard", 6, new Date("2024-07-05")),
      new JobOffer(11, "Permanence cabinet", "Accueil et gestion des patients", "Combourg", 11, new Date("2024-07-10")),
      new JobOffer(12, "Médecin généraliste", "Consultations générales", "Janzé", 13, new Date("2024-07-15")),
      new JobOffer(13, "Permanence Pharmacie", "Assistance en pharmacie", "Guichen", 5, new Date("2024-07-20")),
      new JobOffer(14, "Permanence cabinet", "Accueil et gestion des patients", "Betton", 8, new Date("2024-07-25")),
      new JobOffer(15, "Médecin généraliste", "Consultations générales", "Châteaubourg", 10, new Date("2024-08-01")),
      new JobOffer(16, "Permanence Pharmacie", "Assistance en pharmacie", "Thorigné-Fouillard", 7, new Date("2024-08-05")),
    ],
      sortOrder: "",
      sortOptions: [
        { label: "Date de publication croissante", value: "asc" },
        { label: "Date de publication décroissante", value: "desc" },
      ],
      headers: [
        { title: "Titre", key: "title", align: "start", width: "15%" },
        { title: "Description", key: "description", align: "start", width: "35%" },
        { title: "Lieu", key: "city", align: "start", width: "15%" },
        { title: "Affluence par jour", key: "dailyAssignment", align: "center", width: "15%" },
        { title: "Date de création", key: "dateCreated", align: "center", width: "20%" },
      ],
    };
  },
  computed: {
    filteredJobs() {
      const sorted = [...this.jobs];
      if (this.sortOrder === "asc") {
        sorted.sort((a, b) => new Date(a.dateCreated) - new Date(b.dateCreated));
      } else if (this.sortOrder === "desc") {
        sorted.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
      }
      return sorted;
    },
  },
};
</script>


<style scoped>

.job-view-template {
  max-width: 1500px;
  padding: 0 40px;
}

.v-col {
  padding-top: 20px;
}

/* Pour encore plus d’espace entre les colonnes : */
.v-col:first-child {
  margin-right: 40px;
} 
.job-view {
    padding: 20px;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

th,
td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

th {
    background-color: #f4f4f4;
}

button {
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

.new-job-button {
    display: inline-block;
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 5px;
}
</style>