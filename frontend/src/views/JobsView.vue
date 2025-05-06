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
        </v-data-table>
      </v-col>

      <!-- Filtres -->
      <v-col cols="4">
        <h1>Filtres</h1>
        <v-select
          v-model="sortOrder"
          :items="sortOptions"
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
    const job1 = new JobOffer(1, "Développement Fullstack", "Fullstack Dev", "Paris", 10, new Date("2024-04-01"));
    const job2 = new JobOffer(2, "Frontend React", "Frontend Dev", "Lyon", 5, new Date("2024-05-01"));

    return {
      jobs: [job1, job2],
      sortOrder: "",
      sortOptions: [
        { text: "Date croissante", value: "asc" },
        { text: "Date décroissante", value: "desc" },
      ],
      headers: [
        { text: "Titre", value: "title" },
        { text: "Description", value: "description" },
        { text: "Lieu", value: "city" },
        { text: "Jours par semaine", value: "dailyAssignment" },
        { text: "Date de création", value: "dateCreated" },
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